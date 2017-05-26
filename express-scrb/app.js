//Core modules loading
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var authenticate = require('./utility/authenticate');

var content;
fs = require('fs');
path = require('path');
mime = require('mime');
//Node modules loading

q = require('q');
multipart = require('connect-multiparty');
uploads = multipart();
nodeXlsx = require('node-xlsx');
mysql = require('mysql');
db_template = require('db-template');
parser = require('xml2json');
parallelExecute = require('./utility/parallelExecute');
_ = require('underscore');
moment = require('moment');

//Project modules loading
routes = require('./routes/index');
users = require('./routes/users');
report = require('./routes/report');
distrcts = require('./routes/distrcts');
crimes = require('./routes/crimes');
trendline= require('./routes/trendline');
main = require('./routes/main');


exphbs = require('express-handlebars');
var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  defaultLayout: 'main',
  partialsDir:__dirname+'/views/partials',
  helpers:{
  	selectedOrNot:function (option,value) {
      console.log(option+'=='+value);
  		if(option == value){
  			return 'selected';
  		}
  	},
    equals:function(val1,val2,options){
      if(val1 == val2){
        return options.fn(this);
      }
    },
    lastDayOfMonth:function(){
      return moment().endOf('month').date();
    }
  }
});
reportService = require('./services/report');
distrctsReport = require('./services/distrcts');
crimesReport = require('./services/crimes');
trendlineReport=require('./services/trendline');
nodeXlsx = require('node-xlsx');
writeXlsx = require('./utility/writexlsx');
readXlsx = require('./utility/readxlsx');
readXlsx = new readXlsx();


//Services loading
reportService = require('./services/report');
content = fs.readFileSync(__dirname + '/sql-queries.xml');

var json = parser.toJson(content, {
  sanitize: false
});

var sqlQueries = JSON.parse(json)['sql-queries']['sql-query']
sqlQueryMap = {}
for (var i = 0; i < sqlQueries.length; i++) {
  sqlQueryMap[sqlQueries[i]['id']] = sqlQueries[i]['$t']
}

/****** Handling weekly report queries differently ******/
content = fs.readFileSync(__dirname + '/sql-queries-week.xml');
json = parser.toJson(content, {
  sanitize: false
});

sqlQueries = JSON.parse(json)['sql-queries']['sql-query'];
weeklyQueryMaps = {};           //Weekly queries
for (var i = 0; i < sqlQueries.length; i++) {
  weeklyQueryMaps[sqlQueries[i]['id']] = sqlQueries[i]['$t'];
}
/****** End of weekly report queries      ******/

var app = express();

// view engine setup


var pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'stage.wonderwe.com',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD ||  'stage1$',
  database: process.env.DATABASE || 'scrb',
  connectionLimit:600
});
executeQuery = db_template(pool);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({secret: 'ssshhhhh',resave:true,saveUninitialized:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.use('/', routes);
app.use('/data', authenticate, main);
app.use('/dashboard',authenticate, users);
app.use('/distrcts',authenticate, report);
app.use('/crimes', authenticate, crimes);
app.use('/trendline',authenticate,trendline);
app.use('/reports', authenticate, distrcts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


process.on('uncaughtException', function(err){
  console.log(err);
});

module.exports = app;
