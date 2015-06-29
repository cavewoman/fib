process.env.NODE_ENV = 'test';

var nock = require('nock')
    config = require('config'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    url = require('url');

chai.use(sinonChai);
global.expect = chai.expect;

var sandbox = sinon.sandbox.create();

afterEach(function() {
  sandbox.restore();
  nock.cleanAll();
});
exports.sandbox = sandbox;

function mockRequest() {
  return {
    params: {},
    query: {},
    body: ''
  };
}
exports.mockRequest = mockRequest;

function mockResponse() {
  var response = {};
  response.location = sandbox.stub().returns(response);
  response.status = sandbox.stub().returns(response);
  response.json = function(data) {
    response.body = JSON.stringify(data);
    return response;
  };
  response.end = sandbox.stub().returns(response);
  return response;
}
exports.mockResponse = mockResponse;
