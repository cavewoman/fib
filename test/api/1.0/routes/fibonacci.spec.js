var proxyquire = require('proxyquire').noCallThru();

var request = require('supertest'),
    setup = require('../../../setup'),
    nock = require('nock'),
    mockModels = {},
    fibonacciApi = proxyquire('../../../../api/1.0/routes/fibonacci.js', {
      '../../models' : mockModels
    });

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

    context('when params are valid', function() {

      beforeEach(function() {
        mockModels.Fibonacci = {
          execute: setup.sandbox.stub().yields(null, { fib: 1 })
        };
      });
      
      it('returns 200', function(done) {
        fibonacciApi.routes.nth(request, response, next);
        expect(response.status).to.have.been.calledWith(200);
        expect(JSON.parse(response.body).fib).to.eq(1);
        return done();
      });

    });

    context('when params are invalid', function() {

      
      beforeEach(function() {
        mockModels.Fibonacci = {
          execute: setup.sandbox.stub().yields({ name: 'ValidationError' })
        };
      });
    
      it('returns 400', function(done) {
        fibonacciApi.routes.nth(request, response, next);
        expect(response.status).to.have.been.calledWith(400);
        return done();
      });

    });

    context('when something goes wrong out of the blue', function() {
    
      beforeEach(function() {
        mockModels.Fibonacci = {
          execute: setup.sandbox.stub().yields({})
        };
      });

      it('returns 500', function(done) {
        fibonacciApi.routes.nth(request, response, next);
        expect(response.status).to.have.been.calledWith(500);
        return done();
      });
    
    });

  });

});
