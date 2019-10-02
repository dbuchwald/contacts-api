const { MYSQL_ERROR_CODES } = require('./errors');

const validateCustomerPassword = function(pool, email, password) {
  return new Promise( function(resolve, reject) {
    pool.query('SELECT id FROM users ' +
                 'WHERE email=? AND password=SHA2(CONCAT(?, salt), 256)', [email, password], 
      function (error, results) {
        if (error) {
          reject({code: MYSQL_ERROR_CODES.MYSQL_QUERY_FAILED, message: `Database query failed, error message: ${error}`});
        } else {
          resolve((results.length>0) ? results[0].id : undefined);
        }
      }
    );
  });
}

module.exports = { validateCustomerPassword }