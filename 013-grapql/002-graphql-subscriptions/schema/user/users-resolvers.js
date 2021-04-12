const {User} = require('../../db/models')

module.exports = {
  Query: {
    users: () => {
      return User.find().exec();
    }
  },
}
