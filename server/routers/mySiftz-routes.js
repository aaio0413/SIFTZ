const router = require("express").Router();
const mongodb = require("mongoose");

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user is not logged in
    res.redirect("/");
  } else {
    next();
  }
};

// router.get("/", authCheck, (req, res) => {
//   console.log(req.user);
//   res.render("mySiftz", { userName: req.user.userName });
// });

router.get("/allNightSongs", authCheck, (req, res) => {
  console.log("this is request", req);
  const data = mongodb.songs.findAll({ "Night(pm6~am5)": 1 });
  // res.send(data);
  console.log("trying to get", data);
});

module.exports = router;
