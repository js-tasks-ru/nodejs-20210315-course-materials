const {EventEmitter} = require('events');

const ee = new EventEmitter();
ee.emit('event', 'hello-1');
ee.on('event', console.log);

class MyEmitter extends EventEmitter {
  constructor() {
    super()
  }
}

const myEE = new MyEmitter();
myEE.on('event', console.log);
myEE.emit('event', 'hello-2');

module.exports = myEE;

