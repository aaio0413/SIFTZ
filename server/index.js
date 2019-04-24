require("dotenv").config();

const authRoutes = require("./routers/auth-routes");
const mySiftzRoutes = require("./routers/mySiftz-routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const express = require("express");
const mongodb = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const path = require("path");

const app = express();
const port = process.env.PORT || 3090;

// Type indicates ALL header types OK
app.use(bodyParser.json({ type: "*/*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie setup:
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIEKEY]
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Static file declaration:
app.use(express.static(path.join(__dirname, '../client/build')));

// set up routes
app.use("/api/auth", authRoutes);
app.use("/api/mySiftz", mySiftzRoutes);

// console.log("this is process.env here", process.env.MONGO_DB_URL);
//connect mongoDB
mongodb.connect(process.env.MONGO_DB_URL, () => {
  console.log("connected mongoDB");
});

// Production:
if (process.env.NODE_ENV === "production") {
  app.use(express.static("..client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Start server:
app.listen(port, () => {
  console.log("app now listening for requests on port", port);
});

process.on("SIGINT", function() {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit();
});
