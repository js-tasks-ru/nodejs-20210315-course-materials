const Koa = require('koa');
const mongoose = require('mongoose');
const config = require('config');
const applyMiddleware = require('./http/middleware');

mongoose.connect(config.get('mongo.url'), {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const port = config.get('app.port') || 3000;
const app = new Koa();

applyMiddleware(app);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
