const {PubSub} = require('apollo-server');


/** EventEmitter */
const pubsub = new PubSub();

module.exports = {
  pubsub,
  EventType: {
    INCIDENT_UPDATED: 'Incident updated',
  }
};



