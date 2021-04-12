const {mergeSchemas} = require('graphql-tools')
const users = require('./user');
const incidents = require('./incident');


module.exports = mergeSchemas({schemas: [users, incidents]})

