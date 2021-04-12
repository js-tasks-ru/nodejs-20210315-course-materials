module.exports = `
  type User {
    id: ID
    name: String!
    position: String
  }
  
  type Query {
    users: [User]
  }
`;
