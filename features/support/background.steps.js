const { Given } = require("cucumber");
const { MYSQL_ERROR_CODES } = require('../../lib/common/db/errors');
const { validateCustomerPassword } = require('../../lib/common/db/login');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect=chai.expect;

const checkIfCustomerExists = function(driver, email) {
  return new Promise( function(resolve, reject) {
    driver.query('SELECT COUNT(*) AS found FROM users WHERE email=?', [email], 
      function (error, results) {
        if (error) {
          reject({code: MYSQL_ERROR_CODES.MYSQL_QUERY_FAILED, message: `Database query failed, error message: ${error}`});
        } else {
          resolve(results[0].found === 1);
        }
      }
    );
  });
}

Given('Contacts API URL is configured', function () {
  expect(process.env.CONTACTS_API_TEST_URL).to.be.not.equal(undefined, 'CONTACTS_API_TEST_URL environment variable is not set');
  expect(process.env.CONTACTS_API_TEST_URL).to.be.not.equal(null, 'CONTACTS_API_TEST_URL environment variable is not set');
  expect(process.env.CONTACTS_API_TEST_URL.length).to.be.not.equal(0, 'CONTACTS_API_TEST_URL environment variable is empty');
  this.setTestURL(process.env.CONTACTS_API_TEST_URL);
});

Given('Application is running', function () {
  return chai.request(this.testURL).get(`/api/v1/health?${new Date().getTime()}`)
    .then( function(response) { 
      expect(response).to.have.status(200)
      expect(response).to.be.json;
      expect(response.body.status).to.be.equal('OK');
    });
});

Given('User {string} exists', function (email) {
  return checkIfCustomerExists(this.driver, email)
    .then( function(response) {
      expect(response).to.be.true;
    });
});

Given('User {string} has password {string}', function (email, password) {
  return validateCustomerPassword(this.driver, email, password)
    .then( function(response) {
      expect(response).to.be.true;
    });
});



