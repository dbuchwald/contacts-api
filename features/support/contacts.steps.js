const { Given, When, Then } = require("cucumber");
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect=chai.expect;

Given('Valid session id is used', function () {
  this.setRequestSessionId(this.establishedSessionId);
});

Given('Invalid session id is used', function () {
  this.setRequestSessionId('invalid');
});

When('User lists all her contacts', function () {
  return chai.request(this.testURL).get('/api/v1/contacts')
    .set('sessionid', this.requestSessionId)
    .then( function(response) {
      this.setQueryResponse(response);
    }.bind(this));
});

Then('Fetch is successful', function () {
  expect(this.queryResponse).to.have.status(200);
});

Then('Contact is found with first name {string}, last name {string}', function (firstName, lastName) {
  expect(this.queryResponse.body.map(entry => ({firstName: entry.first_name, lastName: entry.last_name}))).to.deep.include({firstName, lastName});  
});