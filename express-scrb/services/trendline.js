var gettrendlineReport = function(data) {
  'use strict';
  var deferred = q.defer();
  var year=parseInt(data.year);
  var month=parseInt(data.month);
  if(data['units[]']){
    var units=data['units[]'];
  }else{
    var units=[data.units];
  }
  if(data['heads[]']){
    var heads=data['heads[]'];
  }else{
    var heads=[data.heads];
  }
  var currentMonth = (new Date()).getMonth();
  if(month > currentMonth){
    currentMonth=currentMonth;
  }else if(month <= currentMonth){
    currentMonth=month;
  }
  executeQuery.queryForAll(sqlQueryMap['gettrendlineReport'],[year,year,currentMonth,year,month,year-1,month,year-2,month,year-3,month,year-4,month,units,heads], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        gettrendlineReport: result
      });
    }
  });
  return deferred.promise;
};
var trendlineCrimeAgainstWomen = function(data) {
  'use strict';
  var deferred = q.defer();
  var year=parseInt(data.year);
  var month=parseInt(data.month);
  if(data['units[]']){
    var units=data['units[]'];
  }else{
    var units=[data.units];
  }
  if(data['heads[]']){
    var heads=data['heads[]'];
  }else{
    var heads=[data.heads];
  }
  var currentMonth = (new Date()).getMonth();
  if(month > currentMonth){
    currentMonth=currentMonth;
  }else if(month <= currentMonth){
    currentMonth=month;
  }
  executeQuery.queryForAll(sqlQueryMap['trendlineCrimeAgainstWomen'],[year,year,currentMonth,year,month,year-1,month,year-2,month,year-3,month,year-4,month,units,heads], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        trendlineCrimeAgainstWomen: result
      });
    }
  });
  return deferred.promise;
};

var trendlineCrimeAgainstSCST = function(data) {
  'use strict';
  var deferred = q.defer();
  var year=parseInt(data.year);
  var month=parseInt(data.month);
  if(data['units[]']){
    var units=data['units[]'];
  }else{
    var units=[data.units];
  }
  if(data['heads[]']){
    var heads=data['heads[]'];
  }else{
    var heads=[data.heads];
  }
  var currentMonth = (new Date()).getMonth();
  if(month > currentMonth){
    currentMonth=currentMonth;
  }else if(month <= currentMonth){
    currentMonth=month;
  }
  executeQuery.queryForAll(sqlQueryMap['trendlineCrimeAgainstSCST'],[year,year,currentMonth,year,month,year-1,month,year-2,month,year-3,month,year-4,month,units,heads], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        trendlineCrimeAgainstSCST: result
      });
    }
  });
  return deferred.promise;
};
var trendlineroadaccidents = function(data) {
  'use strict';
  var deferred = q.defer();
  var year=parseInt(data.year);
  var month=parseInt(data.month);
  if(data['units[]']){
    var units=data['units[]'];
  }else{
    var units=[data.units];
  }
  if(data['heads[]']){
    var heads=data['heads[]'];
  }else{
    var heads=[data.heads];
  }
  executeQuery.queryForAll(sqlQueryMap['trendlineroadaccidents'],[year,year-1,year-2,year-3,year-4], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        trendlineroadaccidents: result
      });
    }
  });
  return deferred.promise;
};
module.exports = {
  gettrendlineReport: gettrendlineReport,
  trendlineCrimeAgainstWomen:trendlineCrimeAgainstWomen,
  trendlineCrimeAgainstSCST:trendlineCrimeAgainstSCST,
  trendlineroadaccidents:trendlineroadaccidents
};
