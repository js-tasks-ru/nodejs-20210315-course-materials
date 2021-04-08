const {
  workerData, parentPort,
} = require('worker_threads');
const log = require('./log')('worker');

log('workerData: %j', workerData);

parentPort.on('message', message => {
  if (message instanceof SharedArrayBuffer) {
    const uint32Array = new Uint32Array(message);
    log('Shared array %i', uint32Array[0]);
    uint32Array[0] = 84;
    parentPort.postMessage('change');
    process.exit(0);
    return;
  }
  log(message);
});

