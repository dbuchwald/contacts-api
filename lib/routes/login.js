var express = require('express');
var { validateCustomerPassword } = require('../common/db/login');
var { createCustomerSession } = require('../common/redis/sessions');
var { sendCorrectResult, sendErrorMessage } = require('../common/http/handler');
var router = express.Router();

router.post('/', function (req, res) {
	const email = req.body.email;
  const password = req.body.password;
  var storedUserId;
  validateCustomerPassword(res.locals.pool, email, password)
    .then( userId => userId ? createCustomerSession(res.locals.redisClient, storedUserId=userId) : null)
    .then( sessionId => sessionId ? { success:true, userId: storedUserId, sessionId } : 
                                    { success:false, userId: storedUserId, sessionId })
    .then( loginResponse => sendCorrectResult(res, loginResponse) )
    .catch( error => sendErrorMessage(res, error) );
});

module.exports = router;