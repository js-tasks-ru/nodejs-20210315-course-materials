const {Server} = require('http');

const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();
app.use(serve('./public'));

const server = new Server(app.callback());
// (req, res) => {}

const io = require('socket.io')(server);

io.on('connection', socket => {

  socket.on('start', (...a) => {
    console.log('start');
  });

  // socket.on('new-user', () => {})
  // socket.on('typing', () => {})

  socket.on('message', ({from, message}) => {
    socket.broadcast.emit('message', {from, message})
  });

});


server.listen(3000, (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  console.log('Server started');
});

