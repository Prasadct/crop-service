var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CropAdvisor', message: 'Enabling farmer\'s life easy' });
});

router.get('/PrivacyPolicy', function(req, res, next) {
  res.render('privacy_policy', { title: 'CropAdvisor', message: 'Enabling farmer\'s life easy' });
});

router.get('/forum', function(req, res, next){
			console.log('forum...');
		res.render('forum', { title: 'CropAdvisor', message: 'Enabling farmer\'s life easy'});
});

router.get('/forum_ind', function(req, res, next){
			console.log('forum...');
		res.render('forum_ind', { title: 'CropAdvisor', message: 'Enabling farmer\'s life easy', id: '\''+req.query.id +'\'' });
});

router.get('/crops', function(req, res, next){
	var type = req.query.cropType;
	if (type == null) {
		type = 0
	};

	getCrops(type, function(rows){
		var objs = [];
			for (var i = 0;i < rows.length; i++) {
    			objs.push({id: rows[i].id,
    						type: rows[i].type,
    						crop_name_si: rows[i].crop_name_si,
    						crop_name_ta: rows[i].crop_name_ta,
    						crop_name_en: rows[i].crop_name_en,
    						image: rows[i].image,
                            status: rows[i].status});
			}
			console.log('Objectssss  ',objs);
		res.render('index', { title: 'CropAdvisor', message: JSON.stringify(objs) });	
	});
});

router.post('/crops', function(req, res, next){
	var type = req.query.cropType;
	var generatedfrom = req.query.generatedfrom;
	var id = req.query.id;
	if (type == null) {
		type = 0
	};
	update(generatedfrom, id, type);
	getCrops(type, function(rows){
		var objs = [];
			for (var i = 0;i < rows.length; i++) {
    			objs.push({id: rows[i].id,
    						type: rows[i].type,
    						crop_name_si: rows[i].crop_name_si,
    						crop_name_ta: rows[i].crop_name_ta,
    						crop_name_en: rows[i].crop_name_en,
    						image: rows[i].image,
                            status: rows[i].status});
			}
			console.log('Objectssss  ',objs);
			res.setHeader('Content-Type', 'application/json');
    		res.send(JSON.stringify(objs));	
	});
});

function getCrops(type,callback){
	var connection = mysql.createConnection({
  		host     : 'localhost',
  		user     : '*******',
  		password : '*******',
  		database : 'crop_dev'
	});

	connection.connect();
	if (type == 1) {
		connection.query('SELECT * from crop where type = 1 ', function(err, rows, fields) {
  			if (err) throw err;
  			console.log('The solution is: ', rows);
  			callback(rows);
		});
	} else if (type == 2) {
		connection.query('SELECT * from crop where type = 2', function(err, rows, fields) {
  			if (err) throw err;
  			console.log('The solution is: ', rows);
  			callback(rows);
		});
	} else{
		connection.query('SELECT * from crop', function(err, rows, fields) {
  			if (err) throw err;
  			console.log('The solution is: ', rows);
  			callback(rows);
		});		
	}
	
	connection.end();
}

function update(generatedfrom, id, type){
	var connection = mysql.createConnection({
  		host     : 'localhost',
  		user     : '*******',
  		password : '*******',
  		database : 'crop_dev'
	});

	connection.connect();

	var ts = new Date();
	var mints = 330;
  	ts = addMinutes(ts, mints);
	var date = ts.toISOString().
  		replace(/T/, ' ').      // replace T with a space
  		replace(/\..+/, '');     // delete the dot and everything after
	console.log(date);


		connection.query('insert into audit_reqs(croptype, generatedfrom, generatedfromid, datetime) values(\''+type+'\',\''+generatedfrom+'\',\''+id+'\',\''+ date + '\')', function(err, rows, fields) {
  			if (err) throw err;
  			console.log('The solution is: ', rows);
		});	
	
	connection.end();
}


function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

module.exports = router;
