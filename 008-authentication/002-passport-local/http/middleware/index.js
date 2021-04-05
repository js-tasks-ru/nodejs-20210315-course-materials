const bodyParser = require('koa-bodyparser');
const passport = require('./passport');
const routes = require('./../routes');

module.exports = (app) => {
  app.use(bodyParser({enableTypes: ['json', 'form']}));
  app.use(passport.initialize());
  app.use(routes.middleware())
};
