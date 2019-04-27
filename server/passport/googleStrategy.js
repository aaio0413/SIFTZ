const GoogleStrategy = require("passport-google-oauth20");
const User = require('../models/user');

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://lit-scrubland-24877.herokuapp.com/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }, (error, user) => {
      if (error) {
        return done(null, user);
      }

      if (user) {
        return done(null, user);
      } else {

        const newGoogleUser = new User({
          googleId: profile.id,
          email: profile.email
        })

        // Save user:
        newGoogleUser.save((error, newUser) => {
          if (error) {
            console.log(error);
            return done(null, newUser);
          }
        })
      }
    });
  });

module.exports = strategy;
