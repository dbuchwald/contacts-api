const { MYSQL_ERROR_CODES } = require('./errors');

const getContactsList = function(pool, userId) {
  return new Promise( function(resolve, reject) {
    pool.query('SELECT id, owner_id, first_name, last_name, organization ' +
                 'FROM contacts WHERE owner_id=?', [userId], 
      function (error, results) {
        if (error) {
          reject({code: MYSQL_ERROR_CODES.MYSQL_QUERY_FAILED, message: `Database query failed, error message: ${error}`});
        } else {
          resolve(results);
        }
      }
    );
  });
}

const updateContact = function(pool, contactId, firstName, lastName, organization) {
  return new Promise( function(resolve, reject) {
    pool.query('UPDATE contacts SET first_name=?, last_name=?, organization=? ' +
                 'WHERE id=?', [firstName, lastName, organization, contactId], 
      function (error, results) {
        if (error) {
          reject({code: MYSQL_ERROR_CODES.MYSQL_QUERY_FAILED, message: `Database query failed, error message: ${error}`});
        } else {
          resolve(results);
        }
      }
    );
  });
}

const deleteContact = function(pool, contactId) {
  return new Promise( function(resolve, reject) {
    pool.query('DELETE FROM contacts WHERE id=?', [contactId], 
      function (error, results) {
        if (error) {
          reject({code: MYSQL_ERROR_CODES.MYSQL_QUERY_FAILED, message: `Database query failed, error message: ${error}`});
        } else {
          resolve(results);
        }
      }
    );
  });
}

const validateContactOwnership = function(pool, userId, contactId) {
  return new Promise( function(resolve, reject) {
    pool.query('SELECT COUNT(*) AS matches FROM contacts WHERE id=? AND owner_id=?', [contactId, userId], 
      function (error, results) {
        if (error) {
          reject({code: MYSQL_ERROR_CODES.MYSQL_QUERY_FAILED, message: `Database query failed, error message: ${error}`});
        } else {
          resolve(results[0].matches === 1);
        }
      }
    );
  });
}

module.exports = { getContactsList, updateContact, deleteContact, validateContactOwnership }