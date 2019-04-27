require('dotenv').config();

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require('../models/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.COOKIEKEY;

const strategy = new JwtStrategy(opts, (jwt_payload, done) => {
  User.findById(jwt_payload.id).then(user => {
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  })
  .catch(error => console.log(error));
})

module.exports = strategy;