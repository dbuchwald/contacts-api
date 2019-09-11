const { setWorldConstructor } = require("cucumber");
var driver = require('../../lib/common/db/driver');
const { AfterAll } = require("cucumber");


class CustomWorld {
  constructor() {
    this.testURL = undefined;
    this.queryResponse = undefined;
    this.userId = undefined;
    this.establishedSessionId = undefined;
    this.requestSessionId = undefined;
    this.driver = driver;
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
  driver.closePool();
})