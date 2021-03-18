const {on, EventEmitter} = require('events');

const ee = new EventEmitter();

const ac = new AbortController()

let c = 0
const interval = setInterval(() => {
  if (c >= 3) {
    clearInterval(interval);
    ee.emit('error', new Error('something went wrong'));
    // ac.abort();
  }
  ee.emit('event-name', 'data');
  c++
}, 1000);

(async () => {

  try {
    for await (e of on(ee, 'event-name', {signal: ac.signal})) {
      console.log(e);
    }
  } catch (err) {
    console.log('Error: ', err);
  }
})()
