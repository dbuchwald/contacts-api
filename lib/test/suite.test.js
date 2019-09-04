var config = require('./common');
var { runLoginAPITests } = require('./tests/login.test')
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

if (process.env.API_HOST_URL) {
  config.URL = process.env.API_HOST_URL;
}

runLoginAPITests(chai, config);
