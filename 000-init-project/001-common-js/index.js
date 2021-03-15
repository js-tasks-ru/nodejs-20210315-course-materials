const myModule = require('./mymodule');
const mySecondModule = require('./http');
const shared = require('./shared-object')

console.log("hello");
console.log(shared.a);
myModule();
