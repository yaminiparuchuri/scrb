var saveUploadxlsx = require('../utility/backgroundJobs/saveUploadxlsx');
var reportService = require('./report');
var fs = require('fs');


/**
 * Uploading weekly report
 * @param  {[type]} data            [description]
 * @param  {[type]} fileInformation [description]
 * @return {[type]}                 [description]
 */
var uploadWeeklyReport = function(data, fileInformation) {
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
    console.log('Before report types');
   _.forEach(reportTypes,function(reportType,index){
    queries =[];
    let insertQuery = weeklyQueryMaps[reportType];
      console.log('Insert query:',index);
      if(insertQuery){
          insertQuery = insertQuery.split('VALUES');
          insertedRecords[reportType] = reportData[reportType].length;
          _.forEach(reportData[reportType],function(sampleRecord,index){
            sampleRecord.report_year = data.year;
            sampleRecord.report_month = data.month;
            sampleRecord.created_user_id = data.user_id;
            sampleRecord.report_week = data.week;
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
          console.log('After count');
            if(err){
              console.log('Error in weekly report');
              console.log(err);
            }else{
              insertedRecords.totalRecordsInserted += result.affectedRows;
            }            
            if(count == validReportsCount){
              deferred.resolve(insertedRecords);
              data.fileInformation = fileInformation;
              data.uploadStatus =9;
              saveUploadxlsx.saveWeeklyXlsxFile(data);
              deferred.resolve({
                success:true,
                message:'Successfully uploaded the report'
              });
            }

          });

      }else{
        //console.log(reportType);
      }

   });


    //  queries.splice(27,3);

    //deferred.resolve(reportData);
  } catch (err) {
    console.log('Errro in weekly report upload');
    console.log("Error:",err);
    console.log(err);
    data.fileInformation = fileInformation;
    data.uploadStatus =0;
    saveUploadxlsx.savexlsxFile(data);              
    deferred.reject(err);
  }
  return deferred.promise;
};

/**
 * To upload weekly data and to update monthly data
 * @param  {[object]} data            [description]
 * @param  {[object]} fileInformation [description]
 * @return {[promise]}                 [description]
 */
var uploadWeeklyDataAndMonth = function(data,fileInformation){
  var deferred = q.defer();
	try{
    var readData = fs.readFileSync(fileInformation.path);
        readData = nodeXlsx.parse(readData);
    var reportData = readXlsx.convertToJson(data.id, readData);

    if(reportData.errors){
        deferred.reject({validationErrors:reportData.errors});
        return deferred.promise;
    }

    q.allSettled([
      uploadWeeklyReport(data,fileInformation),
      reportService.uploadXlsxData(data,fileInformation)])
        .then(function(result){
          console.log(result);
          deferred.resolve(result);
        });		
  }catch(err){
  	console.log('err:',err);  	
    deferred.reject(err);
    return deferred.promise;
  }

  return deferred.promise;
};

/**
 * This is function to delete monthly mcr data while uploading weekly data
 * @param  {object} data  [description]
 * @return {promise}      [description]
 */
var deleteMonthlyMcrReports = function(data){
  var deferred = q.defer();
  executeQuery.queryForAll(weeklyQueryMaps['deleteMonthlyMcrData'],[data.month,data.year,data.id,data.district_id],function(err,result){
    if(err){
      console.log(err);
      deferred.reject(err);
    }else{
      console.log(result);
      deferred.resolve(result);
    }
  });
  return deferred.promise;
};



exports.uploadWeeklyDataAndMonth = uploadWeeklyDataAndMonth;
exports.deleteMonthlyMcrReports = deleteMonthlyMcrReports;




