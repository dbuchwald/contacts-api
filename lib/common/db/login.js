const { MYSQL_ERROR_CODES } = require('./errors');

const checkIfCustomerExists = function(driver, email) {
  return new Promise( function(resolve, reject) {
    driver.query('SELECT COUNT(*) AS found FROM users WHERE email=?', [email], 
      function (error, results) {
        if (error) {
          reject({code: MYSQL_ERROR_CODES.MYSQL_QUERY_FAILED, message: `Database query failed, error message: ${error}`});
        } else {
          resolve(results[0].found === 1);
        }
      }
    );
  });
}


const validateCustomerPassword = function(driver, email, password) {
  return new Promise( function(resolve, reject) {
    driver.query('SELECT COUNT(*) AS matches FROM users ' +
                 'WHERE email=? AND password=SHA2(CONCAT(?, salt), 256)', [email, password], 
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

module.exports = { checkIfCustomerExists, validateCustomerPassword }