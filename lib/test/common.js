const USER_EMAIL = 'alice@test.net';
const UNAUTHORIZED_USER_EMAIL = 'bob@test.net';
const VALID_PASSWORD = 'alicepass';
const INVALID_PASSWORD = 'incorrect';
var URL = 'http://localhost:3000';

const HEALTH_URI = '/api/v1/health';
const LOGIN_URI = '/api/v1/login';
const SESSIONS_URI = `${LOGIN_URI}/sessions`
const LOGOUT_URI = '/api/v1/logout'

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';

const validateHealthCheck=function(chai, config) {
  return chai.request(config.URL).get(`${config.HEALTH_URI}?${new Date().getTime()}`)
    .then( response => {
      chai.expect(response).to.have.status(200)
      chai.expect(response).to.be.json;
      chai.expect(response.body.status).to.be.equal('OK');
  })
}

const expectAccessDenied=function(chai, response) {
  chai.expect(response).to.have.status(401);
  chai.expect(response.body.error).to.be.equal('Access denied');  
}

const ensureURLDoesNotExist=function(chai, config, uri, method) {
  var promise;
  switch(method) {
    case METHOD_GET:
      promise=chai.request(config.URL).get(`${uri}?${new Date().getTime()}`);
      break;
    case METHOD_POST:
      promise=chai.request(config.URL).post(uri);
      break;
    default:
      throw(`Unknown method passed: ${method}`);
  }
  return promise
    .then (response => {
      chai.expect(response).to.have.status(404);    
    })
}

const logInUser=function(chai, config) {
  return chai.request(config.URL).post(config.LOGIN_URI)
    .send({id:config.USER_EMAIL, password:config.VALID_PASSWORD})
    .then( response => {
      chai.expect(response).to.have.status(200);
      chai.expect(response).to.be.json;
      chai.expect(response.body.success).to.be.true;
      chai.expect(response.body.sessionId).not.to.be.empty;
      return response.body.sessionId;
    })
}

const logOutUser=function(chai, config, sessionId) {
  return chai.request(config.URL).post(config.LOGOUT_URI)
    .set('sessionid', sessionId)
    .then(response => {
      chai.expect(response).to.have.status(200);
      chai.expect(response.body.success).to.be.true;
    })
}

module.exports = { USER_EMAIL, 
                   UNAUTHORIZED_USER_EMAIL, 
                   VALID_PASSWORD, 
                   INVALID_PASSWORD, 
                   URL,
                   HEALTH_URI,
                   LOGIN_URI,
                   SESSIONS_URI,
                   LOGOUT_URI,
                   METHOD_GET,
                   METHOD_POST,
                   validateHealthCheck,
                   expectAccessDenied,
                   ensureURLDoesNotExist,
                   logInUser,
                   logOutUser }