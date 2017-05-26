var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var uploads = multipart();
router.get('/', function(req, res, next) {
  var object={};
  object.comparision=true;
  object.layout="main";
  res.render('pages/comparision', object);
});
router.post('/gettop5bottom5', function(req, res, next) {
  'use strict';
  var promises = [];
  let values = {};
  console.log('[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]');
  console.log(req.body);
  promises.push(crimesReport.gettop5crimes(req.body));
  promises.push(crimesReport.getbottom5crimes(req.body));
  q.allSettled(promises)
    .then(function(result) {
      _.forEach(result, function(ele, index) {
        if (ele.state === 'fulfilled') {
          console.log(ele);
          _.extend(values, ele.value);
        }
      });
      res.statusCode = 200;
      console.log(values);
      res.send(values);
    })
    .fail(function(err) {
      console.log(err);
    })
});
module.exports = router;
