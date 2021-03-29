const router = require('./router');
const bodyParser = require('koa-bodyparser');

module.exports = (app) => {
  app.use(bodyParser())
  app.use(router.middleware())
}
