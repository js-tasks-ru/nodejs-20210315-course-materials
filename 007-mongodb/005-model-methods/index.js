const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.plugin(beautifyUnique);
const {Schema} = mongoose;

const dbName = 'mongoose_indexes';

const url = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true});
mongoose.set('debug', true);

const userSchema = new Schema({
  name: {
    type: String,
    index: true,
  },
  login: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: 'email is required',
    match: /.*@.*/,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
}, {});

userSchema.statics.login = function (login, password) {
  // this === User
  return this.findOne({login, password})
};

userSchema.methods.isBirthDay = function () {
  // this === user === new User
  const now = new Date()
  return this.dateOfBirth.getDate() === now.getDate() && this.dateOfBirth.getMonth() === now.getMonth()
};

const User = mongoose.model('user', userSchema);

(async function () {
  try {
    await User.deleteMany({});

    const paul = new User({
      name: 'Paul',
      email: 'paul@atredias.com',
      login: 'muaddib',
      dateOfBirth: new Date('2000-01-01'),
      password: 'alia',
    });

    await paul.save();

    // schema.statics
    const loggedUser = await User.login('muaddib', 'alia');

    // schema.methods
    console.log(`Is Birth Day? : ${loggedUser.isBirthDay()}`);

    console.log(loggedUser);

  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect()
  }
})();

