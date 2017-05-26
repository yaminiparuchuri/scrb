var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var object={};
  object.login=true;
  res.render('pages/login', object);
});

router.post('/login', function(req, res, next) {
 var object={};
   var currDate = moment();
         currDate = currDate.endOf('month');  
  object.week   = parseInt(moment().date()/7);
  if(object.week === 0){
    currDate = currDate.subtract(1,'months').endOf('month');
    object.week = 4;
    object.month = currDate.format('M');
    object.year =  currDate.format('YYYY');
  }else{
    object.month  = currDate.format('M');
    object.year   = currDate.format('YYYY');
    if(object.week === 4){
      object.week = 3;
    }
  } 

  reportService.login(req.body).then(function(result){
    res.statusCode = 200;
    //res.send(result);
    req.session.user=result.login[0];
	 console.log('Login done successfully:');
    if(req.session.user.role==='officer'){
      res.redirect('/dashboard');
    }else if(req.session.user.role==='scrb'){
      res.redirect('/data/scrb');
    }else{
			//currDate = currDate.subtract(1,'months').endOf('month');
        res.redirect('/data/dcrb/weekly'+'/'+object.year+'/'+object.month+'/'+object.week);
    }

  })
  .fail(function(err){
    console.log(err);
    res.statusCode = 500;
    res.redirect('/');
  })

});

router.get('/logout',function(req,res){
  req.session.destroy();
  console.log('session cleared');
  res.redirect('/');
})

module.exports = router;
