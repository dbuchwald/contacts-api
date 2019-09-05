const { setWorldConstructor } = require("cucumber");
var driver = require('../../lib/common/db/driver');
const { AfterAll } = require("cucumber");


class CustomWorld {
  constructor() {
    this.testURL = undefined;
    this.queryResponse = undefined;
    this.sessionId = undefined;
    this.driver = driver;
  }

  setTestURL(url) {
    this.testURL = url;
  }

  setQueryResponse(response) {
    this.queryResponse = response;
  }

  setSessionId(sessionId) {
    this.sessionId = sessionId;
  }
}

setWorldConstructor(CustomWorld);

AfterAll(function() {
  driver.closePool();
})