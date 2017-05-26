var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var uploads = multipart();

router.post('/getZoneWise', function(req, res, next) {
  'use strict';
  var promises = [];
  let values = {};
  console.log(req.body);
  promises.push(distrctsReport.allZonesAndTotalIPC(req.body));
  promises.push(distrctsReport.allZonesAndSingleGroup(req.body));
  promises.push(distrctsReport.singleZonesAndSingleGroup(req.body));
  promises.push(distrctsReport.singleZonesAndSingleGroup(req.body));
});

router.post('/getDistrctsWise', function(req, res, next) {
  'use strict';
  try{
  var promises = [];
  let values = {};
  //promises.push(distrctsReport.crimesByDistrcts(req.body));
  //promises.push(distrctsReport.crimesByCategory(req.body));
  //promises.push(distrctsReport.allCrimesAllDistricts(req.body));
  if (req.body['zoneId[]']) {
      console.log('.................1.................................');
        if(typeof(req.body['zoneId[]']) == 'string'){
            var zoneId = [req.body['zoneId[]']];
        }else{
            var zoneId = req.body['zoneId[]'];
        }
        var group = req.body['group[]'];
        console.log(typeof(req.body['group[]']));
        if(zoneId.length>1){
          if(group.length > 20){
            promises.push(distrctsReport.allZonesAndCrimeHeads(req.body));
          }else{
            promises.push(distrctsReport.allZonesAndSingleGroup(req.body));
          }
        }else{

          if (group.length > 20){
              promises.push(distrctsReport.singleZoneAndTotalIPC(req.body));
          }else{
              promises.push(distrctsReport.singleZoneAndSingleGroup(req.body));
          }
        }
  } else if (req.body['groupId'] == "women") {
    console.log('............................2......................');
    promises.push(distrctsReport.allRangescrimeOnWomen(req.body));
  } else if (req.body['groupId'] == "faction") {
    console.log('...............................3...................');
    promises.push(distrctsReport.allRangesFaction(req.body));
  } else if (req.body['groupId[]'] && (req.body['ranges[]'] || req.body['ranges'])) {
    console.log('...................................4...............');
    promises.push(distrctsReport.allRangesSingleGroup(req.body));
  } else if ((req.body['rangeId[]'] || req.body['rangeId'])&& (req.body['groupId[]'] || req.body['groupId'])) {
    console.log('..................,,,,,,,,.;;;;;;;;;;;;;;;;......5.........................');
    promises.push(distrctsReport.singleRangesSingleGroup(req.body));
  } else if ((req.body['rangeId[]'] || req.body['rangeId']) && (req.body['group[]'] || req.body['group'])) {
    console.log('..............................6....................');
    promises.push(distrctsReport.singleRangesTotlaIPC(req.body));
  } else {
    console.log('..................,,,,,,,,......7..........................');
    promises.push(distrctsReport.allCompatisionsData(req.body));
  }

  q.allSettled(promises)
    .then(function(result) {
      _.forEach(result, function(ele, index) {
        if (ele.state == 'fulfilled') {
          console.log(ele);
          _.extend(values, ele.value);
        }
      });
      res.statusCode = 200;
      //console.log('---------------- values-----------------------')
      //console.log(values);
      res.send(values);
    })
    .fail(function(err) {
      console.log(err);
    })
  }catch(err){
    console.log(err);
  }

});
router.post('/curentyear/report', function(req, res, next) {
  'use strict';
  var promises = [];
  let values = {};
  promises.push(distrctsReport.crimesByDistrctsAndYear(req.body));
  promises.push(distrctsReport.crimesByCategoryAndYear(req.body));
  promises.push(distrctsReport.allCrimesAllDistrictsAndYear(req.body));
  q.allSettled(promises)
    .then(function(result) {
      _.forEach(result, function(ele, index) {
        if (ele.state === 'fulfilled') {
          console.log(ele);
          _.extend(values, ele.value);
        }
      });
      res.statusCode = 200;
      res.send(values);
    })
    .fail(function(err) {
      console.log(err);
    })
});

module.exports = router;
