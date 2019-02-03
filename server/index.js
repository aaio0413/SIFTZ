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
const proxy = require("http-proxy-middleware");

const app = express();

// app.use(proxy("http://localhost:3000"));
// app.use(proxy("/api", { target: "http://localhost:3090/" }));

// app.use(express.static(__dirname + "/public"));
app.use(express.static(path.resolve(__dirname, "..", "..", "public")));

//cookie setUp

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIEKEY]
  })
);

// if (env.isDevelopment()) {
//   const proxy = require("express-http-proxy");
//   app.use("/*", proxy("http://localhost:3000"));
// } else {
//   // probably serve up build version in production
// }

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use("/api/auth", authRoutes);
app.use("/api/mySiftz", mySiftzRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("index");
});

console.log("this is process.env here", process.env.MONGO_DB_URL);
//connect mongoDB
mongodb.connect(process.env.MONGO_DB_URL, () => {
  console.log("connected mongoDB");
});

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
  console.log("app now listening for requests on port 3090");
});

process.on("SIGINT", function() {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit();
});
