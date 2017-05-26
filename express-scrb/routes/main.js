var express = require('express');
var router = express.Router();



/*** Getting months and years based on current date *********/

var getYears = function (selectedYear) {
	'use strict';

	var currDate = moment();
	var startYear = 2015;
	var currYear = currDate.format('YYYY');
	var years = [];
	var year = {};

	while(startYear <= currYear){
		year.year = startYear;
		console.log(startYear == selectedYear);
		if(startYear == selectedYear){
			year.selected = 'selected';
		}

		years.push(year);
		year = {};
		startYear +=1;
	}

	return years;
};

var getMonths = function () {
	'use strict';
	var currDate = moment();

};

/* GET home page. */
router.get('/scrb', function(req, res, next) {
  var object={};
  var inputData={};
  var currDate = moment();
        currDate = currDate.subtract(1,'months').endOf('month');

          res.redirect('/data/scrb'+'/'+currDate.format('YYYY')+'/'+currDate.format('M')+'/report');
});


router.get('/scrb/quarterly/reports',function(req,res,next){
	try{
	var currentDate = moment();
	var year;
	var quarter;
	currentDate = currentDate.subtract(1,'quarters').endOf('quarter');
	year = currentDate.format('YYYY');
	quarter = 'quarter'+currentDate.quarter();
	res.redirect('/data/scrb/quarterly/reports/'+year+'/'+quarter);
}catch(err){
	console.log(err);
	res.statusCode = 500;
	res.send(err);
}
});

router.get('/scrb/quarterly/reports/:year/:quarter',function(req,res){
	var object = {};
	var inputData = {};
	object.layout = 'scrb';
	object.quarter = req.params.quarter;
	object.years = getYears(req.params.year);
	object.user = req.session.user;
	object.year = req.params.year;
	reportService.getOutReportsInfo({period:'quarterly'})
		.then(function(result){
			object.reports = result;
			res.render('pages/quarterlyReports',object);
		})
		.fail(function(err){
			console.log(err);
			res.statusCode = 500;
			res.render('/',object);
		})
});

router.get('/scrb/yearly/reports',function(req,res){
	var currentDate = moment();
	var year = currentDate.subtract(1,'years').format('YYYY');
	res.redirect('/data/scrb/yearly/reports/'+year);
});


router.get('/scrb/yearly/reports/:year',function(req,res){
	var year = req.params.year;
	var object = {
		year:year,
		layout:'scrb',
		years:getYears(2015)
	}

	reportService.getOutReportsInfo({period:'Annual'})
		.then(function(result){
			object.reports = result;
			console.log(result);
			res.render('pages/yearlyReports',object);
		})
		.fail(function(err){
			console.log(err);
			res.statusCode = 500;
			res.send({
				message:'INTERNAL SERVER ERROR'
			});
		})
})

router.get('/scrb/monthly/reports',function(req,res,next){
try{
		var currentDate = moment();
		var year;
		var month;
		currentDate = currentDate.subtract(1,'months').endOf('month');
		year = currentDate.format('YYYY');
		month = currentDate.format('M');
		res.redirect('/data/scrb/monthly/reports/'+year+'/'+month);
}catch(err){
	console.log(err);
}
});

router.get('/scrb/monthly/reports/:year/:month',function(req,res){
		var object = {};
		var inputData = {};
		object.layout = 'scrb';
		object.month = req.params.month;
		object.years = getYears(req.params.year);
		object.user = req.session.user;
		object.year = req.params.year;
		reportService.getOutReportsInfo({period:'monthly'})
			.then(function(result){
				object.reports = result;
				console.log('before render');
				res.render('pages/monthlyReports',object);
			})
			.fail(function(err){
				console.log(err);
				res.statusCode = 500;
				res.render('/',object);
			})
});

router.get('/scrb/yearly', function(req, res, next) {
  var currentDate = moment();
		currentDate = currentDate.subtract(1,'years').endOf('year');
		res.redirect('/data/scrb/yearly/'+currentDate.year()+'/report');
});

router.get('/scrb/yearly/:year/:view',function(req,res){
	var object = {};
	var inputData = {};
	var year = req.params.year;
	inputData.year = year;
	object.year = year;
	object.years = getYears(year);
	object.layout='scrb';
	object.view = req.params.view;
	object.user=req.session.user;
	object.month='annual';

	if(req.params.view == 'report'){
		reportService.getReportsByYearlyForState(inputData).then(function(result){
			res.statusCode = 200;
			object.reports=result.reportsByYear;
			res.render('pages/stateyearly', object);
		})
		.fail(function(err){
			console.log(err);
			res.statusCode = 500;
			res.render('/', object);
		});
	}else{
		inputData.period="annual";
		inputData.month="annual";
		reportService.reportUploadedStatusDistrict(inputData).then(function(result){
			object.districtList = result.districtList;
			res.statusCode = 200;
			res.render('pages/stateyearlyDistrict',object)
		})
		.fail(function(err){
			console.log(err);
			res.statusCode = 500;
			object.message = err;
			res.render('/',object)
		});
}
})



router.get('/scrb/:year/:month/:view',function(req,res,next){
  var object={};
  var inputData={};
	try{
  inputData.month=req.params.month;
  inputData.year=req.params.year;
	inputData.period = "monthly";
  object.layout="scrb";
	object.user=req.session.user;
	object.years = getYears(inputData.year);
	object.month = inputData.month;
	object.view = req.params.view;
	object.helpers = {
		selectOrNot:function (option,value) {
				if(option === value){
					return 'selected';
				}
		}
	};
	/*******     Report view  ********/
  if(req.params.view == 'report'){
	  reportService.getReportsByMonthForState(inputData).then(function(result){
	    res.statusCode = 200;
	    object.reports=result.reportsByMonth;
	    res.render('pages/state', object);
	  })
	  .fail(function(err){
	    res.statusCode = 500;
	    res.render('/', object);
	  });
	}else{
		/********   District view **************/
		console.log(req.params.view);
		reportService.reportUploadedStatusDistrict(inputData)
			.then(function(result){
				console.log('in the result');
				res.statusCode = 200;
				object.districtList = result.districtList;
				res.render('pages/stateDistricts',object);
			})
			.fail(function(err){
				console.log(err);
				res.statusCode = 500;
				res.send(err);
			});
	}
}catch(err){
	console.log(err);
}
})
router.get('/dcrb/yearly/:year',function(req,res){
	try{
	var inputData ={};
	var object = {};
	inputData.year = req.params.year;
	object.year = req.params.year;
	object.years = getYears(object.year);
	object.layout = 'dcrb';
	inputData.districtid = req.session.user.distrctid;
	reportService.reportsByYear(inputData).then(function(result){
    res.statusCode = 200;
    object.user=req.session.user;
    object.reports=result.reportsByYear;
		console.log(object);
    res.render('pages/districtyear', object);
  })
  .fail(function(err){
    console.log(err);
    console.error(err);
    res.statusCode = 500;
    res.render('/', object);
  });
}catch(err){
	console.log(err);
}
});

router.get('/dcrb/download', function(req, res, next) {
  var currDate = moment();
        currDate = currDate.subtract(1,'months').endOf('month');

          res.redirect('/data/dcrb/download'+'/'+currDate.format('YYYY')+'/'+currDate.format('M'));
});

router.get('/dcrb/download/weekly',function(req,res,next){
	var currDate = moment();
	var week = parseInt(moment().date()/7);
	var currDate = moment();
      currDate = currDate.endOf('month');	
	if(week === 0){
		currDate = currDate.subtract(1,'months').endOf('month');
		week = 4;
	}else{
		if(week === 4){
			week = 3;
		}
	}	

	res.redirect('/data/dcrb/download/weekly/'+currDate.format('YYYY')+'/'+currDate.format('M')+'/'+week);
});


router.get('/dcrb/download/quarterly', function(req, res, next) {
  var object={};
  var currentDate = moment();
		currentDate = currentDate.subtract(1,'quarters').endOf('quarter');
		object.year = currentDate.year();
		object.quarter = 'quarter'+currentDate.quarter();
		res.redirect('/data/dcrb/download/quarterly/'+object.year+'/'+object.quarter);
//  res.render('pages/districtdownloadquarter', object);
});

router.get('/dcrb/download/quarterly/:year/:quarter',function(req,res){
	var inputData = {};
	var object = {};
	object.layout = 'dcrb';
	object.year = req.params.year;
	object.quarter = req.params.quarter;
	object.years = getYears(object.year);
	inputData.year = object.year;
	inputData.quarter = object.quarter;
	inputData.districtid = req.session.user.distrctid;
	reportService.reportsByQuarter(inputData).then(function(result){
		res.statusCode = 200;
		object.user=req.session.user;
		object.reports=result.reportsByQuarter;
		res.render('pages/districtdownloadquarter', object);
	})
	.fail(function(err){
		console.log(err);
		console.error(err);
		res.statusCode = 500;
		res.render('/', object);
	});
});

router.get('/dcrb/download/yearly', function(req, res, next) {
  var object={};
  object.currentDate = moment();
	object.currentDate  = object.currentDate.subtract(1,'years').endOf('year');
	object.year = object.currentDate.year();
  res.redirect('/data/dcrb/download/yearly/'+object.year);
});

router.get('/dcrb/download/yearly/:year',function(req,res,next){
	var object = {};
	var inputData = {};
	object.layout = 'dcrb';
	object.year = req.params.year;
	object.years = getYears(object.year);
	inputData.year = object.year;
	inputData.districtid = req.session.user.distrctid;

	reportService.reportsByYear(inputData).then(function(result){
    res.statusCode = 200;
    object.user=req.session.user;
    object.reports=result.reportsByYear;
		res.render('pages/districtdownloadyear', object);
  })
  .fail(function(err){
    res.statusCode = 500;
    res.render('/', object);
  });

});

router.get('/dcrb/download/weekly/:year/:month/:week',function(req,res){
	var object={};
  var inputData={};
  inputData.month=req.params.month;
  inputData.year=req.params.year;
  inputData.week = req.params.week;  
  inputData.districtid = req.session.user.distrctid;

  object.years = getYears(inputData.year);
  object.month = inputData.month;
  object.week = inputData.week;
  object.year = inputData.year;

    object.helpers = {
      selectOrNot:function (option,value) {
          if(option === value){
            return 'selected';
          }
      }
    };
  object.layout="dcrb";
  reportService.reportsByWeek(inputData).then(function(result){
    res.statusCode = 200;
    object.user=req.session.user;
    object.reports=result.reportsByMonth;
    res.render('pages/districtdownloadweek', object);
  })
  .fail(function(err){
    console.error(err);
    res.statusCode = 500;
    res.render('/', object);
  });
});

router.get('/dcrb/download/:year/:month',function(req,res){
  var object={};
  var inputData={};
  inputData.month=req.params.month;
  inputData.year=req.params.year;
  inputData.districtid = req.session.user.distrctid;
  object.years = getYears(inputData.year);
  object.month = inputData.month;
    //object.year = inputData.year;
    object.helpers = {
      selectOrNot:function (option,value) {
          if(option === value){
            return 'selected';
          }
      }
    };
  object.layout="dcrb";
  reportService.reportsByMonth(inputData).then(function(result){
    res.statusCode = 200;
    object.user=req.session.user;
    object.reports=result.reportsByMonth;
    res.render('pages/districtdownload', object);
  })
  .fail(function(err){
    console.error(err);
    res.statusCode = 500;
    res.render('/', object);
  });
});

router.get('/dcrb/weekly/:year/:month/:week',function(req,res){
	 var object={};
  var inputData={};
  if(req.params.year){
  	inputData.year = req.params.year;
  }else{
  	inputData.year = 2015;
  }

  if(req.params.month){
  	inputData.month = req.params.month;
  }else{
  	inputData.month = 1;
  }

  if(req.params.week){
  	inputData.week = req.params.week;
  }else{
  	inputData.week = 1;
  }
   
   inputData.districtid = req.session.user.distrctid;

  	object.layout="dcrb";
  	reportService.reportsByWeek(inputData).then(function(result){
    res.statusCode = 200;

    object.user=req.session.user;
    object.reports=result.reportsByMonth;
    object.years = getYears(inputData.year);
    object.month = inputData.month;
    object.week = inputData.week;
    object.year = inputData.year;
    object.helpers = {
    	selectOrNot:function (option,value) {
    			if(option === value){
    				return 'selected';
    			}
    	}
    };


    console.log('month:',inputData.month);
    console.log('in render pages district');
    res.render('pages/districtweekly', object);
});

});

router.get('/dcrb/:year/:month', function(req, res, next) {
  var object={};
  var inputData={};
  if(req.params.year){
  	inputData.year = req.params.year;
  }else{
  	inputData.year = 2015;
  }

  if(req.params.month){
  	inputData.month = req.params.month;
  }else{
  	inputData.month = 1;
  }
   
   inputData.districtid = req.session.user.distrctid;

  object.layout="dcrb";
  reportService.reportsByMonth(inputData).then(function(result){
    res.statusCode = 200;

    object.user=req.session.user;
    object.reports=result.reportsByMonth;
    object.years = getYears(inputData.year);
    object.month = inputData.month;
    //object.year = inputData.year;
    console.log(object.years);
    object.helpers = {
    	selectOrNot:function (option,value) {
    			if(option === value){
    				return 'selected';
    			}
    	}
    };

    console.log('in render pages district');
    res.render('pages/district', object);
  })
  .fail(function(err){
    console.log(err);
    console.error(err);
    res.statusCode = 500;
    res.render('/', object);
  });
});

router.get('/dcrb/report/download/:report/:year/:month/:districtid',function (req,res) {
	var year = req.params.year;
	var month = req.params.month;

	var districtid =  1;
	data = {
		year:req.params.year,
		month:req.params.month,
		districtid:req.params.districtid,
		report:req.params.report
	};

	reportService.getReportFileStream(data,function (err,stream) {
		try {
		if(err){
			res.statusCode = 500;
			res.send({
				result:false,
				error:'Internal Server Error'
			});
		}else{
			res.attachment('report1.xlsx');
			res.send(stream);
			//res.statusCode = 200;
			//res.send(stream);
		}
	}catch (err) {
		console.log('in the catch');
		console.log(err);
		res.send(err);
	}
	});

});

router.get('/scrb/quarter/report/download/:report/:year/:quarter',function(req,res){
	var data = {
		current_quarter:req.params.quarter,
		current_year:req.params.year,
		report:req.params.report
	};

	data.report = data.report+'-SCRB';
	console.log(data);
	reportService.getSCRBQuarterlyReportStream(data,function(err,stream){
		if(err){
			console.log(err);
			res.statusCode = 500;
			res.send(err);
		}else{
			reportService.getOutReportById(req.params.report)
				.then(function(result){
						console.log('In report result',result);
						res.statusCode = 200;

						res.cookie('fileDownload',true);
						res.setHeader('Content-type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
						res.attachment(req.params.report+'.'+result.report_name+'_'+req.params.year+'_'+req.params.quarter+'.xlsx');
						res.send(stream);
				})
				.fail(function(error){
					console.log(error);
					res.statusCode = 500;
					res.send(err);
				})
		}
	});



})

router.get('/scrb/report/download/:report/:year/:month/:districtid',function(req,res){
	var year = req.params.year;
	var month = req.params.month;

	var districtid =  1;
	data = {
		year:req.params.year,
		month:req.params.month,
		districtid:req.params.districtid,
		report:req.params.report
	};
	data.report = data.report+'-SCRB';
	reportService.getScrbReportFileStream(data,function (err,stream) {
		try {
		if(err){
			res.statusCode = 500;
			res.send({
				result:false,
				error:'Internal Server Error'
			});
		}else{
			reportService.getOutReportById(req.params.report)
				.then(function(result){
						res.statusCode = 200;

						res.cookie('fileDownload',true);
						res.setHeader('Content-type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
						res.attachment(req.params.report+'.'+result.report_name+'_'+req.params.year+'_'+req.params.month+'.xlsx');
						res.send(stream);
				})
				.fail(function(error){
					res.statusCode = 500;
					res.send(err);
				})
			//res.attachment('report1.xlsx');
			//res.send(stream);
			//res.statusCode = 200;
			//res.send(stream);
		}
	}catch (err) {
		console.log('in the catch');
		console.log(err);
		res.send(err);
	}
	});
});

router.get('/dcrb', function(req, res, next) {
  var object={};
  var inputData={};
  var currDate = moment();
        currDate = currDate.subtract(1,'months').endOf('month');

          res.redirect('/data/dcrb'+'/'+currDate.format('YYYY')+'/'+currDate.format('M'));
});



router.get('/dcrb/quarterly', function(req, res, next) {
	try{
  var object={};
	var currentDate = moment();
	currentDate = currentDate.subtract(1,'quarters').endOf('quarter');
	object.quarter = "quarter"+currentDate.quarter();
	object.year = currentDate.year();
	res.redirect('/data/dcrb/quarterly/'+object.year+'/'+object.quarter);

}catch(err){
	console.log(err);
}
});

router.get('/dcrb/weekly',function(req,res,next){
	try{
  var object={};
	 var currDate = moment();
       	 currDate = currDate.endOf('month');	
	object.week   = parseInt(moment().date()/7);
	if(object.week === 0){
		currDate = currDate.subtract(1,'months').endOf('month');
		object.week = 4;
		object.month = currDate.format('M');
		object.year =  currDate.format('YYYY');
	}else{
		object.month  = currDate.format('M');
		object.year   = currDate.format('YYYY');
		if(object.week === 4){
			object.week = 3;
		}
	}	
	res.redirect('/data/dcrb/weekly/'+object.year+'/'+object.month+'/'+object.week);

}catch(err){
	res.statusCode = 500;
	res.redirect('500');
}
});

router.get('/dcrb/quarterly/:year/:quarter',function(req,res){
	var inputData = {};
	var object = {};
	object.layout = 'dcrb';
	object.year = req.params.year;
	object.quarter = req.params.quarter;
	object.years = getYears(object.year);
	inputData.year = object.year;
	inputData.quarter = object.quarter;
	inputData.districtid = req.session.user.distrctid;

	reportService.reportsByQuarter(inputData).then(function(result){
    res.statusCode = 200;
    //console.log(req.session.user);
    object.user=req.session.user;
    object.reports=result.reportsByQuarter;

    res.render('pages/districtquarterly', object);
  })
  .fail(function(err){
    console.log(err);
    console.error(err);
    res.statusCode = 500;
    res.render('/', object);
  });
})
//SCRB weekly reports
router.get('/scrb/weekly', function(req, res, next) {
  var object={};
  var inputData={};
  
   var currDate = moment();
       	 currDate = currDate.endOf('month');	
	object.week   = parseInt(moment().date()/7);
	if(object.week === 0){
		currDate = currDate.subtract(1,'months').endOf('month');
		object.week = 4;
		object.month = currDate.format('M');
		object.year =  currDate.format('YYYY');
	}else{
		object.month  = currDate.format('M');
		object.year   = currDate.format('YYYY');
		if(object.week === 4){
			object.week = 3;
		}
	}
  //object.layout = 'scrb';
  //res.render('pages/stateweekly', object);
	//currentDate = currentDate.subtract(1,'quarters').endOf('quarter');
	res.redirect('/data/scrb/weekly/'+object.week+'/'+object.month+'/'+object.year+'/report');

});

router.get('/scrb/weekly/:week/:month/:year/:view',function(req,res){
	try{
	var object = {};
	var inputData = {};
	object.year = req.params.year;
	object.week = req.params.week;
	object.month = req.params.month;
	object.years = getYears(object.year);
	object.layout = 'scrb';
	object.user=req.session.user;
	object.view = req.params.view
	inputData.year = req.params.year;
	inputData.month = req.params.month;
	inputData.week = req.params.week;
    
	if(req.params.view == 'report'){
		console.log('In report view');
	reportService.getReportsByWeeklyForState(inputData).then(function(result){
	    res.statusCode = 200;
	    object.reports=result.reportsByWeekly;	       
	    res.render('pages/stateweekly', object);
	  })
	  .fail(function(err){
	    res.statusCode = 500;
	    res.render('/', object);
	  });
}else{
	inputData.period = 'weekly';
	reportService.reportUploadedWeeklyStatusDistrict(inputData).then(function(result){
    res.statusCode = 200;
    object.districtList=result.districtList;
    res.render('pages/stateweeklydistricts', object);
  })
  .fail(function(err){
    res.statusCode = 500;
    res.render('/', object);
  });
}
}catch(err){
	  console.log(err);
		res.statusCode = 500;
		res.send(err);
}
});


router.get('/scrb/quarterly', function(req, res, next) {
  var object={};
  var inputData={};
  var currentDate = moment();
	currentDate = currentDate.subtract(1,'quarters').endOf('quarter');
	res.redirect('/data/scrb/quarterly/'+currentDate.year()+'/'+'quarter'+currentDate.quarter()+'/report');

});

router.get('/scrb/quarterly/:year/:quarter/:view',function(req,res){
	try{
	var object = {};
	var inputData = {};
	object.year = req.params.year;
	object.quarter = req.params.quarter;
	object.years = getYears(object.year);
	object.layout = 'scrb';
	object.user=req.session.user;
	object.view = req.params.view
	inputData.year = req.params.year;
	inputData.month = req.params.quarter;

	if(req.params.view == 'report'){
	reportService.getReportsByQuarterlyForState(inputData).then(function(result){
    res.statusCode = 200;
    object.reports=result.reportsByQuarter;
    console.log(object);
    res.render('pages/statequarterly', object);
  })
  .fail(function(err){
    res.statusCode = 500;
    res.render('/', object);
  });
}else{
	inputData.period = 'quarterly';
	reportService.reportUploadedStatusDistrict(inputData).then(function(result){
    res.statusCode = 200;
    object.districtList=result.districtList;
    console.log('////////////////////')
    console.log(object);
    res.render('pages/statequarterlyDistricts', object);
  })
  .fail(function(err){
    res.statusCode = 500;
    res.render('/', object);
  });
}
}catch(err){
	  console.log(err);
		res.statusCode = 500;
		res.send(err);
}
});

router.get('/dcrb/yearly', function(req, res, next) {
	try{
  var object={};
	var currentDate = moment();
	var inputData={};

  object.layout="dcrb";
	object.quarter = moment().quarter();
  currentDate = currentDate.subtract(1,'years').endOf('year');
	object.year = currentDate.year();
	console.log('in the dcrb/yearly');
	res.redirect('/data/dcrb/yearly/'+object.year);

}catch(err){
	console.log(err);
	res.statusCode = 500;
	res.render('/',err);
}
});




router.get('/download',function(req,res,next){
  try{

    var file = req.query.path;
  var path = require('path');
  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	console.log('Content-type',mimetype);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
}catch(err){
  console.log(err);
}
});

router.post('/scrb/dcrb/download',function(req,res){
	if(req.body.status == 9){
    reportService.getReportsByMonthForAllDistricts(req.body)
      .then(function(result){
        res.render('partials/reportList',{layout:false,reports:result},function(err,html){
					if(err){
						res.statusCode = 500;
						res.send(err);
					}else{
						res.send(html);
					}
        });
      })
      .fail(function(err){
        res.statusCode = 500;
				res.send('INTERNAL SERVER ERROR');
      });
		}else{
			reportService.getNotUploadedDistricts(req.body)
	      .then(function(result){
					console.log(result);
	        res.render('partials/districtList',{layout:false,reports:result},function(err,html){
						if(err){
							console.log(err);
							res.statusCode = 500;
							res.send(err);
						}else{
							res.send(html);
						}
	        });
	      })
	      .fail(function(err){
					console.log(err)
	        res.statusCode = 500;
					res.send('INTERNAL SERVER ERROR');
	      });
		}
});

router.post('/scrb/dcrb/quarter/download',function(req,res){
	try{
	reportService.getReportsByQuarterForAllDistricts(req.body)
		.then(function(result){
			console.log(result);
			res.render('partials/reportList',{layout:false,reports:result},function(err,html){
				if(err){
					console.log(err);
				}else{
						res.send(html);
				}

			});
		})
		.fail(function(err){
			console.log(err);
			res.statusCode = 500;
			res.send(err);
		});
	}catch(err){
		console.log(err);
		res.statusCode = 500;
		res.send(err);
	}
});

router.post('/scrb/dcrb/year/download',function(req,res){
	console.log(req.body);
	reportService.getReportsByYearForAllDistricts(req.body)
		.then(function(result){
			console.log(result);
			res.render('partials/reportList',{layout:false,reports:result},function(err,html){
				res.send(html);
			});
		})
		.fail(function(err){
			console.log(err);
		});
});

router.post('/scrb/dcrb/weekly/download',function(req,res){
	console.log('status:',req.body.status);
if(req.body.status == 9){
reportService.getReportsByWeekForAllDistricts(req.body)
	.then(function(result){
		res.render('partials/reportList',{layout:false,reports:result},function(err,html){
			res.send(html);
		});
	})
	.fail(function(err){
		res.status = 500;
		res.send({});
	});
}else{
	console.log('In the else part');
	reportService.getReportsByWeekNotUploadedForAllDistricts(req.body)
	.then(function(result){
		res.render('partials/reportList',{layout:false,reports:result},function(err,html){
			res.send(html);
		});
	})
	.fail(function(err){
		console.log(err);
		res.status = 500;
		res.send({});
	});
}

});


router.post('/revert/monthly/report/status',function(req,res){


	var data = {
		report_month:req.body.month,
		report_year:req.body.year,
		report_id:req.body.report_id,
		report_flag:1,
		report_status:5,
		user_id:req.body.uploaded_user_id
	}


		reportService.revertReportStatus(data)
			.then(function(result){
				res.statusCode =  200;
				res.send({
					result:result
				});
			})
			.fail(function(err){
				console.log(err);
				res.sendStatus(500);
				res.send(err);
			});
});

router.post('/scrb/district/reports/list',function(req,res){
	var data = req.body;
	var renderFile
	var object = {layout:false};
	try{
	if(data.status == 9){
		renderFile = 'partials/uploadedReports';
	}else{
		renderFile = 'partials/notUploadedReports';
	}
	console.log(data);
	reportService.getDistrictReportList(data)
		.then(function(result){
				console.log(result);
				object.reportsList = result;

				res.render(renderFile,object,function(err,result){
					if(err){
						console.log(err);
						res.statusCode = 500;
						res.send(err);
					}else{
						res.statusCode = 200;
						res.send(result);
					}
				});
		})
		.fail(function(err){
				console.log(err);
				res.statusCode = 500;
				res.send(err);
		});
	}catch(err){
		console.log(err);
	}
});

module.exports = router;
