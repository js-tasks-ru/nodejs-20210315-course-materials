console.log("console.log-1"); // 1

setTimeout(() => {
  console.log('setTimeout'); // 5
}, 0);

queueMicrotask(() => {
  console.log('queueMicrotask'); // 3
});

Promise.resolve().then(() => {
  console.log('then'); // 4
});

console.log('console.log-2'); // 2

/**
 *  stack: []
 *  micro: []
 *  timer: []
 */
