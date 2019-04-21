require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user-model.js");
const passportSetup = require("../config/passport-setup");
const localStrategy = passport.authenticate("local", { session: true }); // Local Strategy
const googleauth = passport.authenticate("google", { scope: ["Email"] }); // google Strategy

const signup = (req, res, done) => {
  const { username, password, email, phone } = req.body;
  console.log("# \n # received-data from the Form: \n", req.body);
  if (!username || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }
  User.findOne({ username: username }, function(err, existingUser) {
    if (err) return done(null, false);
    //If yes, return error
    if (existingUser) {
      console.log("This is existing user, go to login or resest password");
      return res.status(422).send({ error: "# \n # Username already exists!" });
    }
    const user = new User({
      username,
      password,
      email,
      phone
      // add the rest of the info from the form and save it to its proper place in the schema
    });
    console.log("# \n # Saving Data to the Database ..... ");
    user.save(function(err) {
      // if (err) return next(err);
      // //If no, respond to request indicating user was created
      // res.json({ token: tokenForUser(user) });
      if (err)
        return res.json(400, {
          error: 1,
          msg: "some error"
        });
      else {
        console.log("Newly created User", user);
        return done(null, user);
      }
    });
  });
};

const LOGIN_REDIRECT =
  process.env.NODE_ENV === "production"
    ? "https://shiftz-jp.herokuapp.com/mySiftz"
    : "http://localhost:3000/mySiftz";

// Login Route ##########################################################
router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: info.message });
    }
    // See passport js Document
    //note that authenticate() is called from within the route handler,
    //rather than being used as route middleware
    //This gives the callback access to the req and res objects through closure
    //now it becomes necessary to establsih a session by calling req.login() and send a response
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json(200, {
        msg: "OK"
      });
    });
  })(req, res, next);
});

// SignUP ROute #############################################################

router.post("/signup", signup, function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: info.message });
    }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json(200, {
        msg: "OK"
      });
    });
  })(req, res, next);
});

// LOGOOUT Route #############################################################
router.get("/logout", (req, res) => {
  req.logout();
  if (process.env.NODE_ENV === "production")
    // For Heroku
    res.redirect("https://shiftz-jp.herokuapp.com/login");
  // For Local Host
  else res.redirect("http://localhost:3000/login");
});

// Google auth Route ##########################################################
router.get("/google", googleauth);

//auth callback from google
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  if (process.env.NODE_ENV === "production")
    res.redirect("https://shiftz-jp.herokuapp.com/mySiftz");
  else res.redirect("http://localhost:3000/mySiftz");
});

// Facebook Auth route #########################################################
router.get("/facebook", passport.authenticate("facebook"));

// auth callback from facebook
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (err, req, res, next) => {
    if (err.name === "TokenError") {
      if (process.env.NODE_ENV === "production")
        // For Heroku
        res.redirect("https://shiftz-jp.herokuapp.com/login");
      // For Local Host
      else res.redirect("http://localhost:3000/login");
    } else {
      // Handle other errors here
    }
  },
  (req, res) => {
    if (process.env.NODE_ENV === "production")
      // For Heroku
      res.redirect("https://shiftz-jp.herokuapp.com/mySiftz");
    // For Local Host
    else res.redirect("http://localhost:3000/mySiftz");
  }
);

// Instagram Auth route ##########################################################

router.get("/instagram", passport.authenticate("instagram"));
router.get(
  "/instagram/redirect",
  passport.authenticate("instagram", { failureRedirect: "/login" }),
  (err, req, res, next) => {
    if (err.name === "TokenError") {
      if (process.env.NODE_ENV === "production")
        // For Heroku
        res.redirect("https://shiftz-jp.herokuapp.com/login");
      // For Local Host
      else res.redirect("http://localhost:3000/login");
    } else {
    }
  },
  (req, res) => {
    if (process.env.NODE_ENV === "production")
      // For Heroku
      res.redirect("https://shiftz-jp.herokuapp.com/mySiftz");
    // For Local Host
    else res.redirect("http://localhost:3000/mySiftz");
  }
);

//################################################################################

module.exports = router;
