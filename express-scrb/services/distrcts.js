var crimesByDistrcts = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  if (data['headId[]']) {
    var headId = data['headId[]'];
  } else {
    var headId = [data.headId];
  }
  if (data['districtId[]']) {
    var districtId = data['districtId[]'];
  } else {
    var districtId = [data.districtId];
  }
  executeQuery.queryForAll(sqlQueryMap['crimesByDistrcts'], [data.year, month, headId, districtId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        crimesByDistrcts: result
      });
    }
  });
  return deferred.promise;
};

var crimesByCategory = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  if (data['headId[]']) {
    var headId = data['headId[]'];
  } else {
    var headId = [data.headId];
  }
  if (data['districtId[]']) {
    var districtId = data['districtId[]'];
  } else {
    var districtId = [data.districtId];
  }
  executeQuery.queryForAll(sqlQueryMap['crimesByCategory'], [data.year, month, headId, districtId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        crimesByCategory: result
      });
    }
  });
  return deferred.promise;
};

var allCrimesAllDistricts = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['headId[]']) {
    var headId = data['headId[]'];
  } else {
    var headId = [data.headId];
  }
  if (data['districtId[]']) {
    var districtId = data['districtId[]'];
  } else {
    var districtId = [data.districtId];
  }
  executeQuery.queryForAll(sqlQueryMap['allCrimesAllDistricts'], [headId, districtId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        allCrimesAllDistricts: result
      });
    }
  });
  return deferred.promise;
};

var crimesByDistrctsAndYear = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['headId[]']) {
    var headId = data['headId[]'];
  } else {
    var headId = [data.headId];
  }
  if (data['districtId[]']) {
    var districtId = data['districtId[]'];
  } else {
    var districtId = [data.districtId];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['crimesByDistrctsAndYear'], [data.year, month, headId, districtId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        crimesByDistrcts: result
      });
    }
  });
  return deferred.promise;
}

var crimesByCategoryAndYear = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['headId[]']) {
    var headId = data['headId[]'];
  } else {
    var headId = [data.headId];
  }
  if (data['districtId[]']) {
    var districtId = data['districtId[]'];
  } else {
    var districtId = [data.districtId];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['crimesByCategoryAndYear'], [data.year, month, headId, districtId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        crimesByCategory: result
      });
    }
  });
  return deferred.promise;
}

var allCrimesAllDistrictsAndYear = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['headId[]']) {
    var headId = data['headId[]'];
  } else {
    var headId = [data.headId];
  }
  if (data['districtId[]']) {
    var districtId = data['districtId[]'];
  } else {
    var districtId = [data.districtId];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['allCrimesAllDistrictsAndYear'], [data.year, month, headId, districtId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        allCrimesAllDistricts: result
      });
    }
  });
  return deferred.promise;
}

var allCompatisionsData = function(data) {
  console.log('lllllllllllllllllllllllllll');

  'use strict';
  var deferred = q.defer();
  if (data['ranges[]']) {
    var ranges = data['ranges[]'];
  } else {
    var ranges = [data.ranges];
  }
  if (data['group[]']) {
    var crimes = data['group[]'];
  } else {
    var crimes = [data.group];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  console.log('lllllllllllllllllllllllllll');
  console.log(data.year, data.month, ranges, crimes);
  executeQuery.queryForAll(sqlQueryMap['allCompatisionsData'], [data.year, month, ranges, crimes], function(err, result) {
console.log(err);
console.log(result);
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        allCompatisionsData: result
      });
    }
  });
  return deferred.promise;
}
var allRangesSingleGroup = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['ranges[]']) {
    var ranges = data['ranges[]'];
  } else {
    var ranges = [data.ranges];
  }
  if (data['groupId[]']) {
    var groupId = data['groupId[]'];
  } else {
    var groupId = [data.groupId];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['allRangesSingleGroup'], [data.year, month, groupId, ranges], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        allRangesSingleGroup: result
      });
    }
  });
  return deferred.promise;
}

var singleRangesSingleGroup = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['rangeId[]']) {
    var rangeId = data['rangeId[]'];
  } else {
    var rangeId = [data.rangeId];
  }
  if (data['groupId[]']) {
    var group = data['groupId[]'];
  } else {
    var group = [data.groupId];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  console.log(data.year, month, group, rangeId);
  executeQuery.queryForAll(sqlQueryMap['singleRangesSingleGroup'], [data.year, month, group, rangeId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      console.log(result);
      deferred.resolve({
        singleRangesSingleGroup: result
      });
    }
  });
  return deferred.promise;
}
var singleRangesTotlaIPC = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['rangeId[]']) {
    var rangeId = data['rangeId[]'];
  } else {
    var rangeId = [data.rangeId];
  }
  if (data['crimeIPC[]']) {
    var group = data['crimeIPC[]'];
  } else {
    var group = [data.crimeIPC];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  console.log(data.year, data.month, rangeId);
  executeQuery.queryForAll(sqlQueryMap['singleRangesTotlaIPC'], [data.year, month, rangeId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        singleRangesTotlaIPC: result
      });
    }
  });
  return deferred.promise;
}

var allRangescrimeOnWomen = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['ranges[]']) {
    var rangeId = data['ranges[]'];
  } else {
    var rangeId = [data.ranges];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['allRangescrimeOnWomen'], [data.year, month, rangeId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        allRangescrimeOnWomen: result
      });
    }
  });
  return deferred.promise;
}

var allRangesFaction = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['ranges[]']) {
    var rangeId = data['ranges[]'];
  } else {
    var rangeId = [data.ranges];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['allRangesFaction'], [data.year, month, rangeId, data.year, month, rangeId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        allRangesFaction: result
      });
    }
  });
  return deferred.promise;
}

var allZonesAndCrimeHeads = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['zoneId[]']) {
    var zoneId = data['zoneId[]'];
  } else {
    var zoneId = [data.zoneId];
  }
  if (data['group[]']) {
    var group = data['group[]'];
  } else {
    var group = [data.group];
  }
  console.log('??????????????????????????????????????????????????');
  console.log(data.year, data.month, group, zoneId);
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['allZonesAndCrimeHeads'], [data.year, month, group, zoneId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        allZonesAndCrimeHeads: result
      });
    }
  });
  return deferred.promise;
}

var allZonesAndTotalIPC = function(data){
  'use strict';
  var deferred = q.defer();
  executeQuery.queryForAll(sqlQueryMap['allZonesAndTotalIPC'], [data.year, month, group, zoneId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        allZonesAndTotalIPC: result
      });
    }
  });
  return deferred.promise;
}

var singleZoneAndTotalIPC = function(data){
  'use strict';
  var deferred = q.defer();
  console.log("Im my data");
  console.log(data);
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }

  if( data['zoneId[]']){
    var zoneId = data['zoneId[]'];
  }else{
    var zoneId = [data.zoneId];
  }
  executeQuery.queryForAll(sqlQueryMap['singleZoneAndTotalIPC'], [data.year, month, zoneId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      console.log(result);
      deferred.resolve({
        singleZoneAndTotalIPC: result
      });
    }
  });
  return deferred.promise;
}



var singleZoneAndSingleGroup = function(data){
  'use strict';
  var deferred = q.defer();
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  if( data['zoneId[]']){
    var zoneId = data['zoneId[]'];
  }else{
    var zoneId = [data.zoneId];
  }
  if( data['group[]']){
    var group = data['group[]'];
  }else{
    var group = [data.group];
  }
  executeQuery.queryForAll(sqlQueryMap['singleZoneAndSingleGroup'], [data.year, month, group, zoneId], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      //console.log(result);
      deferred.resolve({
        singleZoneAndSingleGroup: result
      });
    }
  });
  return deferred.promise;
}

var allZonesAndSingleGroup = function(data){
  'use strict';
  var deferred = q.defer();
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  if( data['group[]']){
    var group = data['group[]'];
  }else{
    var group = [data.group];
  }
  executeQuery.queryForAll(sqlQueryMap['allZonesAndSingleGroup'], [data.year, month, group], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        allZonesAndSingleGroup: result
      });
    }
  });
  return deferred.promise;
}

module.exports = {
  allZonesAndTotalIPC:allZonesAndTotalIPC,
  crimesByDistrcts: crimesByDistrcts,
  crimesByCategory: crimesByCategory,
  allCrimesAllDistricts: allCrimesAllDistricts,
  crimesByDistrctsAndYear: crimesByDistrctsAndYear,
  crimesByCategoryAndYear: crimesByCategoryAndYear,
  allCrimesAllDistrictsAndYear: allCrimesAllDistrictsAndYear,
  allCompatisionsData: allCompatisionsData,
  allRangesSingleGroup: allRangesSingleGroup,
  singleRangesSingleGroup: singleRangesSingleGroup,
  singleRangesTotlaIPC: singleRangesTotlaIPC,
  allRangescrimeOnWomen: allRangescrimeOnWomen,
  allRangesFaction: allRangesFaction,
  allZonesAndCrimeHeads: allZonesAndCrimeHeads,
  singleZoneAndTotalIPC:singleZoneAndTotalIPC,
  singleZoneAndSingleGroup: singleZoneAndSingleGroup,
  allZonesAndSingleGroup: allZonesAndSingleGroup
};
