const {Server} = require('http');

const server = new Server();

server.on('request', async (req /*http.IncomingMessage*/, res /*http.ServerResponse*/) => {
});

server.listen(3000);
