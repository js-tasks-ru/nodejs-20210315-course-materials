const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const User = require('./../../models/User');

class Unauthorized extends Error {
  constructor() {
    super('Unauthorized');
    this.status = 401;
    this.expose = true;
  }
}

// serialize user model to session
passport.serializeUser(function (user, done) {
  console.log("serializeUser");
  done(null, user)
  // done(null, user.id);
});

// deserialize user model from session
passport.deserializeUser(async function (user, done) {
  console.log("deserializeUser");
  // const user = await User.findById(userId)
  done(null, user)
});

const local = new LocalStrategy({usernameField: 'login'},
  async (login, password, done) => {
  console.log('LocalStrategy');
    const user = await User.login(login, password);
    if (user) {
      return done(null, user)
    }
    done(new Unauthorized());
  },);

passport.use(local);

module.exports = passport;
