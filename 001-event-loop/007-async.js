const fs = require('fs').promises; // fx-extra

console.log('console-log-1');
async function asyncFunction() {
  console.log('asyncFunction-1');
  await Promise.resolve();
  console.log('asyncFunction-2');
  await fs.open(__filename);
  console.log('asyncFunction-3');
}

// new Promise(resolve => {
//   console.log('asyncFunction-1');
//   resolve(Promise.resolve());
// }).then(() => {
//   console.log('asyncFunction-2');
//   return fs.open(__filename);
// }).then(() => {
//   console.log('asyncFunction-3');
// });

asyncFunction();

