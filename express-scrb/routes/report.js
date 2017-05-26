var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var uploads = multipart();
var weeklyReportService = require('../services/weekly-report');


/* GET home page. */

router.post('/uploadReport', uploads, function(req, res, next) {
  console.log(req.files);
  var fileInformation = req.files.qqfile;
   var data = req.body;
   data.user_id = req.session.user.id;
   data.district_id = req.session.user.distrctid;
   data.district_name = req.session.user.district_name;
  //console.log(data);
  reportService.checkReportUploadStatus(data)
    .then(function(result){
      reportService.uploadXlsxData(data,fileInformation)
        .then(function(result){
          res.statusCode = 200;
          res.send({
            success:true,
            result:result
          });
        })
        .fail(function(err){
          if(err.validationErrors){
            res.statusCode = 400;
            res.send({
              success:false,
              error:err
            });
          }else{
          res.statusCode = 500;
          res.send({
            success:false,
            error:err
          });
          }
        });
    })
    .fail(function(err){
      res.statusCode = 400;
      if(err == 'Uploaded'){
        res.send('Report uploaded already');
      }else if(err.validationErrors){
        console.log(err);
        res.send({
          success:false,
          error:err
        });
      }else{
        res.send({
          success:false,
          message:err
        });
      }
    });
});

router.post('/totalunits',function(req,res,next){
  'use strict';
  var promises = [];
  let values ={};
  promises.push(reportService.totalUnitsList(req.body));
  q.allSettled(promises)
    .then(function(result){
      _.forEach(result,function(ele,index){
        if(ele.state === 'fulfilled'){
            console.log(ele);
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

router.post('/getReports',function(req,res,next){
  'use strict';
  var promises = [];
  let values ={};
  console.log('coming hear once .......................................')
  promises.push(reportService.endDateOfReports(req.body));
  promises.push(reportService.totalCrimesReported(req.body));
  promises.push(reportService.totalCrimesByMonthAndYear(req.body));
  promises.push(reportService.propertyCrimesByMonthAndYear(req.body));
  promises.push(reportService.bodyOffencesCrimesByMonthAndYear(req.body));
  promises.push(reportService.whiteCollarCrimeByMonthAndYear(req.body));
  promises.push(reportService.accidentsByMonthAndYear(req.body));
  promises.push(reportService.otherIpcByMonthAndYear(req.body));
  promises.push(reportService.factionOffences(req.body));
  promises.push(reportService.offenceAgainstWomen(req.body));


  //promises.push(reportService.)
  q.allSettled(promises)
    .then(function(result){
      _.forEach(result,function(ele,index){
        if(ele.state === 'fulfilled'){
            console.log(ele);
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


router.get('/downloadReport',function (req,res) {
	'use strict';

});

router.get('/', function(req, res, next) {
  var object={};
  object.distrcts=true;
  res.render('pages/distrctreport', object);
});

router.post('/upload/weekly/report',uploads,function(req,res){

   var fileInformation = req.files.qqfile;
   var data = req.body;
   data.user_id =  req.session.user.id;
   data.district_id = req.session.user.distrctid;
   data.district_name = req.session.user.district_name;
      weeklyReportService.deleteMonthlyMcrReports(data)
        .then(function(result){
          weeklyReportService.uploadWeeklyDataAndMonth(data,fileInformation)
            .then(function(result){              
              res.statusCode = 200;
              res.send({
                success:true,
                result:result
              });
            })
            .fail(function(err){
              if(err.validationErrors){                
                res.statusCode = 400;
                res.send({
                  success:false,
                  error:err
                });
              }else{
                res.statusCode = 500;
                res.send({
                  success:false,
                  error:err
                });
              }
            });
        })
        .fail(function(err){
          res.statusCode = 500;
          res.send(err);
        });          
});

module.exports = router;
