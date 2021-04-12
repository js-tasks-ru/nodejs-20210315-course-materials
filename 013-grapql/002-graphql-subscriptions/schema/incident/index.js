const {makeExecutableSchema} = require('graphql-tools');

const resolvers = require('./incident-resolver');
const typeDefs = require('./incident-type-defs');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
