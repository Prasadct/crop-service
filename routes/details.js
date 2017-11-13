var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/', function(req, res, next){
  var category = req.query.cat;
	 console.log(category);
   var type = category;
  var generatedfrom = req.query.generatedfrom;
  var id = req.query.id;
  update(generatedfrom, id, type);
   if (category == 1) {
      res.render('crops/1-si'); 
   } else if (category == 2) {
      res.render('crops/2-si'); 
   } else if (category == 3) {
      res.render('crops/3-si'); 
   } else if (category == 4) {
      res.render('crops/4-si'); 
   } else if (category == 5) {
      res.render('crops/5-si'); 
   } else if (category == 6) {
      res.render('crops/6-si'); 
   } else if (category == 7) {
      res.render('crops/7-si'); 
   } else if (category == 8) {
      res.render('crops/8-si'); 
   } else if (category == 9) {
      res.render('crops/9-si'); 
   } else if (category == 10) {
      res.render('crops/10-si'); 
   } else if (category == 11) {
      res.render('crops/11-si'); 
   } else if (category == 12) {
      res.render('crops/12-si'); 
   } else if (category == 13) {
      res.render('crops/13-si'); 
   } else if (category == 14) {
      res.render('crops/14-si'); 
   } else {
      res.render('crops/1-si'); 
   }
		
});

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