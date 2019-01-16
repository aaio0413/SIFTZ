require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth-routes");
const myShiftzRoutes = require("./routes/myShiftz-routes");
const path = require("path");
const passportSetup = require("./config/passport-setup");
const mongodb = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

// set view engine

app.use(express.static(__dirname + "/public"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

//cookie setUp

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIEKEY]
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use("/auth", authRoutes);
app.use("/myShiftz", myShiftzRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("index");
});

console.log("this is process.env here", process.env.MONGO_DB_URL);
//connect mongoDB
mongodb.connect(
  process.env.MONGO_DB_URL,
  () => {
    console.log("connected mongoDB");
  }
);

// app.get("*", (req, res) => {
//   res.render("static" + req.url, function(err, html) {
//     if (!err) {
//       return res.send(html);
//     }
//     // Not super elegant the `indexOf` but useful
//     if (err.message.indexOf("Failed to lookup view") !== -1) {
//       return res.render("root/error");
//     }
//     throw err;
//   });
// });

app.listen(process.env.PORT || 3000, () => {
  console.log("app now listening for requests on port 3000");
});
