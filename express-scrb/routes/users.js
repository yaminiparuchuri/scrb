var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var object={};
  object.dashboard=true;
  res.render('pages/dashboard', object);
});

module.exports = router;
