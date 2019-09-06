const chai = require('chai');
const expect = chai.expect;
const { getDBConnectionStatus } = require('../lib/common/db/health');
const { MYSQL_ERROR_CODES } = require('../lib/common/db/errors');

describe('Login function', function() {

  it('Should return true if connection works', function() {
    return getDBConnectionStatus({ query: function(_query, _params, callback) {
      callback(undefined, [{matches:1}]); }})
      .then (result => {
        expect(result).to.be.true;
      })
  })

  it('Should return error message if query fails', function() {
    return getDBConnectionStatus({ query: function(_query, _params, callback) {
      callback('Simulated failure'); }})
      .then (
        _result => {
          chai.assert.fail('Should not work!')
        },
        exception => {
          expect(exception.code).to.be.equal(MYSQL_ERROR_CODES.MYSQL_QUERY_FAILED);
          expect(exception.message).to.be.equal('Database query failed, error message: Simulated failure');
        }
      )
  })
  
});