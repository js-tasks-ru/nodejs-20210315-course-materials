const Koa = require('koa');
const app = new Koa();
const debug = require('debug')('app');

const arr = [];

app.use(middleware);

function middleware(ctx) {
  debug('new request');
  ctx.body = 'Hello Koa';
  arr.push(Array.from({length: 1e6}, () => 0))
}

app.listen(3000);
