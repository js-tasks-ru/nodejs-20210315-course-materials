const Koa = require('koa');

// since v15
const {setTimeout} = require('timers/promises')

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // log error
    console.error(err.message)
    ctx.status = 200;
    ctx.body = {
      'message': 'error'
    };
  }
});

// GET /path 250ms
app.use(async (ctx, next) => {
  const start = process.hrtime.bigint(); // new Date()
  // const [timestamp, nano] = process.hrtime() // new Date()

  await next();

  const end = process.hrtime.bigint();
  console.log(`${ctx.method} ${ctx.path} ${Number(end - start) / (1000 * 1000)}ms`);
});

app.use(async (ctx, next) => {
  // throw new Error('something went wrong');
  await setTimeout(250);
});


app.listen(3000, () => {
  console.log('Server started');
});
