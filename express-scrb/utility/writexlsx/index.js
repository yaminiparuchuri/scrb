var xlsxPopulate = require('xlsx-populate');
var fs = require('fs');
var etree = require('elementtree');
var subelement = etree.SubElement;
var writeUtil = require('./writeUtils');
//var Cell = require('Cell');



/*** Adding array next and previous elements ******/

Array.prototype.next = function() {
    return this[++this.current];
};

Array.prototype.prev = function() {
    return this[--this.current];
};

Array.prototype.current = 0;

function writeXlsxFile(data,report,type,callback){
	'use strict';
try {
	var config = fs.readFileSync('./utility/writexlsx/write-config.json','utf-8');
		config = JSON.parse(config);
		config = config[report];

	var formulasRowsColumns ;
  var fileName = process.cwd()+'/downloadReports/'+report;
 if(type){
   fileName += '-'+type;
 }
 fileName += '.xlsx';
 var workBook = xlsxPopulate.fromFileSync(fileName);
 var startTime = Date.now();
 var noOfSheets = Object.keys(config).length;
 var sheets = 0;

  var writeCell = function(sheet,row,dataRowStart,column,value,callback){
    setTimeout(function(){
      sheet.getCell(row+parseInt(dataRowStart),parseInt(column)).setValue(value);
      callback();
    },0);
  };

  var getSheetData = function(sheet){
    return sheet._sheetXML.find("sheetData");
  };

  var getSheetRow = function(sheetData,row){
    try{
    let rowNode =  sheetData.find("row[@r='" + row + "']");
    if(!rowNode){
      rowNode = subelement(sheetData, "row");
      rowNode.attrib.r = row;
    }
    rowNode.getCell = function(column){

      let address = writeUtil.rowAndColumnToAddress(parseInt(this.attrib.r),parseInt(column));
      let cellNode = rowNode.find("c[@r='" + address + "']");
      let cell = {};

      if(!cellNode){

        cellNode = subelement(this, "c");
        cellNode.attrib.r = address;
      }

      cell._cellNode = cellNode;
      cell.clearValue = function(cellNode){
        cellNode.getchildren().forEach(function (childNode) {
            cellNode.remove(childNode);
        });
        delete cellNode.attrib.t;
      };

      cell.setValue = function(value){
        this.clearValue(this._cellNode);

        if (typeof value === "string") {
            this._cellNode.attrib.t = "inlineStr";
            var isNode = subelement(this._cellNode, "is");
            var tNode = subelement(isNode, "t");
            tNode.text = value;
        } else {
            var vNode = subelement(this._cellNode, "v");
            vNode.text = value.toString();
        }
          return this;
      }
      return cell;
    }

    return rowNode;
  }catch(err){
    console.log(err);
  }
  };



  var  writeEachSeet = function(sheet,callback){
    let sheetConfig = config[sheet];
    let dataColumns = sheetConfig.dataColumns;
    let dataRowEnd = sheetConfig.dataRowEnd;
    let dataRowStart = sheetConfig.dataRowStart;
    let formulasRowsColumns = sheetConfig.dataFormulas;
    let nextRow;
    let xlSheet;
    let sheetData;
    let cellCount = 600*(Object.keys(dataColumns).length);
    let writeCellCount = 0;
    let xlSheetData ;
    let xlSheetRow;

    setTimeout(function(){

      if(data[sheet]){
        sheetData = data[sheet];
        nextRow = sheetData[0];
        xlSheet = workBook.getSheet(sheet);
        xlSheetData = getSheetData(xlSheet);
        if(!sheetConfig.dataRowEnd){
          sheetConfig.dataRowEnd =  dataRowStart+sheetData.length-1;
        }

        for(var i=0;i<= (sheetConfig.dataRowEnd-dataRowStart);i++){

          if(sheetConfig.skipRows.indexOf(i+dataRowStart) == -1){
          //  console.log(i+dataRowStart);
            xlSheetRow = getSheetRow(xlSheetData,i+dataRowStart);
            for(var key in dataColumns){

               if(formulasRowsColumns[i+parseInt(sheetConfig.dataRowStart)] && formulasRowsColumns[i+parseInt(sheetConfig.dataRowStart)].indexOf(parseInt(key)) > -1){
                  //Nothing to do
               }else if(data[sheet] && nextRow &&  typeof nextRow[dataColumns[key]] != 'undefined' && nextRow[dataColumns[key]] != null ){
              //  console.log('before cell:'+Date.now());

                //  console.log(nextRow[dataColumns[key]]);
                  xlSheetRow.getCell(parseInt(key)).setValue(nextRow[dataColumns[key]]);
          /*      writeCell(xlSheet,i,dataRowStart,key,nextRow[dataColumns[key]],function(){
                  writeCellCount += 1;

                  if(cellCount == writeCellCount){
                    console.log('End of the for loop');
                    callback(null,true);
                  }
                }); */

          //      console.log()
              //  console.log('after cell:'+Date.now());
               }else{
                //Nothing to do
               }
            }
            nextRow = sheetData.next();
          }else{
            //Todo
          }
        }
        callback(null,true);
      }else{
        callback(null,true);
      }
    },1);
  };

			for(var sheet in config){
        writeEachSeet(sheet,function(err,done){
          if(err){
            callback(err,null);
          }else{
            sheets += 1;
            if(sheets == noOfSheets){              
              console.log("Total time:"+(Date.now()-startTime));
              console.log(workBook.output());
              callback(null,workBook.output());
            }
          }
        });
			}

	 console.log('in work out');
	 //return  workBook.output();
 }catch (err) {
 	console.log('in error');
 	console.log(err);
  callback(err,null);
 }
}

var getReadQueries = function (reportNumber) {
	'use strict';
	try {
	var reportConfig
		, queries={};

	reportConfig = JSON.parse(fs.readFileSync('./utility/writexlsx/write-config.json','utf-8'))[reportNumber];
	for(var key in reportConfig){
		if(sqlQueryMap[key+'-read']){
			queries[key] = {
				query: sqlQueryMap[key+'-read']
			}
		}
	}
	return queries;
	}catch (err) {
		console.log(err);
	}
};


//writexlsx();

module.exports ={
	writeXlsxFile:writeXlsxFile,
	getReadQueries:getReadQueries
};
