const passport = require('koa-passport');

const User = require('./../../models/User');

class NotAuthorized extends Error {
  constructor() {
    super();
    this.status = 401;
  }
}

async function register(ctx, next) {
  const {login, password} = ctx.request.body;
  const user = new User({login, password,});

  await user.save();
  ctx.status = 201;
}

async function logout(ctx, next) {
  await ctx.logout();
  ctx.session = null;
  ctx.status = 200;
}

module.exports = {
  login: passport.authenticate('local', {successRedirect: '/home'/*, failureRedirect: '/login-error'*/}),
  home: (ctx, next) => {
    console.log('home');
    if (!ctx.isAuthenticated()) {
      throw new NotAuthorized()
    }

    ctx.body = ctx.state.user;
  },
  register,
  logout,
};
