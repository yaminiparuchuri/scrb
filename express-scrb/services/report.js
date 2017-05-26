var saveUploadxlsx = require('../utility/backgroundJobs/saveUploadxlsx');



var uploadXlsxData = function(data, fileInformation) {
  'use strict';
  var deferred = q.defer();
  var queries =[];
  try {
    let readData = fs.readFileSync(fileInformation.path);
        readData = nodeXlsx.parse(readData);
    let reportData = readXlsx.convertToJson(data.id, readData);

        if(reportData.errors){
          deferred.reject({validationErrors:reportData.errors});
          return deferred.promise;
        }

    let reportTypes = Object.keys(reportData);
    let sampleRecord = reportData[reportTypes[0]][0];
    let temp='' ;
    let count =0;
    let validReportsCount=0;
    let insertedRecords = {
          totalRecordsInserted:0
        };

    if(reportData.errors && reportData.errors.length){
      deferred.reject(errors);
      return deferred.promise;
    }

    data.year = parseInt(data.year);

    //data.month = parseInt(data.month);
    data.user_id = parseInt(data.user_id);
    data.district_id = parseInt(data.district_id);
  /*  if(isNaN(data.month)){
      data.month = "Annual";
    }*/
   _.forEach(reportTypes,function(reportType,index){
    queries =[];
    let insertQuery = sqlQueryMap[reportType];
      if(insertQuery){
          insertQuery = insertQuery.split('VALUES');
          insertedRecords[reportType] = reportData[reportType].length;
          _.forEach(reportData[reportType],function(sampleRecord,index){
            sampleRecord.report_year = data.year;
            sampleRecord.report_month = data.month;
            sampleRecord.created_user_id = data.user_id;
            sampleRecord.last_change_user_id = data.user_id;
            sampleRecord.head_id = index+1;
            sampleRecord.sex_age_grp_id = index+1;
            sampleRecord.crime_head_id = index+1;
            sampleRecord.motive_id = index+1;
            sampleRecord.occasion_id = index+1;
            sampleRecord.cause_id = index+1;
            sampleRecord.district_id = data.district_id;
              queries.push(eval('`'+insertQuery[1]+'`'));
          });

          queries = queries.join(',');
          insertQuery = insertQuery[0]+' VALUES '+queries;
          validReportsCount ++;          
          executeQuery.queryForAll(insertQuery,[],function(err,result){
          count ++;
            if(err){
              console.log(err);
            }else{
              insertedRecords.totalRecordsInserted += result.affectedRows;
            }
            if(count == validReportsCount){
              deferred.resolve(insertedRecords);
              data.fileInformation = fileInformation;
              data.uploadStatus =9;

              if(!data.week){
                saveUploadxlsx.savexlsxFile(data);
              }
            }

          }); 

      }else{
        //console.log(reportType);
      }

   });


    //  queries.splice(27,3);

    //deferred.resolve(reportData);
  } catch (err) {
    console.log(err);
    data.fileInformation = fileInformation;
              data.uploadStatus =0;
              if(!data.week){
                saveUploadxlsx.savexlsxFile(data);
              }else{
                console.log('Not went save save mode');
              }
              console.log('In the exception');
              console.log(err);
    deferred.reject(err);
  }
  return deferred.promise;
};

var totalCrimesReported = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['district[]']) {
    var districtCode = data['district[]'];
  } else {
    var districtCode = [data.district];
  }
	var month=[1,2,3,4,5,6,7,8,9,10,11,12];
  executeQuery.queryForAll(sqlQueryMap['totalCrimesReported'], [data.year, districtCode, districtCode], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        totalCrimesReported: result
      });
    }
  });
  return deferred.promise;
};


var totalCrimesByMonthAndYear = function(data, callback) {
  'use strict';
  var deferred = q.defer();
  try {
    if (data['district[]']) {
      var districtCode = data['district[]'];
    } else {
      var districtCode = [data.district];
    }
    if (data['month[]']) {
      var month = data['month[]'];
    } else {
      var month = [data.month];
    }
    executeQuery.queryForAll(sqlQueryMap['totalCrimesByMonthAndYear'], [data.year, month, districtCode], function(err, result) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve({
          totalCrimesByMonthAndYear: result
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
  return deferred.promise;
};

var propertyCrimesByMonthAndYear = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['district[]']) {
    var districtCode = data['district[]'];
  } else {
    var districtCode = [data.district];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['propertyCrimesByMonthAndYear'], [data.year, month, districtCode], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        propertyCrimesByMonthAndYear: result
      });
    }
  });
  return deferred.promise;
};

var bodyOffencesCrimesByMonthAndYear = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['district[]']) {
    var districtCode = data['district[]'];
  } else {
    var districtCode = [data.district];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['bodyOffencesCrimesByMonthAndYear'], [data.year, month, districtCode], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        bodyOffencesCrimesByMonthAndYear: result
      });
    }
  });
  return deferred.promise;
};

var whiteCollarCrimeByMonthAndYear = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['district[]']) {
    var districtCode = data['district[]'];
  } else {
    var districtCode = [data.district];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['whiteCollarCrimeByMonthAndYear'], [data.year, month, districtCode], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        whiteCollarCrimeByMonthAndYear: result
      });
    }
  });
  return deferred.promise;
};

var accidentsByMonthAndYear = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['district[]']) {
    var districtCode = data['district[]'];
  } else {
    var districtCode = [data.district];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['accidentsByMonthAndYear'], [data.year, month, districtCode], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        accidentsByMonthAndYear: result
      });
    }
  });
  return deferred.promise;
};


var otherIpcByMonthAndYear = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['district[]']) {
    var districtCode = data['district[]'];
  } else {
    var districtCode = [data.district];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['otherIpcByMonthAndYear'], [data.year, month, districtCode], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        otherIpcByMonthAndYear: result
      });
    }
  });
  return deferred.promise;
};
var login = function(data) {
  'use strict';
  var deferred = q.defer();

  executeQuery.queryForAll(sqlQueryMap['loginSQL'], [data.userid, data.password], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        login: result
      });
    }
  });
  return deferred.promise;
};
var totalUnitsList=function(data){
    'use strict';
    var deferred = q.defer();
    executeQuery.queryForAll(sqlQueryMap['totalUnitsList'], function(err, result) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve({
          totalUnitsList: result
        });
      }
    });
    return deferred.promise;
}
var reportsByMonth = function(data) {
  'use strict';
  var deferred = q.defer();

  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }


  executeQuery.queryForAll(sqlQueryMap['getReportsByMonth'], [month, data.year,data.districtid], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        reportsByMonth: result
      });
    }
  });
  return deferred.promise;
};
var getReportsByMonthForState = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['getReportsByMonthForState'], [month, data.year,month, data.year], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        reportsByMonth: result
      });
    }
  });
  return deferred.promise;
};


var reportsByQuarter = function(data) {
  'use strict';
  var deferred = q.defer();
  console.log('in district report quarterly');
  console.log(data);
  executeQuery.queryForAll(sqlQueryMap['getReportsByQuarterly'], [data.quarter, data.year,data.districtid], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        reportsByQuarter: result
      });
    }
  });
  return deferred.promise;
};
getReportsByQuarterlyForState = function(data) {
  'use strict';
  var deferred = q.defer();
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['getReportsByQuarterlyForState'], [month, data.year,month, data.year], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        reportsByQuarter: result
      });
    }
  });
  return deferred.promise;
};
getReportsByYearlyForState = function(data) {
  'use strict';
  var deferred = q.defer();

  executeQuery.queryForAll(sqlQueryMap['getReportsByYearlyForState'], [data.year,data.year], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        reportsByYear: result
      });
    }
  });
  return deferred.promise;
};

var factionOffences=function(data){
  'use strict';
  var deferred = q.defer();
  var factionOffencesResult = {};
  if (data['district[]']) {
    var districtCode = data['district[]'];
  } else {
    var districtCode = [data.district];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  executeQuery.queryForAll(sqlQueryMap['factionOffencesRiotings'], [data.year, month,districtCode], function(err, result) {
    if (err) {
      deferred.reject('Error in reading factionOffencesRiotings');
    } else {
      factionOffencesResult.factionOffencesRiotings = result;
      executeQuery.queryForAll(sqlQueryMap['factionOffencesMurders'], [data.year, month,districtCode], function(err, result) {
        if (err) {
          deferred.reject('Error in reading factionOffencesMurders');
        } else {
          factionOffencesResult.factionOffencesMurders = result;
          deferred.resolve(factionOffencesResult);
        }
      });
    }
  });
  return deferred.promise;
}
var offenceAgainstWomen=function(data){
  'use strict';
  var deferred = q.defer();
  if (data['district[]']) {
    var districtCode = data['district[]'];
  } else {
    var districtCode = [data.district];
  }
  if (data['month[]']) {
    var month = data['month[]'];
  } else {
    var month = [data.month];
  }
  console.log(month);
  executeQuery.queryForAll(sqlQueryMap['offenceAgainstWomen'], [data.year, month,districtCode], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        offenceAgainstWomen: result
      });
    }
  });
  return deferred.promise;
}
var reportsByYear = function(data) {
  'use strict';
  var deferred = q.defer();
  console.log('in reports by year');
  executeQuery.queryForAll(sqlQueryMap['getReportsByYearly'], [data.year,data.districtid], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        reportsByYear: result
      });
    }
  });
  return deferred.promise;
};


var downloadDataReport = function(data){
  'use strict';

};

/**
* Used to download selected month and district report from database
* We should have month,year,districdid,report(report number) in json object argument
**/

var getReportFileStream = function (data,callback) {
	'use strict';

	var queries
		 , stream
 	   , current_month = data.month
 	   , current_year = data.year
     , date = current_month+'-'+'01'+'-'+current_year
     , date =  moment(date,'MM-DD-YYYY')
     , previous_year = date.subtract(1,'years').endOf('year').format('YYYY')
 	   , before_previous_year = date.subtract(2,'years').endOf('year').format('YYYY')
     , previous_month = date.subtract(1,'months').endOf('month').format('M');

  if(data.districtid == 'all'){
    data.disctrictid = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20'
  }
	queries = writeXlsx.getReadQueries(data.report);
	_.forEach(queries,function (ele,key) {
    ele.query = eval('`'+ele.query+'`');
		ele.data = [data.report,data.year,data.districtid,data.month];
	});


	parallelExecute.executeParallelQueries(queries,function (result) {
		try {
			var resultMap = {}
      console.log(result);
			 _.forEach(result,function (ele,key) {
				if(ele.error){
					throw ele.error
				}else{
					resultMap[key] = ele.result;
				}
			});
      console.log('after for each in parallel execute queries');
      console.log(resultMap);
      resultMap['config'] = [
          {
            "current_month":current_month,
            "current_year":current_year,
            "previous_month":previous_month,
            "previous_year":previous_year,
            "before_previous_year":before_previous_year
          }
        ];

			writeXlsx.writeXlsxFile(resultMap,data.report,'m',function(err,stream){
        if(err){
          console.log(err);
          callback(err,null)
        }else{
          callback(null,stream);
        }

      });
			//callback(null,stream);
		}catch (err) {
      console.log('in the error');
			console.log(err);
			callback(err,null);
		}
	});

};

var getReportsByMonthForAllDistricts = function(data){
  var deferred = q.defer();
    executeQuery.queryForAll(sqlQueryMap['getReportsByMonthForAllDistricts'], [data.month,data.year,data.report], function(err, result) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result);
      }
    });
  return deferred.promise;


};


var getReportsByQuarterForAllDistricts = function(data){
  var deferred = q.defer();
  executeQuery.queryForAll(sqlQueryMap['getReportsByQuarterForAllDistricts'],[data.month,data.year,data.report],function(err,result){
    if(err){
      console.log(error);
      deferred.reject(err);
    }else{
      deferred.resolve(result);
    }
  });
  return deferred.promise;
};

var getReportsByYearForAllDistricts = function(data){
  var deferred = q.defer();
  executeQuery.queryForAll(sqlQueryMap['getReportsByYearForAllDistricts'],[data.month,data.year,data.report],function(err,result){
    if(err){
      deferred.reject(err);
    }else{
      deferred.resolve(result);
    }
  });
  return deferred.promise;
};

var getReportsMonthsInfo = function(current_month,current_year){
  var  date = current_month+'-'+01+'-'+current_year
    , current_month_name = moment(date,'MM-DD-YYYY').format('MMM')
    , previous_month_name = moment(date,'MM-DD-YYYY').subtract(1,'months').endOf('month').format('MMM')
    , previous_year = moment(date,'MM-DD-YYYY').subtract(1,'years').endOf('year').format('YYYY')
    , before_previous_year = moment(date,'MM-DD-YYYY').subtract(2,'years').endOf('year').format('YYYY');

  var info = [
     {
       "month1":current_month_name,
       "year1":current_year,
       "month2":previous_month_name,
       "year2": moment(date,'MM-DD-YYYY').subtract(1,'months').endOf('month').format('YYYY'),
       "month3": current_month_name,
       "year3": previous_year
     },
     {
       "month1":current_month_name,
       "year1":current_year,
       "month2":current_month_name,
       "year2":previous_year,
       "month3":current_month_name,
       "year3": before_previous_year
     }
   ];

   return info;
};

var getReportsQuarterInfo = function(quarter,year){
  var current_quarter = quarter.substr(-1);
  var quarter_start = moment().set('year',year).set('quarter',current_quarter).startOf('quarter');
  var quarter_end =   moment().set('year',year).set('quarter',current_quarter).endOf('quarter');
  var info =  [
    {
      "quarter":quarter,
      "start_month":quarter_start.format('MMM'),
      "end_month":quarter_end.format('MMM'),
      "year":year
    }
  ];
  return info;
};

var getScrbReportFileStream = function(data,callback){
  var queries
    , stream
    , current_month = data.month
    , current_year = data.year
    , date = current_month+'-'+01+'-'+current_year
    , current_month_name = moment(date,'MM-DD-YYYY').format('MMM')
    , previous_month_name = moment(date,'MM-DD-YYYY').subtract(1,'months').endOf('month').format('MMM')
    , previous_year = moment(date,'MM-DD-YYYY').subtract(1,'years').endOf('year').format('YYYY')
    , before_previous_year = moment(date,'MM-DD-YYYY').subtract(2,'years').endOf('year').format('YYYY')
    , previous_month = moment(date,'MM-DD-YYYY').subtract(1,'months').endOf('month').format('M')
    , previous_month_year = moment(date,'MM-DD-YYYY').subtract(1,'months').endOf('month').format('YYYY')
    , bufferToStream;

  if(data.districtid == 'all'){
    data.districtid = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  }else{
    data.districtid = [data.districtid];
  }

  queries = writeXlsx.getReadQueries(data.report);
  _.forEach(queries,function (ele,key) {
      ele.query = eval('`'+ele.query+'`');
      ele.data = [data.year,data.districtid,data.month];
  });


  parallelExecute.executeParallelQueries(queries,function (result) {
    try {
      var resultMap = {}

       _.forEach(result,function (ele,key) {
        if(ele.error){
          console.log(ele.error);
          throw ele.error
        }else{
        //  console.log(ele.result);
          resultMap[key] = ele.result;
        }
      });

      resultMap['config'] = getReportsMonthsInfo(current_month,current_year);
      console.log(resultMap);
    	writeXlsx.writeXlsxFile(resultMap,data.report,'',function(err,stream){
        if(err){
          callback(err,null);
        }else{
          callback(null,stream);
        }
      });
      //callback(null,stream);
    }catch (err) {
      console.log('in the error');
      console.log(err);
      callback(err,null);
    }
  });


};


var getSCRBQuarterlyReportStream = function(data,callback){
  var queries
    , current_quarter = data.current_quarter
    , current_year = data.current_year;
  queries = writeXlsx.getReadQueries(data.report);
  _.forEach(queries,function (ele,key) {
      ele.query = eval('`'+ele.query+'`');
      ele.data = [data.current_year,data.districtid,data.month];
  });
  parallelExecute.executeParallelQueries(queries,function (result) {
    try{
    var resultMap  = {};
      _.forEach(result,function(ele,key){
        if(ele.error){
          console.log(ele.error);
          throw ele.error;
        }else{
          resultMap[key] = ele.result;
        }
      });
      resultMap["config"] = getReportsQuarterInfo(current_quarter,current_year);
      writeXlsx.writeXlsxFile(resultMap,data.report,'',function(err,stream){
        if(err){
          console.log(err);
          callback(err,null);
        }else{
          callback(null,stream);
        }
      });

    }catch(err){
      console.log(err);
      console.log(' in the report generation');
      callback(err,null);
    }

//      resultMap['config'] = [{},{}];
  });
}

var getReportsInfo = function(data){
  var deferred = q.defer();
    console.log('before going to execute');
    executeQuery.queryForAll(sqlQueryMap['getReportsInfo'],[data.period],function(err,result){
      if(err){
        deferred.reject(err);
      }else{
        deferred.resolve(result);
      }
    });

  return deferred.promise;
}

var getOutReportsInfo = function(data){
  var deferred = q.defer();
    console.log('before going to execute');
    executeQuery.queryForAll(sqlQueryMap['getOutReportsInfo'],[data.period],function(err,result){
      if(err){
        deferred.reject(err);
      }else{
        deferred.resolve(result);
      }
    });

  return deferred.promise;
}

var getReportById = function(report_id){
  var deferred = q.defer();
  executeQuery.queryForAll(sqlQueryMap['getReportById'],[report_id],function(err,result){
    if(err){
        deferred.reject(err);
    }else{
        deferred.resolve(result[0]);
    }
  });
  return deferred.promise;
};

var getOutReportById = function(report_id){
  var deferred = q.defer();
  executeQuery.queryForAll(sqlQueryMap['getOutReportById'],[report_id],function(err,result){
    if(err){
        deferred.reject(err);
    }else{
        deferred.resolve(result[0]);
    }
  });
  return deferred.promise;
};


var revertReportStatus = function(data){
  try{
  var deferred = q.defer();
  console.log([data.report_status,data.report_id,data.report_flag,data.report_year,data.report_month,data.user_id]);
  executeQuery.update(sqlQueryMap[data.report_id+'-reverse-report'],[data.report_status,data.report_id,data.report_flag,data.report_year,data.report_month,data.user_id],function(err,result){
    if(err){
      console.log(err);
      deferred.reject(err);
    }else{
      console.log('in the result');
      console.log(result);
      deferred.resolve(result);
    }
  });
  return deferred.promise;
}catch(err){
  console.log(err);
  deferred.reject(err);
  return deferred.promise;
}
};

var getNotUploadedDistricts = function(data){
  try{
  var deferred = q.defer();
  console.log(data);
  executeQuery.queryForAll(sqlQueryMap['getNotUploadedDistricts'],[data.report,data.year,data.month,9],function(err,result){
    if(err){
      console.log(err);
      deferred.reject(err);
    }else{
      deferred.resolve(result);
    }
  });

  return deferred.promise;
}catch(err){
  console.log(err);
}
};

var checkReportUploadStatus = function(data){
  var deferred = q.defer();
  executeQuery.queryForAll(sqlQueryMap['reportUploadStatus'],[data.id,data.district_id,data.year,data.month],function(err,result){
    if(err){
      deferred.reject(err);
    }else{
      console.log(result);
      if(result.length){
        deferred.reject('Uploaded');
      }else{
        deferred.resolve(true);
      }
    }
  });
  return deferred.promise;
};


var reportUploadedStatusDistrict = function(data){
  var deferred = q.defer();

  executeQuery.queryForAll(sqlQueryMap['reportUploadedStatusDistrict'],[data.period,data.month,data.year],function(err,result){
    if(err){
      deferred.reject(err);
    }else{
      deferred.resolve({districtList:result});
    }
  });

  return deferred.promise;
};

var getDistrictReportList = function(data){
  'use strict';
  var deferred = q.defer();
    if(data.status ==9){
      executeQuery.queryForAll(sqlQueryMap['getDistrictUploadedReportList'],[data.month,data.year,9,data.district_id],function(err,result){
        if(err){
          console.log(err);
          deferred.reject(err);
        }else{
          deferred.resolve(result);
        }
      });
    }else{
      executeQuery.queryForAll(sqlQueryMap['getDistrictNotUploadedReportList'],[data.period,data.month,data.year,9,data.district_id],function(err,result){
        if(err){
          console.log(err);
          deferred.reject(err);
        }else{
          deferred.resolve(result);
        }
      });
    }
    return deferred.promise;
};

var reportsByWeek = function(data){
  'use strict';
  var deferred = q.defer();

  if (data['week[]']) {
    var week = data['week[]'];
  } else {
    var week = [data.week];
  }
  console.log('In reports by week');

  executeQuery.queryForAll(sqlQueryMap['getReportsByWeek'], [data.week,data.month, data.year,data.districtid], function(err, result) {
    if (err) {
      console.log(err);
      deferred.reject(err);
    } else {
      console.log(result);
      deferred.resolve({
        reportsByMonth: result
      });
    }
  });
  return deferred.promise;
}

var getReportsByWeeklyForState=function(data){
    'use strict';
    var deferred = q.defer();
    if (data['week[]']) {
    var week = data['week[]'];
  } else {
    var week = data.week;
  }
  data.week = week;
  console.log('In the week progress');
  executeQuery.queryForAll(sqlQueryMap['getReportsByWeekForState'], [data.week,data.month,data.year,data.week,data.month, data.year], function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({
        reportsByWeekly: result
      });
    }
  });
  return deferred.promise;
}

var getReportsByWeekForAllDistricts = function(data){
  'use strict';
  var deferred = q.defer();
  executeQuery.queryForAll(sqlQueryMap['getReportsByWeekForAllDistricts'],[data.week,data.month,data.year,data.report],function(err,result){
    if(err){
      deferred.reject(err);
    }else{
      console.log(result);
      deferred.resolve(result);
    } 
  })

  return deferred.promise;
}

/**
 * [getReportsByWeekNotUploadedForAllDistricts description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
var getReportsByWeekNotUploadedForAllDistricts = function(data){
  var deferred = q.defer();
  executeQuery.queryForAll(sqlQueryMap['getReportsByWeekNotUploadedForAllDistricts'],[data.week,data.month,data.year,data.report,9],function(err,result){
    if(err){
      deferred.reject(err);
    }else{
      console.log(result);
      deferred.resolve(result);
    } 
  })

  return deferred.promise;
};

var endDateOfReports = function(data){
  var deferred = q.defer();
  executeQuery.queryForAll(sqlQueryMap['getFinalDateOfDataUpdate'],function(err,result){
    if(err){
      deferred.reject(err);
    }else{
      deferred.resolve({
        endDateOfReports: result
      });
    } 
  })

  return deferred.promise;
}

module.exports = {
  uploadXlsxData: uploadXlsxData,
  totalCrimesReported: totalCrimesReported,
  totalCrimesByMonthAndYear: totalCrimesByMonthAndYear,
  propertyCrimesByMonthAndYear: propertyCrimesByMonthAndYear,
  bodyOffencesCrimesByMonthAndYear: bodyOffencesCrimesByMonthAndYear,
  whiteCollarCrimeByMonthAndYear: whiteCollarCrimeByMonthAndYear,
  accidentsByMonthAndYear: accidentsByMonthAndYear,
  otherIpcByMonthAndYear: otherIpcByMonthAndYear,
  login:login,
  reportsByYear:reportsByYear,
  reportsByMonth:reportsByMonth,
  reportsByQuarter:reportsByQuarter,
  getReportsByMonthForState:getReportsByMonthForState,
  getReportsByYearlyForState:getReportsByYearlyForState,
  getReportsByQuarterlyForState:getReportsByQuarterlyForState,
  totalUnitsList:totalUnitsList,
  factionOffences:factionOffences,
  offenceAgainstWomen:offenceAgainstWomen,
  downloadDataReport:downloadDataReport,
  getReportFileStream :getReportFileStream,
  getReportsByMonthForAllDistricts:getReportsByMonthForAllDistricts,
  getReportsByQuarterForAllDistricts:getReportsByQuarterForAllDistricts,
  getReportsByYearForAllDistricts:getReportsByYearForAllDistricts,
  getScrbReportFileStream:getScrbReportFileStream,
  getReportsInfo:getReportsInfo,
  getReportById:getReportById,
  revertReportStatus:revertReportStatus,
  getSCRBQuarterlyReportStream:getSCRBQuarterlyReportStream,
  getNotUploadedDistricts:getNotUploadedDistricts,
  checkReportUploadStatus:checkReportUploadStatus,
  reportUploadedStatusDistrict:reportUploadedStatusDistrict,
  getDistrictReportList:getDistrictReportList,
  getOutReportsInfo:getOutReportsInfo,
  getOutReportById:getOutReportById,
  reportsByWeek:reportsByWeek,
  getReportsByWeeklyForState:getReportsByWeeklyForState,
  getReportsByWeekForAllDistricts:getReportsByWeekForAllDistricts,
  getReportsByWeekNotUploadedForAllDistricts:getReportsByWeekNotUploadedForAllDistricts,
  endDateOfReports:endDateOfReports
};
