const chai = require('chai');
const expect = chai.expect;
const { validateCustomerPassword } = require('../lib/common/db/login');
const { MYSQL_ERROR_CODES } = require('../lib/common/db/errors');

describe('Login function', function() {

  it('Should return true if correct user and password is passed', function() {
    return validateCustomerPassword({ query: function(_query, _params, callback) {
      callback(undefined, [{matches:1}]); }}, 'user', 'password')
      .then (result => {
        expect(result).to.be.true;
      })
  })

  it('Should return false if incorrect user and password is passed', function() {
    return validateCustomerPassword({ query: function(_query, _params, callback) {
      callback(undefined, [{matches:0}]); }}, 'user', 'password')
      .then (result => {
        expect(result).to.be.false;
      })
  })

  it('Should return error message if query fails', function() {
    return validateCustomerPassword({ query: function(_query, _params, callback) {
      callback('Simulated failure'); }}, 'user', 'password')
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