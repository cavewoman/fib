var express = require('express'),
    router = express.Router();

var routes = {
  nth: function(req, res, next) {
    return res.status(200).json('Here');     
  }
}

router.get('/nth', routes.nth);

exports = module.exports = {
  routes: routes,
  router: router
}
