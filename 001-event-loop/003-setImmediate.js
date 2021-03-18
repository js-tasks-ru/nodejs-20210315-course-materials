
console.log("console.log-1");  // 1

setImmediate(() => {
  console.log('setImmediate'); // 3
});

console.log('console.log-2'); // 2
