var express = require('express');

var { getContactsList } = require('../common/db/contacts');
var { validateCustomerSession } = require('../common/redis/sessions')
var { STANDARD_ACCESS_DENIED_ERROR } = require('../common/app/errors');
var { checkIfSessionExists, sendCorrectResult, sendErrorMessage } = require('../common/http/handler')

var router = express.Router();

router.get('/:userId', function(req, res) {
  const userId = req.params.userId;
  const sessionId = req.headers.sessionid;
  checkIfSessionExists(sessionId)
    .then( sessionId => validateCustomerSession(res.locals.redisClient, sessionId, userId))
    .then( success => success ? getContactsList(res.locals.pool, userId) : Promise.reject(STANDARD_ACCESS_DENIED_ERROR))
    .then( results => sendCorrectResult(res, results) )
    .catch( error => sendErrorMessage(res, error) );
});

module.exports = router;