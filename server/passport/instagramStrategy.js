const FacebookStrategy = require("passport-instagram");
const User = require("../models/user.js");

const strategy = new FacebookStrategy(
  {
    clientID: process.env.INSTAGRAM_CLIENT,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: "/auth/instagram/redirect"
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }, (error, user) => {
      if (error) {
        console.log(error);
        return done(null, user);
      }

      if (user) {
        return done(null, user);
      } else {
        console.log('id:', id, 'profile:', profile);

        const newInstagramUser = new User({
          username: profile.displayName,
          googleId: profile.id
        })

        // Save user:
        newFacebookUser.save((error, newUser) => {
          if (error) {
            console.log(error);
            return done(null, newUser);
          }
        });
      }
    });
  });

module.exports = strategy;
