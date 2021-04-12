const {EOL} = require('os');
const {PriorityLevels, DefaultPriorityLevel, IncidentStatus } = require('../../constants');

module.exports = `
  type User

  type Incident {
    id: ID
    name: String!
    description: String
    priority: Priority!
    status: IncidentStatus!
    assignee: User
    watch: [User]
  }
  
  enum Priority {
   ${PriorityLevels.join(EOL)}
  }
  
  enum IncidentStatus {
   ${IncidentStatus.join(EOL)}
  }
  
  type Query {
    incidents: [Incident]
  }
  
  input CreateIncident {
    name: String!
    description: String
    priority: Priority = ${DefaultPriorityLevel}
  }
  
  type Mutation {
     createIncident(incident: CreateIncident): Incident
     updateIncidentStatus(id: ID, status: IncidentStatus): Incident
     assignIncident(id: ID, userId: ID): Incident
     watchIncident(id: ID, userId: ID): Incident
  }
`;
