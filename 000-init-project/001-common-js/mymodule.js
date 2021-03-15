const shared = require('./shared-object')

console.log(shared.a);
shared.a = 42

console.log('hello from module');

module.exports = () => console.log('hello form exported function');

