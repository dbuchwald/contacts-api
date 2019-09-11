const { When, Then } = require("cucumber");
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect=chai.expect;

When('User {string} logs in with password {string}', function (email, password) {
  return chai.request(this.testURL).post('/api/v1/login')
    .send({email:email, password:password})
    .then( function(response) {
      this.setQueryResponse(response);
    }.bind(this));
});

Then('Login is successful', function () {
  expect(this.queryResponse).to.have.status(200);
  expect(this.queryResponse).to.be.json;
  expect(this.queryResponse.body.success).to.be.true;
  expect(this.queryResponse.body.sessionId).not.to.be.empty;
});

Then('Login is not successful', function () {
  expect(this.queryResponse).to.have.status(200);
  expect(this.queryResponse).to.be.json;
  expect(this.queryResponse.body.success).to.be.false;
  expect(this.queryResponse.body.sessionId).to.be.null;
});