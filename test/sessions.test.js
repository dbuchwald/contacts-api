const chai = require('chai');
const sinon = require('sinon');
// TODO: Create Redis client without trying to invoke connection
var redisClient = { get: () => {}, set: () => {}, del: () => {}};
const expect = chai.expect;
const { getRedisConnectionStatus, createCustomerSession, 
        getCustomerIdFromSession, deleteCustomerSession,
        validateCustomerSession } = require('../lib/common/redis/sessions');
const { REDIS_ERROR_CODES } = require('../lib/common/redis/errors');

describe('Session management', function() {

  beforeEach('Create driver instance', function() {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(redisClient, 'get');
    this.sandbox.stub(redisClient, 'set');
    this.sandbox.stub(redisClient, 'del');
  });

  afterEach('Restore stub', function() {
    this.sandbox.restore();
  });

  describe('getConnectionStatus function', function() {

    it('Should return true if connection works', function() {
      redisClient.get.yields(null, true);

      return getRedisConnectionStatus(redisClient)
        .then( result => {
          expect(result).to.be.true;
        });
    })

    it('Should return error if connection doesn\'t work', function() {
      redisClient.get.yields('Simulated failure');

      return getRedisConnectionStatus(redisClient)
        .then( () => {
          chai.assert.fail('Should not work!');
        },
        exception => {
          expect(exception.code).to.be.equal(REDIS_ERROR_CODES.REDIS_QUERY_FAILED);
          expect(exception.message).to.be.equal('Simulated failure');
        })
    })
  })

  describe('createCustomerSession function', function() {
  
    it('Should return sessionId if it was created', function() {
      redisClient.set.yields(null, 'OK');

      return createCustomerSession(redisClient, 'alice@test.net')
        .then( result => {
          expect(result).to.be.not.null;
          expect(result).to.be.not.undefined;
          expect(result.length).to.be.greaterThan(0);
        });
    })

    it('Should return error if session creation failed', function() {
      redisClient.set.yields(null, 'Not OK');

      return createCustomerSession(redisClient, 'alice@test.net')
        .then( () => {
          chai.assert.fail('Should not work!');
        },
        exception => {
          expect(exception.code).to.be.equal(REDIS_ERROR_CODES.SESSION_INIT_FAILED);
          expect(exception.message).to.be.equal('Session initialization in Redis responded with Not OK');
        })
    })
  })

  describe('getCustomerIdFromSession function', function() {
  
    it('Should return customer id for valid session', function() {
      redisClient.get.yields(null, 'alice@test.net');

      return getCustomerIdFromSession(redisClient, 'valid session id')
        .then( result => {
          expect(result).to.be.equal('alice@test.net');
        });
    })

    it('Should return error if invalid session id passed', function() {
      redisClient.get.yields('Simulated failure');

      return getCustomerIdFromSession(redisClient, 'invalid session id')
        .then( () => {
          chai.assert.fail('Should not work!');
        },
        exception => {
          expect(exception.code).to.be.equal(REDIS_ERROR_CODES.REDIS_QUERY_FAILED);
          expect(exception.message).to.be.equal('Simulated failure');
        })
    })
  })

  describe('deleteCustomerSession function', function() {
  
    it('Should return true for valid session', function() {
      redisClient.del.yields(null, 1);

      return deleteCustomerSession(redisClient, 'valid session id')
        .then( result => {
          expect(result).to.be.true;
        });
    })

    it('Should return false for invalid session', function() {
      redisClient.del.yields(null, 0);

      return deleteCustomerSession(redisClient, 'invalid session id')
        .then( result => {
          expect(result).to.be.false;
        });
    })

    it('Should return error session if deletion fails', function() {
      redisClient.del.yields('Simulated failure');

      return deleteCustomerSession(redisClient, 'invalid session id')
        .then( () => {
          chai.assert.fail('Should not work!');
        },
        exception => {
          expect(exception.code).to.be.equal(REDIS_ERROR_CODES.SESSION_DESTROY_FAILED);
          expect(exception.message).to.be.equal('Session deletion failed: Simulated failure');
        })
    })
  })

  describe('validateCustomerSession function', function() {
  
    it('Should return true for valid session', function() {
      redisClient.get.yields(null, 'alice@test.net');

      return validateCustomerSession(redisClient, 'valid session id', 'alice@test.net')
        .then( result => {
          expect(result).to.be.true;
        });
    })

    it('Should return false for invalid session', function() {
      redisClient.get.yields(null, null);

      return validateCustomerSession(redisClient, 'invalid session id', 'alice@test.net')
        .then( result => {
          expect(result).to.be.false;
        });
    })

    it('Should return error if session validation fails', function() {
      redisClient.get.yields('Simulated failure');

      return validateCustomerSession(redisClient, 'invalid session id', 'alice@test.net')
        .then( () => {
          chai.assert.fail('Should not work!');
        },
        exception => {
          expect(exception.code).to.be.equal(REDIS_ERROR_CODES.REDIS_QUERY_FAILED);
          expect(exception.message).to.be.equal('Redis query failed: Simulated failure');
        })
    })
  })

});