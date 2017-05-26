var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var uploads = multipart();
router.get('/', function(req, res, next) {
  var object={};
  object.trendline=true;
  object.layout="main";
  res.render('pages/trendline', object);
});
router.post('/getreports',function(req,res,next){
  'use strict';
  var promises = [];
  let values ={};
  console.log('???????????????????????????????????????');
  console.log(req.body['heads[]']);
  console.log(req.body);
  if (req.body['heads[]']){
      var heads = req.body['heads[]'];
      if (req.body.type == 'women'){
          promises.push(trendlineReport.trendlineCrimeAgainstWomen(req.body));
      } else if (req.body.type == 'faction'){
          promises.push(trendlineReport.trendlineCrimeAgainstSCST(req.body));
      }else if(req.body.type == 'accidents'){
          promises.push(trendlineReport.trendlineroadaccidents(req.body));
      }else{
        console.log('exicuting this method');
          promises.push(trendlineReport.gettrendlineReport(req.body));
      }
  }

  q.allSettled(promises)
    .then(function(result){
      _.forEach(result,function(ele,index){
        if(ele.state === 'fulfilled'){
            //console.log(ele);
          _.extend(values,ele.value);
        }
      });
      res.statusCode = 200;
      res.send(values);
    })
    .fail(function(err){
      console.log(err);
    })
});
module.exports = router;
