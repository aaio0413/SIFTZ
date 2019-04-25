const router = require("express").Router();
const passport = require("passport");


router.get("/login", (req, res) => {
  //
  console.log('login route hit');
  res.render("newLogin", { user: req.user });
});

router.get("/signup", (req, res) => {
  //
  console.log('sign up route hit');
  res.render("signUp");
});

// Auth logout
router.get("/logout", (req, res) => {
  //
  console.log('logging out hit');
  res.send("logging out");
  res.redirect('/');
});

// Passport Authentication routes:
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/instagram", passport.authenticate("instagram"));
router.get("/facebook", passport.authenticate("facebook"));

//auth callback from google
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureFlash: true
    // successRedirect: "https://shiftz-jp.herokuapp.com/mySiftz/"
  }),
  (err, req, res, next) => {
    if (err.name === "TokenError") {
      res.redirect("https://lit-scrubland-24877.herokuapp.com/login"); // for local
    } else {
      // Handle other errors here
    }
  },
  (req, res) => {
    console.log("request user from google", req);
    console.log("response:" + res)
    const userInfo = {
      username: req.user.username
    };
    // res.send(userInfo);
    res.redirect("https://lit-scrubland-24877.herokuapp.com/mySiftz/");
    //res.send(req.user);
  }
);

router.get(
  "/instagram/redirect",
  passport.authenticate("instagram", { failureRedirect: "/login" }),
  (err, req, res, next) => {
    if (err.name === "TokenError") {
      res.redirect("https://lit-scrubland-24877.herokuapp.com/login"); // for local
    } else {
      // Handle other errors here
    }
  },
  (req, res) => {
    console.log('request:' + req)
    console.log('response:' + res)
    res.redirect("https://lit-scrubland-24877.herokuapp.com/mySiftz");
  }
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (err, req, res, next) => {
    if (err.name === "TokenError") {
      res.redirect("https://lit-scrubland-24877.herokuapp.com/login"); // for local
    } else {
      // Handle other errors here
    }
  },
  (req, res) => {
    console.log('request:' + req)
    console.log('response:' + res)
    res.redirect("https://lit-scrubland-24877.herokuapp.com/mySiftz");
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
