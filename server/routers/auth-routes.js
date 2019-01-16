const router = require("express").Router();
const passport = require("passport");

// auth login
// router.get("/login", (req, res) => {
//   res.render("login", { user: req.user });
// });

router.get("/login", (req, res) => {
  res.render("newLogin", { user: req.user });
});

router.get("/signup", (req, res) => {
  res.render("signUp");
});

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  res.send("logging out");
});

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"] //add whatever you want from user
  })
);

//auth callback from google
router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    //res.send(req.user);
    res.redirect("/myShiftz");
  }
);

module.exports = router;
