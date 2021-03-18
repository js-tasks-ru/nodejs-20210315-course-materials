console.log("console.log-1"); // 1

new Promise(
  (resolve, reject) => {
    console.log('new Promise'); // 2
    resolve();
  }
).then(() => {
  console.log('then'); // 4
});

console.log('console.log-2'); // 3

/**
 stack: []
 queue: []
 */

