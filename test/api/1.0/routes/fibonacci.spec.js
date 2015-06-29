var request = require('supertest'),
    setup = require('../../../setup'),
    nock = require('nock'),
    fibonacciApi = require('../../../../api/1.0/routes/fibonacci.js');

describe('fibonacci routes', function() {

  var request,
      response,
      next;

  beforeEach(function() {
    request = setup.mockRequest();
    response = setup.mockResponse();
    next = setup.sandbox.stub();
  });
  
  describe('/nth', function() {
    
    it('returns a 200', function(done) {
      fibonacciApi.routes.nth(request, response, next);
      expect(response.status).to.have.been.calledWith(200);
      return done();
    });

  });

});
