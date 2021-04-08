
const {workerData, parentPort} = require('worker_threads');

const {a, b} = workerData;

setTimeout(() => {
  parentPort.postMessage(a + b);
}, 500);
