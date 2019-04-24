const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const InstagramStrategy = require("passport-instagram");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user.js");

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
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://lit-scrubland-24877.herokuapp.com/api/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(userExist => {
        if (userExist) {
          console.log("user found", userExist);
          done(null, userExist);
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
passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.INSTAGRAM_CLIENT,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: "https://lit-scrubland-24877.herokuapp.com/api/auth/instagram/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(userExist => {
        if (userExist) {
          console.log("user found", userExist);
          done(null, userExist);
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
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: "https://lit-scrubland-24877.herokuapp.com/api/auth/facebook/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(userExist => {
        if (userExist) {
          console.log("user found", userExist);
          done(null, userExist);
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
