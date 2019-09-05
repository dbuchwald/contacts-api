var express = require('express');
var logger = require('morgan');
var redis = require('redis');
var driver = require('./common/db/driver');
var healthRouter = require('./routes/health');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
	res.locals.driver = driver;
	next();
});

app.use(function (req, res, next) {
  res.locals.redisClient = redis.createClient(process.env.CONTACTS_API_REDIS_PORT, 
                                              process.env.CONTACTS_API_REDIS_HOST, 
                                              { password: process.env.CONTACTS_API_REDIS_PASSWORD });
	res.locals.redisClient.on('error', function (err) {
		console.log('Something went wrong ' + err);
	});

	next();
});

app.use('/api/v1/health', healthRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send('Not found');
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500).send(`${res.locals.error}: ${res.locals.message}`);
});

module.exports = app;