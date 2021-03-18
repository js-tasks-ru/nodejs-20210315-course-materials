const {once, EventEmitter} = require('events');
const ac = new AbortController()

const ee = new EventEmitter();

setTimeout(() => {
  // ee.emit('event-name', 'data');
  // ee.emit('error', new Error('something went wrong'));
  ac.abort()
}, 10);

(async () => {
  try {
    const result = await once(ee, 'event-name', {signal: ac.signal});
    console.log('Result: ', result);
  } catch (err) {
    console.log('Error: ', err);
  }
})()
