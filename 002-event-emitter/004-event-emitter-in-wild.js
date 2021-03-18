const {Server} = require('http');

const server = new Server();

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
server.on('request', (req, res) => {
  console.log('request');
  res.end('Hello');
});

server.once('listening', () => console.log('Server started'));

server.listen(3000);
