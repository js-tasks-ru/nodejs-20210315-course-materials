const passport = require('koa-passport');
const {local, github, jwt} = require("./strategies");

passport.use(local);
passport.use(github);
passport.use(jwt);

module.exports = passport;
