var gettop5crimes = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  if (data['head[]']) {
    var head = data['head[]'];
  } else {
    var head = [data.head];
  }
  console.log(month, data.year, head);
  executeQuery.queryForAll(sqlQueryMap['gettop5crimes'], [month, data.year, head], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        gettop5crimes: result
      });
    }
  });
  return deferred.promise;
}

var getbottom5crimes = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  if (data['head[]']) {
    var head = data['head[]'];
  } else {
    var head = [data.head];
  }
    console.log(month, data.year, head);
  executeQuery.queryForAll(sqlQueryMap['getbottom5crimes'], [month, data.year, head], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        getbottom5crimes: result
      });
    }
  });
  return deferred.promise;
}

module.exports = {
  gettop5crimes: gettop5crimes,
  getbottom5crimes: getbottom5crimes
}
