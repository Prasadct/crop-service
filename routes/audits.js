var express = require('express');
var mysql = require('mysql');
var router = express.Router();

// stats
// getdaycount
// getpagecount
// getalluserdetals
// getdetailbycroptypeanduser

router.get('/stats', function(req, res, next) {
console.log('stats');
  res.render('stats', { title: 'CropAdvisor', message: 'Enabling farmer\'s life easy' });
});

router.get('/getdaycount', function(req, res, next) {
    console.log('getdaycount');
    getDayCount(function(results){
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

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function getDayCount(callback){
  var connection = mysql.createConnection({
      host     : 'localhost',
      user     : '******',
      password : '*******',
      database : 'crop_dev'
  });

  connection.connect();

    connection.query('SELECT DATE(datetime) as d,count(id) as c from audit_reqs GROUP by d limit 100;', function(err, results, fields) {
        if (err)
            return callback(err, null);

        console.log('The result is: ', results[0]);

        callback(results);
    });

  
  connection.end();
}

// select count(croptype) as count  from audit_reqs grouped where generatedfrom = 'detail' group by croptype;

router.get('/getpagecount', function(req, res, next) {
    console.log('getpagecount');
    getpagecount(function(results){
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

function getpagecount(callback){
  var connection = mysql.createConnection({
      host     : 'localhost',
      user     : '****',
      password : '*****',
      database : 'crop_dev'
  });

  connection.connect();

    connection.query('select count(croptype) as count, croptype  from audit_reqs grouped where generatedfrom = \'detail\' group by croptype;', function(err, results, fields) {
        if (err)
            return callback(err, null);

        console.log('The result is: ', results[0]);

        callback(results);
    });


  connection.end();
}

router.get('/getalluserdetals', function(req, res, next) {
    console.log('getalluserdetals');
    getalluserdetals(function(results){
		res.send(results);
	});
});


function getalluserdetals(callback){
  var connection = mysql.createConnection({
      host     : 'localhost',
      user     : '*****',
      password : '*****',
      database : 'crop_dev'
  });

  connection.connect();

    connection.query('select u.name, u.district, u.phone, ar.croptype,ar.datetime from user u join audit_reqs ar on u.phoneid = ar.generatedfromid;', function(err, results, fields) {
        if (err)
            return callback(err, null);

        console.log('The result is: ', results[0]);

        callback(results);
    });


  connection.end();
}

router.get('/getdetailbycroptypeanduser', function(req, res, next) {
    console.log('getdetailbycroptypeanduser');
    getdetailbycroptypeanduser(function(results){
		res.send(results);
	});
});


function getdetailbycroptypeanduser(callback){
  var connection = mysql.createConnection({
      host     : 'localhost',
      user     : '*****',
      password : '******',
      database : 'crop_dev'
  });

  connection.connect();

    connection.query('select u.name, u.district, u.phone, ar.croptype,ar.datetime, count(ar.croptype) as countByCropType from user u join audit_reqs ar on u.phoneid = ar.generatedfromid group by u.name, ar.croptype;', function(err, results, fields) {
        if (err)
            return callback(err, null);

        console.log('The result is: ', results[0]);

        callback(results);
    });


  connection.end();
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

module.exports = router;