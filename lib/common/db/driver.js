var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.CONTACTS_API_DB_HOST,
  port: process.env.CONTACTS_API_DB_PORT,
  user: process.env.CONTACTS_API_DB_USER,
  password: process.env.CONTACTS_API_DB_PASSWORD,
  database: process.env.CONTACTS_API_DB_DATABASE,
  multipleStatements: true
});

var driver = (function () {
  function _query(query, params, callback) {
    pool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        callback(err, null);
        throw err;
      }

      connection.query(query, params, function (err, rows) {
        connection.release();
        if (!err) {
          callback(null, rows);
        }
        else {
          callback(err, null);
        }
      });

      connection.on('error', function (err) {
        connection.release();
        callback(err, null);
        throw err;
      });
    });
  }

  function _closePool() {
    pool.end();
  }

  return {
    query: _query,
    closePool: _closePool
  };
})();

module.exports = driver;