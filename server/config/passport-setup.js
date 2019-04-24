const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const InstagramStrategy = require("passport-instagram");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user-model.js");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //option for strategy

      // callbackURL: "http://localhost:3090/api/auth/google/redirect", //this is for local
      clientID: '560812597305-qf5ndofd5mkk5cprt8fntu0rud73ud4q.apps.googleusercontent.com',
      clientSecret: 'uRepZKZFxacnsxl4Ftg56bln',
      callbackURL: "https://lit-scrubland-24877.herokuapp.com/api/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {

      User.findOne({ googleId: profile.id }).then(userExsist => {
        if (userExsist) {
          console.log("user found", userExsist);
          done(null, userExsist);
        } else {
          new User({
            userName: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log("new user created", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
