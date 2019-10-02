const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const pool = require('mysql').createPool({});
const { getDBConnectionStatus } = require('../lib/common/db/health');
const { MYSQL_ERROR_CODES } = require('../lib/common/db/errors');

describe('Health function', function() {

  beforeEach('Create pool instance', function() {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(pool, 'query');
  });
  afterEach('Restore stub', function() {
    this.sandbox.restore();
  });

  it('Should return true if connection works', function() {

    pool.query.yields(null, [{matches:1}]);

    return getDBConnectionStatus(pool)
      .then (result => {
        expect(result).to.be.true;
      })
  })

  it('Should return error message if query fails', function() {

    pool.query.yields('Simulated failure');

    return getDBConnectionStatus(pool)
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