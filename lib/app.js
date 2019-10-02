var express = require('express');
var logger = require('morgan');
var redis = require('redis');
var healthRouter = require('./routes/health');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var contactsRouter = require('./routes/contacts');

var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.CONTACTS_API_DB_HOST,
  port: process.env.CONTACTS_API_DB_PORT,
  user: process.env.CONTACTS_API_DB_USER,
  password: process.env.CONTACTS_API_DB_PASSWORD,
  database: process.env.CONTACTS_API_DB_DATABASE
});

var app = express();
var redisClient = redis.createClient(process.env.CONTACTS_API_REDIS_PORT, 
                                     process.env.CONTACTS_API_REDIS_HOST, 
                                     { password: process.env.CONTACTS_API_REDIS_PASSWORD });


redisClient.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (_req, res, next) {
	res.locals.pool = pool;
  res.locals.redisClient = redisClient;

	next();
});

app.use('/api/v1/health', healthRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/logout', logoutRouter);
app.use('/api/v1/contacts', contactsRouter);

// catch 404 and forward to error handler
app.use(function (_req, res) {
  res.status(404).send('Not found');
});

// error handler
app.use(function (err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500).send(`${res.locals.error}: ${res.locals.message}`);
});

module.exports = app;
