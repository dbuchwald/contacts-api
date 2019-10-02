const { setWorldConstructor } = require("cucumber");
const { AfterAll } = require("cucumber");

var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.CONTACTS_API_DB_HOST,
  port: process.env.CONTACTS_API_DB_PORT,
  user: process.env.CONTACTS_API_DB_USER,
  password: process.env.CONTACTS_API_DB_PASSWORD,
  database: process.env.CONTACTS_API_DB_DATABASE
});

class CustomWorld {
  constructor() {
    this.testURL = undefined;
    this.queryResponse = undefined;
    this.userId = undefined;
    this.establishedSessionId = undefined;
    this.requestSessionId = undefined;
    this.pool = pool;
  }

  setTestURL(url) {
    this.testURL = url;
  }

  setQueryResponse(response) {
    this.queryResponse = response;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  setEstablishedSessionId(sessionId) {
    this.establishedSessionId = sessionId;
  }

  setRequestSessionId(sessionId) {
    this.requestSessionId = sessionId;
  }
}

setWorldConstructor(CustomWorld);

AfterAll(function() {
  pool.end();
})