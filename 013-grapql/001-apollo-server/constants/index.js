const PriorityLevels = [
  'CRITICAL',
  'MAJOR',
  'MINOR'
]

const DefaultPriorityLevel = PriorityLevels[PriorityLevels.length - 1];

const IncidentStatus = [
  'OPEN',
  'CLOSE'
]

const DefaultIncidentStatus = IncidentStatus[0];

module.exports = {
  PriorityLevels,
  DefaultPriorityLevel,
  IncidentStatus,
  DefaultIncidentStatus,
}
