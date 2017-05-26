var _ = require('underscore');
var fs = require('fs');

function readXlsx () {
	'use strict';

	var configs;
	var tableData = {};
	var errors = [];


	var getStates = function(reportType){
		'use strict';

		configs = fs.readFileSync(process.cwd()+'/utility/readxlsx/config.json');
		configs = JSON.parse(configs);
		let reportTypeSheets = Object.keys(configs[reportType]);
		return reportTypeSheets;
	};

	var compareHeaders = function(sheetHeaders,configHeaders,sheet){
		'use strict';

		let flag = true;
			for(let i=0;i<sheetHeaders.length;i++){
				if(!sheetHeaders[i])
					sheetHeaders[i] ="";
				if(sheetHeaders[i] == configHeaders[i]){
					flag = true;
				}else{
					flag = false;
					throw 'Invalid header name :'+sheetHeaders[i]+' in '+sheet;
					break;
				}
			}
		return flag;
	};



	/**************** Removing heading rows  *********************/
	var getSheetData = function(data,ele,reportType){
		'use strict';
		let sheetData = _.find(data,function(sheet){
		  			return sheet.name==ele;
		  			});
		let header;

		if(!sheetData){
				throw 'No sheet find with name:'+ele;
		}

		if(configs[reportType][ele].header){
			header =	compareHeaders(sheetData.data[configs[reportType][ele].data_row-1],configs[reportType][ele].header,ele);

			if(!header){
				throw 'Headers mismatched in '+ele;
			}
		}

		if(sheetData && sheetData.data){
				if(configs[reportType][ele].number_of_rows){
				sheetData.data.splice(configs[reportType][ele].number_of_rows,sheetData.data.length-1);
			}
			sheetData.data.splice(0,configs[reportType][ele].data_row);

			return sheetData.data;
		}

	};

	/************** Parsing json ************************************/
	var parseToJson = function(sheetData,sheetName,reportType){
		'use strict';
		let jsonSheetData = []
			, sheetJson
			, dataMap = configs[reportType][sheetName]['fields_map']
			, dataTypes = configs[reportType][sheetName]['dataTypes']
			, dataRowStart = configs[reportType][sheetName]['data_row']
			, pattern = /[']/g
			, temp
			, type
			, errorCount = 0;
		dataRowStart +=1 ;
		for(let i=0;i<sheetData.length;i++){
			sheetJson = {};
			for(let j in dataMap){
				temp = (typeof sheetData[i][j] !='undefined') ? sheetData[i][j]:null;

				if(temp && typeof temp  == 'string'){
					temp = temp.replace(pattern,"\\'");
				}

				if(typeof temp != dataTypes[j]){
					if(dataTypes[j] == 'string'){
						type = 'text';
					}else{
						type = 'number';
					}
					errorCount += 1;
					errors.push(' Entered value  has to be  '+type+'  in sheet: '+sheetName+' . Row no '+(dataRowStart+i)+'. and column no '+(parseInt(j)+1))+' .Expected '+type+' values only.';
				}

				sheetJson[dataMap[j]] = temp;
			//	console.log(sheetJson[dataMap[j]]);

			}
			jsonSheetData.push(sheetJson);
		}

		return jsonSheetData;

	};
	/**************** convert to json ********************/
	this.convertToJson = function(reportType,data){
		'use strict';
		var reportSheets
		, configSheedata
		, sheetData;
//Gets number of states to read
		tableData = {};
		errors = [];
		reportSheets = getStates(reportType);
		_.forEach(reportSheets,function(ele,index){
		  	configSheedata = configs[reportType][ele];
		  	sheetData = getSheetData(data,ele,reportType);
		  	sheetData = parseToJson(sheetData,ele,reportType);
	  	tableData[ele] = sheetData;
		});
		if(errors.length){
				return {errors:errors};
		}else{
				return tableData;
		}
	};


	return this;
}


module.exports = readXlsx;
