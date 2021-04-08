const {
  Worker,
} = require('worker_threads');
const log = require('./log')('main');

const worker = new Worker('./worker.js', {workerData: {foo: 'bar'}});
log('worker pid %d', worker.threadId);

const sharedBuffer = new SharedArrayBuffer(4); // 32bit
const uint32Array = new Uint32Array(sharedBuffer);
uint32Array[0] = 42;

worker.postMessage(sharedBuffer);
worker.on('message', message => {
  if (message === 'change') {
    log('Shared array %i', uint32Array[0]);
  }
});





