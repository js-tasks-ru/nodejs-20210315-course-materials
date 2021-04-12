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
