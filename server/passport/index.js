const passport = require('passport');
const FacebookStrategy = require('./facebookStrategy');
const GoogleStrategy = require('./googleStrategy');
const JwtStrategy = require('./JwtStrategy');
//const InstagramStrategy = require('./instagramStrategy');
const LocalStrategy = require('./localStrategy');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  console.log('Serialize:', user);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// ==== Register Strategies ====
passport.use(FacebookStrategy);
passport.use(GoogleStrategy);
//passport.use(InstagramStrategy);
passport.use(JwtStrategy);
passport.use(LocalStrategy);

module.exports = passport
