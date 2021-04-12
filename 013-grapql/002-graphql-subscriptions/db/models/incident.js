const mongoose = require('mongoose');
const {PriorityLevels, DefaultPriorityLevel, IncidentStatus, DefaultIncidentStatus} = require('./../../constants')
const {pubsub, EventType} = require('../../event-bus')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const incidentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: PriorityLevels,
    default: DefaultPriorityLevel
  },
  status: {
    type: String,
    enum: IncidentStatus,
    default: DefaultIncidentStatus,
  },
  assignee: {
    ref: 'user',
    type: ObjectId,
  },
  watch: [
    {
      ref: 'user',
      type: ObjectId,
    }
  ]
})

incidentSchema.methods.updateStatus = async function (status) {
  this.status = status;
  await this.save();

  /** ee.emit('event', ...) */
  await pubsub.publish(EventType.INCIDENT_UPDATED, {incidentUpdate: this});
}

incidentSchema.methods.getWatcherIds = function () {
  if (this.populated('watch')) {
    return this.watch.map(watcher => watcher.id);
  }
  return this.watch;
}

const Incident = mongoose.model('incident', incidentSchema);

module.exports = Incident
