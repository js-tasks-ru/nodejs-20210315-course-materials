const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs - 1; i++) {
    cluster.fork();
  }

  const requests = Object.keys(cluster.workers).reduce((obj, id) => {
    obj[id] = 0;
    return obj;
  }, {});

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

  cluster.on('message', ((worker, message) => {
    if (message.type === 'new request') {
      requests[worker.id]++;
    }
  }));

  process.on('SIGINT', _ => {
    console.log(requests);
  });

} else {

  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    cluster.worker.send({type: 'new request'});
    res.writeHead(200);
    res.end(`hello world, worker ${process.pid}`);
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
