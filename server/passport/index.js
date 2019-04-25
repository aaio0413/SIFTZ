const passport = require('passport');
const FacebookStrategy = required('./facebookStrategy');
const GoogleStrategy = required('./googleStrategy');
const InstagramStrategy = required('./instagramStrategy');
const LocalStrategy = required('./localStrategy');
const User = require('../models/user.js');

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
passport.use(GoogleStratgey);
passport.use(InstagramStrategy);
passport.use(LocalStrategy);

module.exports = passport
