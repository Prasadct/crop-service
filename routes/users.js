var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/updateuser', function(req, res, next) {
	console.log(req.query.id);
	console.log(req.query.name);
	console.log(req.query.phone);
	console.log(req.query.district);
    console.log(req.query.address);
    var phoneid = req.query.id;
	var name = req.query.name;
	var phone = req.query.phone;
	var district = req.query.district;
	var address = req.query.address;
    
  			console.log(' calling insertUser(phoneid, name,  phone, district, address, status)', phoneid);
    insertUser(phoneid, name,  phone, district, address, 'ACTIVE');
  res.send('respond with a resource');
});

function insertUser(phoneid, name,  phone, district, address, status){
    
  			console.log('insertUser(phoneid, name,  phone, district, address, status)', phoneid);
	var connection = mysql.createConnection({
  		host     : 'localhost',
  		user     : '*******',
  		password : '********',
  		database : 'crop_dev'
	});

	connection.connect();
	connection.query('insert into user(phoneid, name,  phone, district, address, status) values(\''+phoneid+'\',\''+name+'\',\''+phone + '\',\''+district+'\',\''+address+'\',\''+ status + '\') ON DUPLICATE KEY UPDATE phoneid=\''+phoneid+
                     '\', name=\''+name+'\',  phone=\''+phone + '\', district=\''+district+'\', address=\''+address+
                     '\', status=\''+ status + '\'', function(err, rows, fields) {
  			if (err) throw err;
  			console.log('The solution is: ', rows);
		});	
	connection.end();
}

module.exports = router;
