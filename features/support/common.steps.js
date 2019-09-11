const { Then } = require("cucumber");
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect=chai.expect;

Then('Access is denied', function () {
  expect(this.queryResponse).to.have.status(401);
});