require("dotenv").config();
const express = require("express");
const authRoutes = require("./routers/auth-routes");
const mySiftzRoutes = require("./routers/mySiftz-routes");
const path = require("path");
const morgan = require("morgan");
const passportSetup = require("./config/passport-setup");
const mongodb = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(bodyParser.json({ type: "*/*" })); // Type indicates ALL header types OK
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// set up routes
app.use("/api/auth", authRoutes);
app.use("/api/mySiftz", mySiftzRoutes);
app.use(express.static(path.resolve(__dirname, "../client")));
// create home route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

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
app.use(cors());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//connect mongoDB
mongodb.connect(
  process.env.MONGO_DB_URL,
  { useNewUrlParser: true, useFindAndModify: false },
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
if (process.env.NODE_ENV === "test") app.use(morgan(() => null));
else
  app.use(
    morgan(
      "API Request (port " +
        this.port +
        "): :method :url :status :response-time ms - :res[content-length]"
    )
  );

app.listen(process.env.PORT || 3090, () => {
  // const port = app.address().port;
  console.log(
    "app now listening for requests on port 3090 || process.env.PORT"
  );
});

process.on("SIGINT", function() {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit();
});
