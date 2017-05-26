/***
* Saves uploaded xlsx files in folder structure
***/

var mkdirp = require('mkdirp');


var months = {
	1:"JAN",
	2:"FEB",
	3:"MAR",
	4:"APR",
	5:"MAY",
	6:"JUN",
	7:"JUL",
	8:"AUG",
	9:"SEP",
	10:"OCT",
	11:"NOV",
	12:"DEC",
	"quarter1":"Q1",
	"quarter2":"Q2",
	"quarter3":"Q3",
	"quarter4":"Q4",
	"Annual":"Annual"
};

var weeks = {
	1:"week1",
	2:"week2",
	3:"week3",
	4:"week4"
};


var checkAndCreatePath = function(path,callback){
	'use strict';
	console.log(path);
	mkdirp(path,function(err){

		if(err){
			console.log(err);
		}else{
			callback();
		}

	});
};

/**
 * This method is using to store a backup a path for year dynamically
 * Path will be pwd/../uploadedReports/report_number/year/month/district_id
 * @param  {[int]} year        [description]
 * @param  {[int]} month       [description]
 * @param  {[int]} report      [description]
 * @param  {[int]} district_id [description]
 * @return {[string]} path      File path of the report 
 */
var getPath = function(year,month,report,district_id){

	var path = process.cwd()+'/../uploadedReports/'+report+'/'+year;
	if(month){
		path += '/'+month;
	}
	path += '/'+district_id;
	return path;
};


var updateReportStatus = function(data){
	'use strict';
	var query = sqlQueryMap['reportUploadedStatusInsert'];

	if(!data.week){
		data.week = null;
	}
	console.log('Upload status:',data.uploadStatus);
	executeQuery.queryForAll(query,[data.id,data.district_id,data.user_id,data.user_id,data.month,data.year,data.filePath,data.week,data.uploadStatus],function(err,result){
		if(err){
			console.log(err);
		}else{
			console.log('Xlsx file backup saved successfully');
			console.log(result);
		}
	});
};

/**
 * Saves monthly data only
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
var savexlsxFile = function(data){
	'use strict';

	var directoryPath = getPath(data.year,data.month,data.id,data.district_id);
	var fileName = data.id+'_'+data.year+'_'+months[data.month]+'_'+data.district_name+'_'+data.name+'.xlsx';
	var filePath = directoryPath+'/'+fileName;
		data.filePath = filePath;
		checkAndCreatePath(directoryPath,function(){
			fs.writeFile(filePath,fs.readFileSync(data.fileInformation.path),function(err){
				if(err){
					console.log(err);
				}else{
					updateReportStatus(data);
				}
			});
		});
};

var getWeeklyPath = function(year,month,week,report,district_id){

	var path = process.cwd()+'/../uploadedReports/'+report+'/'+year;
	if(month){
		path += '/'+month;
	}
	if(week){
		path += '/'+weeks[week];
	}
	path += '/'+district_id;
	return path;
}

/**
 * Saves weekly backup files
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */

var saveWeeklyXlsxFile = function(data){
		var directoryPath = getWeeklyPath(data.year,data.month,data.week,data.id,data.district_id);
		var fileName = data.id+'_'+data.year+'_'+months[data.month]+'_'+weeks[data.week]+'_'+data.district_name+'_'+data.name+'.xlsx';
		var filePath = directoryPath+'/'+fileName;
		data.filePath = filePath;
		console.log('Data in saving weekly xlsx file:',data);
		checkAndCreatePath(directoryPath,function(){
			console.log('File path:',filePath);
			fs.writeFile(filePath,fs.readFileSync(data.fileInformation.path),function(err){
				if(err){
					console.log(err);
				}else{					
					updateReportStatus(data);
				}
			});
		});
};








module.exports = {
	savexlsxFile :savexlsxFile,
	saveWeeklyXlsxFile:saveWeeklyXlsxFile
};
