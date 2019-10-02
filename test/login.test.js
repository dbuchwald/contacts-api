const chai = require('chai');
const sinon = require('sinon');
const pool = require('mysql').createPool({});
const expect = chai.expect;
const { validateCustomerPassword } = require('../lib/common/db/login');
const { MYSQL_ERROR_CODES } = require('../lib/common/db/errors');

describe('Login function', function() {

  beforeEach('Create pool instance', function() {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(pool, 'query');
  });
  afterEach('Restore stub', function() {
    this.sandbox.restore();
  });

  it('Should return true if correct user and password is passed', function() {

    pool.query.yields(null, [{id:1001}]);

    return validateCustomerPassword(pool, 'alice@test.net', 'correct password')
      .then (result => {
        expect(result).to.be.equal(1001);
      })
  })

  it('Should return false if incorrect user and password is passed', function() {

    pool.query.yields(null, []);

    return validateCustomerPassword(pool, 'alice@test.net', 'incorrect password')
      .then (result => {
        expect(result).to.be.undefined;
      })
  })

  it('Should return error message if query fails', function() {

    pool.query.yields('Simulated failure');

    return validateCustomerPassword(pool, 'user', 'correct password')
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