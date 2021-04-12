const config = require('config');
const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const schema = require('./schema')

const server = new ApolloServer({...config.get('graphql'), schema});

mongoose.connect(config.get('db.mongo.url'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.set('debug', true);

server.listen(config.get('app.port')).then(({url}) => {
  console.log(`🚀Server ready at ${url}`);
});

// GET /articles?with_author -> 20
// 20 * GET /author/:id
//
// 21
// N+1
