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

// app.use(proxy("http://localhost:3000"));
// app.use(proxy("/api", { target: "http://localhost:3090/" }));

app.use(bodyParser.json({ type: "*/*" })); // Type indicates ALL header types OK
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/public"));
// app.use(express.static(path.resolve(__dirname, "..", "..", "public")));

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
app.use(cors());

//cors
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// set up routes
app.use("/api/auth", authRoutes);
app.use("/api/mySiftz", mySiftzRoutes);

// console.log("this is process.env here", process.env.MONGO_DB_URL);
//connect mongoDB
mongodb.connect(process.env.MONGO_DB_URL, () => {
  console.log("connected mongoDB");
});

// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function callback() {

// }

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
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
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
  const port = process.env.PORT || 3090;
  console.log("app now listening for requests on port", port);
});

process.on("SIGINT", function() {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit();
});

//fingers crossed commmoooon
