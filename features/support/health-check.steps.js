const { When, Then } = require("cucumber");
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect=chai.expect;


When('Health check is invoked', function () {
  return chai.request(this.testURL).get(`/api/v1/health?${new Date().getTime()}`)
    .then( function(response) { 
      this.setQueryResponse(response);
    }.bind(this));
});

Then('The response should be {string}', function (string) {
  expect(this.queryResponse).to.have.status(200)
  expect(this.queryResponse).to.be.json;
  expect(this.queryResponse.body.status).to.be.equal(string);
});