require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const LocalStrategy = require("passport-local");
const InstagramStrategy = require("passport-Instagram");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user-model.js");

passport.serializeUser((user, done) => {
  console.log("# serializing User...");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("# Deserializing User...");
  User.findById(id).then(user => {
    done(null, user);
  });
});
// Strategy ................................................................
//Create local strategy
const localOptions = { usernameField: "username" };
const localLogin = new LocalStrategy(localOptions, function(
  username,
  password,
  done
) {
  console.log("# Searching the Database ..");
  console.log(username);
  User.findOne({ username }, (err, user) => {
    if (err) return done(err, false, { message: "DB_error" });
    if (!user) {
      return done(null, false, { message: "No_User" });
    } else
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err, false, { message: "Internal_error" });
        if (!isMatch) {
          console.log("# NO MATCH: Please provide Valid Credentials");
          return done(null, false, { message: "Password_Error" });
        } else {
          console.log(
            "# User found in the database,\n Forwading the details .."
          );
          return done(null, user, { message: "success" });
        }
      });
  });
});

passport.use(localLogin);
//......................................................................................##
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect" //this is for local

      // callbackURL: "https://birdiez.herokuapp.com/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      //   console.log("callback is fired");
      //   console.log("where is ID?", profile);
      //check if user is already in our database
      const email = profile.emails[0].value;
      User.findOne({ email: email }).then(userExsist => {
        if (userExsist) {
          console.log("user found", userExsist);
          done(null, userExsist);
        } else {
          new User({
            email: email,
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
//......................................................................................##

passport.use(
  new InstagramStrategy(
    {
      callbackURL: "/auth/instagram/redirect", //this is for local
      clientID: process.env.INSTAGRAM_CLIENT,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
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

//......................................................................................##

passport.use(
  new FacebookStrategy(
    {
      //option for strategy

      callbackURL: "/auth/facebook/redirect",
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET
      // callbackURL: "https://shiftz-jp.herokuapp.com/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      //   console.log("callback is fired");
      //   console.log("where is ID?", profile);
      //check if user is already in our database

      User.findOne({ googleIdemail: profile.id }).then(userExsist => {
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
