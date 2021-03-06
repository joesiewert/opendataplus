var express = require('express');
var router = express.Router();
var UserCtrlr = require('../app/users/user_controller');
var dbutils = require('../controllers/dbutils');

/* GET users listing. */
router.get('/', function(req, res) {
  var db = req.db;

  //parse http service request
  try {
    var query = dbutils.ParseMongoQueryParams(req.query);
    console.log("Query str:", query)
  } catch (e) {
    throw e;
  }

  //get a dataset controller and get some results
  (new UserCtrlr).find(db, query, function (results) {

    if (req.accepts('html')) {
      res.render('collection', { "title": "users", "results": results });
    } else {
      res.send(results);
    }
  });
});

/*
 * POST to users creates a new dataset
 * accept:  json or url-form-encoded
 */
router.put('/:userid', function(req, res) {

console.log("In user put:", req.body.to_string)

/*
  try {
    var bodyobj = JSON.parse(req.body.to_string);
  } catch (e) {
console.log(e)
    throw e;
  }
*/
  bodyobj = req.body;

  var newUserObj = { email: req.param("userid"), name: bodyobj.name };

  var userobj = {'username': "user1", 'isDatasetAuthor': true};
  (new UserCtrlr).insert(req.db, newUserObj, function(results) {
    res.statusCode=201;
    console.log("POST RESULT1: " + results);
    if (req.accepts('html')) {
      res.send(results);
    } else {
      var obj = { 'id': results};
      console.log("POST RESULT: " + results);
      res.send(obj);
    }
  });
});


module.exports = router;
