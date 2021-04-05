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

const local = new LocalStrategy(
  {usernameField: 'login'}, // `username` by default

  async (login, password, done) => {
    const user = await User.login(login, password);
    if (user) {
      return done(null, user)
    }
    done(new Unauthorized());
  },
);

passport.use(local);

module.exports = passport;
