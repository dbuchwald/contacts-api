const chai = require('chai');
const sinon = require('sinon');
const driver = require('../lib/common/db/driver');
const expect = chai.expect;
const { validateCustomerPassword } = require('../lib/common/db/login');
const { MYSQL_ERROR_CODES } = require('../lib/common/db/errors');

describe('Login function', function() {

  beforeEach('Create driver instance', function() {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(driver, 'query');
  });
  afterEach('Restore stub', function() {
    this.sandbox.restore();
  });

  it('Should return true if correct user and password is passed', function() {

    driver.query.yields(null, [{matches:1}]);

    return validateCustomerPassword(driver, 'user', 'correct password')
      .then (result => {
        expect(result).to.be.true;
      })
  })

  it('Should return false if incorrect user and password is passed', function() {

    driver.query.yields(null, [{matches:0}]);

    return validateCustomerPassword(driver, 'user', 'incorrect password')
      .then (result => {
        expect(result).to.be.false;
      })
  })

  it('Should return error message if query fails', function() {

    driver.query.yields('Simulated failure');

    return validateCustomerPassword(driver, 'user', 'correct password')
      .then (
        () => {
          chai.assert.fail('Should not work!')
        },
        exception => {
          expect(exception.code).to.be.equal(MYSQL_ERROR_CODES.MYSQL_QUERY_FAILED);
          expect(exception.message).to.be.equal('Database query failed, error message: Simulated failure');
        }
      )
  })
  
});