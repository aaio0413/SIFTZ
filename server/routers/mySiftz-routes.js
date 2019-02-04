const router = require("express").Router();
const mongodb = require("mongoose");

// const authCheck = (req, res, next) => {
//   if (!req.user) {
//     //if user is not logged in
//     res.redirect("http://localhost:3000/login");
//   } else {
//     next();
//   }
// };

// router.get("/", authCheck, (req, res) => {
//   console.log(req.user);
//   res.render("mySiftz", { userName: req.user.userName });
// });

//connect mongoDB
// var db = mongodb.connect(process.env.MONGO_DB_URL);

// console.log(db);
// db = connect(process.env.MONGO_DB_URL)

router.get("/allNightSongs", (req, res) => {
  // console.log(req.user);
  console.log("response", res);
});

router.post("/allNightSongs", (req, res) => {
  // console.log(req.user);
  console.log("response", res);
});

module.exports = router;
