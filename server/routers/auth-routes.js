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
router.get("/instagram", passport.authenticate("instagram"));
router.get("/facebook", passport.authenticate("facebook"));
//auth callback from google
// router.get(
//   "/google/redirect",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//     failureFlash: true,
//     successRedirect: "https://shiftz-jp.herokuapp.com/mySiftz"
//   }),
//   (err, req, res, next) => {
//     if (err.name === "TokenError") {
//       res.redirect("https://shiftz-jp.herokuapp.com/login"); // for local
//     } else {
//       // Handle other errors here
//     }
//   },
//   (req, res) => {
//     res.redirect("https://shiftz-jp.herokuapp.com/mySiftz");
//     // res.redirect("http://localhost:3000/mySiftz"); //local
//     //res.send(req.user);
//   }
// );

router.get("/google/redirect", function(req, res, next) {
  passport.authenticate("google", function(err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("https://shiftz-jp.herokuapp.com/mySiftz");
    });
  })(req, res, next);
});

router.get(
  "/instagram/redirect",
  passport.authenticate("instagram", { failureRedirect: "/login" }),
  (err, req, res, next) => {
    if (err.name === "TokenError") {
      res.redirect("https://shiftz-jp.herokuapp.com/login"); // for local
    } else {
      // Handle other errors here
    }
  },
  (req, res) => {
    res.redirect("https://shiftz-jp.herokuapp.com/mySiftz");
    // res.redirect("http://localhost:3000/mySiftz"); //local
    //res.send(req.user);
  }
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (err, req, res, next) => {
    if (err.name === "TokenError") {
      res.redirect("https://shiftz-jp.herokuapp.com/login"); // for local
    } else {
      // Handle other errors here
    }
  },
  (req, res) => {
    res.redirect("https://shiftz-jp.herokuapp.com/mySiftz");
    // res.redirect("http://localhost:3000/mySiftz"); //local
    //res.send(req.user);
  }
);

module.exports = router;

// facebook SDK snipet

{
  /* <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script> */
}
