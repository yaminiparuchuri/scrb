

var executeTableQuery = function (queryData,tableName,callback) {
	'use strict';
		executeQuery.queryForAll(queryData.query,queryData.data,function (err,result) {
			if(err){
				console.log(err);
				callback(err,null,tableName);
			}else{
				callback(null,result,tableName);
			}
		});

};


var executeParallelQueries = function (queries,callback) {
	'use strict';
	var tableResult = {};
	var totalLength = Object.keys(queries).length;
	var executeQueries = 0;
	_.forEach(queries,function(ele,key){
		executeTableQuery(ele,key,function (err,result,tableName) {
			executeQueries += 1;
			tableResult[tableName] = {
				error:err,
				result:result
			};
			if(totalLength == executeQueries){
				callback(tableResult);
			}
		});
	});

};








module.exports = {
	executeParallelQueries :executeParallelQueries
};
