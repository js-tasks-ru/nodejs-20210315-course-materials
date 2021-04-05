const router = require('./router');
const bodyParser = require('koa-bodyparser');

module.exports = (app) => {
  // app.use(async (ctx, next) => {
  //   try {
  //     await next()
  //   } catch (e) {
  //     if (e instanceof HttpException) {
  //       ctx.body = e.message
  //       ctx.status = e.httpStatus
  //     }
  //   }
  // });
  app.use(bodyParser())
  app.use(router.middleware())
}
