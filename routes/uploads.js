var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var fs = require('fs');
var im = require('imagemagick');
var multer  =   require('multer');
var mailer = require("nodemailer");
const sendmail = require('sendmail')();

router.post('/', function(req, res){
console.log("-----uploads");
console.log(req);
res.json({'response':"OK"});
});



router.get('/forum_mail', function(req, res, next){
			console.log('forum_mail...');
    console.log(req.query.id);
    var mid = req.query.id;
    getPostFromId(mid,function(results) {
        var i = 0;
    var id = results[i].id;
                          var user = results[i].user;
                          var content = results[i].content.toString().replaceAll('%20',' ');
                          var image = 'http://cropadvisor.site/uploads/' + results[i].image;
                          var datetime = results[i].datetime;
                          var status = results[i].status;
                          var name = replaceAll(results[i].name.toString());
                          var address = replaceAll(results[i].address.toString());
                          var district = replaceAll(results[i].district.toString());
                          var phone = replaceAll(results[i].phone.toString());
                          var audio = 'http://cropadvisor.site/uploads/' + results[i].audio;
            console.log('forum_mail... id:'+id+' user:'+user);
          res.render('forum_mail', { title: 'CropAdvisor', 
                                    message: 'Enabling farmer\'s life easy', 
                                    id: ''+req.query.id, 
                                    qid: ''+id, 
                                    user: ''+user, 
                                    content: ''+content, 
                                    image: ''+image, 
                                    datetime: ''+datetime, 
                                    status: ''+status, 
                                    name: ''+name, 
                                    address: ''+address, 
                                    district: ''+district, 
                                    phone: ''+phone, 
                                    audio: ''+audio
                                   });
    });
});

//To test on browser root url is a simple html form to upload files
router.get('/upload', function(req, res){
  res.send(
      '<form action="/uploads/uploadimage" method="post" enctype="multipart/form-data">'+
      '<input type="file" name="source">'+
      '<input type="submit" value="Upload">'+
      '</form>'+
      '<form id        =  "uploadForm"'+
     'enctype   =  "multipart/form-data"'+
     'action    =  "/uploads/uploadimage"'+
     'method    =  "post"'+
'>'+
'<input type="file" name="userPhoto" />'+
'<input type="submit" value="Upload Image" name="submit">'+
'</form>'
  );
});

router.post('/diseaseimage', function(req, res, next){
console.log("uploads-------");
console.log("Received file:\n" + JSON.stringify(req.files));
  console.log("==="+req.files);
    console.log(req.files.image.path);
        fs.readFile(req.files.image.path, function (err, data){
        var dirname = "/home/prasadct/projects/crop-web-dev/";
        var newPath = dirname + "crop-web/" +   req.files.image.originalFilename;
        fs.writeFile(newPath, data, function (err) {
        if(err){
        res.json({'response':"Error"});
        }else {
        res.json({'response':"Saved"});
	}
	});
    });
});

//The upload picture request handler
router.post('/uploadimage1', function(req, res){
  //This debugging meassage displays all the info that comes with the file
  console.log("Received file:\n" + JSON.stringify(req.files));
  console.log(req.headers.uploaded_file); 
  console.log(req); 
  //Set the directory names
 // var photoDir = __dirname+"/home/prasadct/upload/";
 // var thumbnailsDir = __dirname+"/home/prasadct/upload/thumbnails/";
  var photoDir = "/home/prasadct/upload/";
  var thumbnailsDir = "/home/prasadct/upload/thumbnails/";
console.log(photoDir);
console.log(thumbnailsDir);
//  var photoName = req.files.source.name;
 var photoName = req.headers.image_name;

console.log(photoName); 
  //We use Node's FileSystem to rename the file, which actually moves it from the /tmp/ folder it goes to on Linux
  fs.rename(
    req.headers.uploaded_file,
   photoDir+photoName,
    function(err){
     if(err != null){
        res.send({error:"Server Writting No Good"});
      } else {
console.log("success");
        //If upload goes ok we go ahead an create the thumbnail
        im.resize(
          {
            srcData:fs.readFileSync(photoDir+photoName, 'binary'),
            width:256
          }, 
          function(err, stdout, stderr){
           if(err != null){
             res.send({error:"Resizeing No Good"});
            } else {
             fs.writeFileSync(thumbnailsDir+"thumb_"+photoName, stdout, 'binary');
             res.send("Ok");
            }
          }
        );
      }
    }
  );
});

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '/home/prasadct/projects/crop-web-dev/crop-web/public/uploads');
  },
  filename: function (req, file, callback) {
      console.log("file....")
      console.log(file);
      var fname = file.fieldname + '-' + Date.now();
      if(file.originalname == 'AudioRecording.3gp'){
          fname = Date.now() + '-' + file.originalname;
          console.log(fname);
      }
    callback(null, fname);
      console.log("fname");
      console.log(fname);
      console.log(req.query.content);
      if(file.originalname == 'AudioRecording.3gp'){
          updatePostAudio(req.query.reqid,fname);
      } else {
        insertPost(req.query.reqid, fname, req.query.content, 'NEW');
      }
  }
});
var upload = multer({ storage : storage}).array('userPhoto',2);

router.get('/1',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

router.post('/uploadimage',function(req,res){
    console.log(req);
    console.log(req.file);
    console.log(req.files);
    console.log("Content...")
    console.log(req.body.content);
    console.log(req.query.content);
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        } else {
          getLastUpload(req, res, sendEmail);
        }
        res.end("File is uploaded");
    });
});

function getLastUpload(req, res, callback){
  var user = req.query.reqid;
  var connection = mysql.createConnection({
      host     : 'localhost',
      user     : '*******',
      password : '*******',
      database : 'crop_dev'
  });

  connection.connect();
  var q = 'select * from post p join user u on p.user like u.phoneid where p.user = \''+user+'\' order by p.id desc limit 1';

   connection.query(q, function(err, results, fields) {
        if (err){
            return callback(err, null);
        }

        console.log('Last uploaded post: ', results[0]);

        callback(results);
    });
  connection.end();
}

function replaceAll(str) {
            if (str){
                return str.replace(/%20/g, ' ');
            } else {
                return '--';
            }
        }
        String.prototype.replaceAll = function(search, replace)
            {
                //if replace is not sent, return original string otherwise it will
                //replace search string with 'undefined'.
                if (replace === undefined) {
                    return this.toString();
                }

                return this.replace(new RegExp('[' + search + ']', 'g'), replace);
            };

function sendEmail(results){
  console.log('Sending email to...');
    var i = 0;
    var id = 'http://www.cropadvisor.site/uploads/forum_mail?id=' +results[i].id;
                          var user = results[i].user;
                          var content = results[i].content.toString().replaceAll('%20',' ');
                          var image = 'http://www.cropadvisor.site/uploads' + results[i].image;
                          var datetime = results[i].datetime;
                          var status = results[i].status;
                          var name = replaceAll(results[i].name.toString());
                          var address = replaceAll(results[i].address.toString());
                          var district = replaceAll(results[i].district.toString());
                          var phone = replaceAll(results[i].phone.toString());
                          var audio = results[i].audio;

    sendmail({
        from: 'do-not-reply@cropadvisor.site',
        to: 'prasadct99@gmail.com, chiranthi@lirneasia.net, chatura@lirneasia.net, subhanipdn@gmail.com, subhaniatthanayaka.doa@gmail.com, samanbandara.doa@gmail.com, kamiss.doa@gmail.com, samanthathusitha@gmail.com, piyumi@lirneasia.net ',
        subject: 'CropAdvisor question by '+name,
        html: "<td>"+
                                     "<h4><a href='#'>"+content+"</a><br><small>Asked by "+name+" | Contact no "+phone+" | Address "+address+" | District "+district+"</small></h4>"+
                                    "</td>"+
                                    "<td>"+
                                    "<img src="+image+"></td>"+
                                  "<td class='text-center hidden-xs hidden-sm'><a href='"+id+ 
        "' role='button' class='btn btn-success' data-toggle='modal' data-target='.view-query-modal-lg' data-qid='"+id+"' data-qcontent='"+content+"' data-qimage='"+image+"'>Answer to this Query</a></td>",
      }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });

    // Use Smtp Protocol to send Email
  //   var smtpTransport = mailer.createTransport('SMTP',{
  //       service: 'Gmail',
  //       auth: {
  //           user: 'appssirius@gmail.com',
  //           pass: '*******'
  //       }
  //   });
  //   var mail = {
  //       from: 'Sirius Apps <appssirius@gmail.com>',
  //       to: 'prasadct99@gmail.com',
  //       subject: 'Send Email Using Node.js',
  //       text: 'Node.js New world for me',
  //       html: '<b>Node.js New world for me</b>'
  //   }
  //   smtpTransport.sendMail(mail, function(error, response){
  //     if(error){
  //         console.log(error);
  //     }else{
  //         console.log('Message sent: ' + response.message);
  //     }

  //     smtpTransport.close();
  // });
}

function insertPost(user, image, content, status){
	var connection = mysql.createConnection({
  		host     : 'localhost',
  		user     : '*******',
  		password : '*******',
  		database : 'crop_dev'
	});

	connection.connect();
	connection.query('insert into post(user, content, image, status) values(\''+user+'\',\''+content+'\',\''+image + '\',\''+ status + '\')', function(err, rows, fields) {
  			if (err) throw err;
  			console.log('The solution is: ', rows);
		});	
	connection.end();
}

function updatePostAudio(id, audio){
	var connection = mysql.createConnection({
  		host     : 'localhost',
  		user     : '*******',
  		password : '*******',
  		database : 'crop_dev'
	});

	connection.connect();
	connection.query('update post set audio = \''+audio+'\' where user = \''+id+'\' ORDER BY \`id\` DESC LIMIT 1', function(err, rows, fields) {
  			if (err) throw err;
  			console.log('The solution is: ', rows);
		});	
	connection.end();
}

router.get('/getposts', function(req, res, next) {
    console.log('getposts');
    var id = req.query.id;
    getposts(id, function(results){
    //var x = JSON.stringify(results);
    //var y = x.replace(/{/g, '['); 
    //var z = y.replace(/}/g, ']'); 
   // var arr = [];
    //var st = '\[\'Date\' , \'Number of requests\'\]'; 
   // arr.push(st);
    console.log(results.length);
    //for( var i=1; i < results.length; i++){
    //    var s = '\[\''+ results[i].d + '\',' +  results[i].c + '\]';
    //    arr.push(s);
   // }
   // var r1 = JSON.stringify(arr);
  //  var r2 = r1.replace(/"/g, '');
    //results[0].d='Date';
    //results[0].c='Requests';
    //var readlocationFeed = JSON.stringify(results);
   // var jsonArray = new JSONArray(readlocationFeed);
   //var parsed = JSON.parse(results);
  // var arr1 = [];

//for(var x in parsed){
 // arr1.push(parsed[x]);
//}
//console.log(arr1);

    //console.log(r2);
		res.send(results);
	});
});

function getposts(id,callback){
  var connection = mysql.createConnection({
      host     : 'localhost',
      user     : '*******',
      password : '*******',
      database : 'crop_dev'
  });

  connection.connect();
    var q = "";
    if(id == null || id == undefined){
        q = 'select * from post p left join  user u on p.user like u.phoneid ORDER BY p.datetime DESC;'
    } else {
        q = 'select * from post p join  user u on p.user like \''+id+'%\' and u.phoneid like \''+id+'%\' ORDER BY p.datetime DESC;'
    }

    connection.query(q, function(err, results, fields) {
        if (err)
            return callback(err, null);

        console.log('The result is: ', results[0]);

        callback(results);
    });

  
  connection.end();
}

function getPostFromId(id,callback){
  var connection = mysql.createConnection({
      host     : 'localhost',
      user     : '*******',
      password : '*******',
      database : 'crop_dev'
  });

  connection.connect();
    var q = 'select * from post p join  user u on p.user like  u.phoneid and p.id = '+id+';'

    connection.query(q, function(err, results, fields) {
        if (err)
            return callback(err, null);

        console.log('The result is: ', results[0]);

        callback(results);
    });

  
  connection.end();
}

router.post('/updateresponse', function(req, res){
    console.log("-----updateresponse");
    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var response = req.body.response;
    if(username == 'prasad' && password == 'prasad@321'){
        console.log('Prasad answering... to '+ id);
        insertResponse(id, username, null, response, 'NEW');
        res.json({'response':"OK"});
    } else if(username == 'chiranthi' && password == 'chiranthi@321'){
        console.log('chiranthi answering... to '+ id);
        insertResponse(id, username, null, response, 'NEW');
        res.json({'response':"OK"});
    } else if(username == 'piyumi' && password == 'piyumi@321'){
        console.log('piyumi answering... to '+ id);
        insertResponse(id, username, null, response, 'NEW');
        res.json({'response':"OK"});
    } else if(username == 'chatura' && password == 'chatura@321'){
        console.log('chatura answering... to '+ id);
        insertResponse(id, username, null, response, 'NEW');
        res.json({'response':"OK"});
    } else if(username == 'amila' && password == 'amila@321'){
        console.log('amila answering... to '+ id);
        res.json({'response':"ERROR"}); 
    } else if(username == 'sisira1958' && password == 'sisira1958@321'){
        console.log('sisira1958 answering... to '+ id);
        insertResponse(id, username, null, response, 'NEW');
        res.json({'response':"OK"});
    } else if(username == 'roshanemail' && password == 'roshanemail@321'){
        console.log('roshanemail answering... to '+ id);
        insertResponse(id, username, null, response, 'NEW');
        res.json({'response':"OK"});
    } else if(username == 'kamiss.doa' && password == 'kamiss.doa@321'){
        console.log('kamiss.doa answering... to '+ id);
        insertResponse(id, username, null, response, 'NEW');
        res.json({'response':"OK"});
    } else if(username == 'samanthathusitha' && password == 'samanthathusitha@321'){
        console.log('samanthathusitha answering... to '+ id);
        insertResponse(id, username, null, response, 'NEW');
        res.json({'response':"OK"});
    } else if(username == 'rizwan.doa' && password == 'rizwan.doa@321'){
        console.log('rizwan.doa answering... to '+ id);
        insertResponse(id, username, null, response, 'NEW');
        res.json({'response':"OK"});
    } else if(username == 'subhani' && password == 'subhani@321'){
        console.log('subhani answering... to '+ id);
        insertResponse(id, username, null, response, 'NEW');
        res.json({'response':"OK"});
    } else if(username == 'subhani.doa' && password == 'subhani.doa@321'){
        console.log('subhani.doa answering... to '+ id);
        insertResponse(id, username, null, response, 'NEW');
        res.json({'response':"OK"});
    } else if(username == 'samanbandara.doa' && password == 'samanbandara.doa@321'){
        console.log('samanbandara.doa answering... to '+ id);
        insertResponse(id, username, null, response, 'NEW');
        res.json({'response':"OK"});
    } else {
        res.json({'response':"ERROR"}); 
    }
});

router.post('/updateresponse-ind', function(req, res){
    console.log("-----updateresponse-ind");
    var id = req.body.id;
    var response = req.body.response;
    console.log(id);
    console.log(response);
    insertResponse(id, null, null, response, 'REPLY');
        res.json({'response':"OK"});
});

function insertResponse(postId, user, image, response, status){
	var connection = mysql.createConnection({
  		host     : 'localhost',
  		user     : '*******',
  		password : '*******',
  		database : 'crop_dev'
	});

	connection.connect();
	connection.query('insert into response(post_id, user, response, image, status) values(\''+postId+'\',\''+user+'\',\''+response+'\',\''+image + '\',\''+ status + '\')', function(err, rows, fields) {
  			if (err) throw err;
  			console.log('The response is: ', rows);
		});	
    connection.query('update post set status = \'ANSWERED\' where id = '+ postId, function(err, rows, fields) {
  			if (err) throw err;
  			console.log('The response is: ', rows);
		});	
	connection.end();
}


router.post('/getresponse', function(req, res, next) {
    var id = req.body.id;
    console.log('getresponse');
    getresponse(id, function(results){
        console.log(results);
		res.send(results);
	});
});

function getresponse(id, callback){
  var connection = mysql.createConnection({
      host     : 'localhost',
      user     : '*******',
      password : '*******',
      database : 'crop_dev'
  });

  connection.connect();

    connection.query('SELECT * from response where post_id = \''+id+'\' ORDER BY datetime ASC;', function(err, results, fields) {
        if (err)
            return callback(err, null);

        console.log('The result is: ', results[0]);

        callback(results);
    });

  
  connection.end();
}







module.exports = router;
