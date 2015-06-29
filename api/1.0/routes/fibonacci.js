var express = require('express'),
    models = require('../../models'),
    router = express.Router();

var routes = {
  nth: function(req, res, next) {
    models.Fibonacci.execute(req.body, function(err, result) {
      if (err && err.name == 'ValidationError') { return res.status(400).json(err); }
      else if (err) { return res.status(500).json(err); }
      return res.status(200).json(result);
    });
  }
}

router.get('/nth', routes.nth);

exports = module.exports = {
  routes: routes,
  router: router
}
