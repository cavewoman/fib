//
// API routes
//

var config = require('config');

var routes = [
  {name: 'fibonacci', '1.0'}
]

exports = module.exports = function(app) {
  routes.forEach(function(c) {
    route = require(config.get('root') + '/api/' + c.version + '/routes/' + c.name + '.js');
    app.use('/api/' + c.version + '/' + c.name, route);
  });
};
