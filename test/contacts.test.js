const chai = require('chai');
const sinon = require('sinon');
const driver = require('../lib/common/db/driver');
const expect = chai.expect;
const { getContactsList, updateContact, deleteContact, validateContactOwnership } = require('../lib/common/db/contacts');
const { MYSQL_ERROR_CODES } = require('../lib/common/db/errors');

describe('Contacts Management', function() {

  beforeEach('Create driver instance', function() {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(driver, 'query');
  });
  afterEach('Restore stub', function() {
    this.sandbox.restore();
  });

  describe('getContactsList function', function() {

    it('Should return contact for valid customer id', function() {

      driver.query.yields(null, [{id:101, owner_id: 1001, first_name:'Homer', last_name:'Simpson', organization:null}]);

      return getContactsList(driver, 1001)
        .then (result => {
          expect(result.length).to.be.equal(1);
          expect(result[0].id).to.be.equal(101);
          expect(result[0].owner_id).to.be.equal(1001);
          expect(result[0].first_name).to.be.equal('Homer');
          expect(result[0].last_name).to.be.equal('Simpson');
          expect(result[0].organization).to.be.null;
        })
    })

    it('Should return empty list for invalid customer id', function() {

      driver.query.yields(null, []);

      return getContactsList(driver, -1)
        .then (result => {
          expect(result.length).to.be.equal(0);
        })
    })

    it('Should return error if query fails', function() {

      driver.query.yields('Simulated failure');

      return getContactsList(driver, 1001)
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

  describe('updateContact function', function() {

    it('Should work for valid customer id', function() {

      driver.query.yields(null, [{}]);

      return updateContact(driver, 1001, 'Homer', 'Simpson', null)
        .then (result => {
          expect(result.length).to.be.equal(1);
        })
    })

    it('Should return empty list for invalid customer id', function() {

      driver.query.yields(null, [{}]);

      return updateContact(driver, -1, 'Homer', 'Simpson', null)
        .then (result => {
          expect(result.length).to.be.equal(1);
        })
    })

    it('Should return error if query fails', function() {

      driver.query.yields('Simulated failure');

      return updateContact(driver, 1001, 'Homer', 'Simpson', null)
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

  describe('deleteContact function', function() {

    it('Should work for valid customer id', function() {

      driver.query.yields(null, [{}]);

      return deleteContact(driver, 1001)
        .then (result => {
          expect(result.length).to.be.equal(1);
        })
    })

    it('Should return empty list for invalid customer id', function() {

      driver.query.yields(null, [{}]);

      return deleteContact(driver, -1)
        .then (result => {
          expect(result.length).to.be.equal(1);
        })
    })

    it('Should return error if query fails', function() {

      driver.query.yields('Simulated failure');

      return deleteContact(driver, 1001)
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

  describe('validateContactOwnership function', function() {

    it('Should return true for valid ownership', function() {

      driver.query.yields(null, [{matches:1}]);

      return validateContactOwnership(driver, 1001, 101)
        .then (result => {
          expect(result).to.be.true;
        })
    })

    it('Should return false for invalid ownership', function() {

      driver.query.yields(null, [{matches:0}]);

      return validateContactOwnership(driver, -1, 101)
        .then (result => {
          expect(result).to.be.false;
        })
    })

    it('Should return error if query fails', function() {

      driver.query.yields('Simulated failure');

      return validateContactOwnership(driver, 1001, 101)
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

});