var express = require('express');

var { getContactsList } = require('../common/db/contacts');
var { getCustomerIdFromSession } = require('../common/redis/sessions')
var { STANDARD_ACCESS_DENIED_ERROR } = require('../common/app/errors');
var { checkIfSessionExists, sendCorrectResult, sendErrorMessage } = require('../common/http/handler')

var router = express.Router();

router.get('/', function(req, res) {
  const sessionId = req.headers.sessionid;
  checkIfSessionExists(sessionId)
    .then( sessionId => getCustomerIdFromSession(res.locals.redisClient, sessionId))
    .then( userId => userId ? getContactsList(res.locals.pool, userId) : Promise.reject(STANDARD_ACCESS_DENIED_ERROR))
    .then( results => sendCorrectResult(res, results) )
    .catch( error => sendErrorMessage(res, error) );
});

module.exports = router;