const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const driver = require('../lib/common/db/driver');
const { getDBConnectionStatus } = require('../lib/common/db/health');
const { MYSQL_ERROR_CODES } = require('../lib/common/db/errors');

describe('Health function', function() {

  beforeEach('Create driver instance', function() {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(driver, 'query');
  });
  afterEach('Restore stub', function() {
    this.sandbox.restore();
  });

  it('Should return true if connection works', function() {

    driver.query.yields(null, [{matches:1}]);

    return getDBConnectionStatus(driver)
      .then (result => {
        expect(result).to.be.true;
      })
  })

  it('Should return error message if query fails', function() {

    driver.query.yields('Simulated failure');

    return getDBConnectionStatus(driver)
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