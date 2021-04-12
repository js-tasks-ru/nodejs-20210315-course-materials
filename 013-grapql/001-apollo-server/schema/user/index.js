const {makeExecutableSchema} = require('graphql-tools');

const typeDefs = require('./users-type-defs');
const resolvers = require('./users-resolvers');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
