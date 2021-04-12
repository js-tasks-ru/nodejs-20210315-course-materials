const mongoose = require('mongoose');
const {PriorityLevels, DefaultPriorityLevel, IncidentStatus, DefaultIncidentStatus} = require('./../../constants')
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

const Incident = mongoose.model('incident', incidentSchema);

module.exports = Incident
