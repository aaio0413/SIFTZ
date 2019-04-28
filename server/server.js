require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require("cors");
const cookieSession = require("cookie-session");
const express = require('express');
const mongoose = require('mongoose');
const passport = require('./passport');
const path = require("path");
const historyApiFallback = require('connect-history-api-fallback');

// Port:
const port = process.env.PORT || 8080;

// Routes:
const auth = require('./routes/api/auth');
const siftz = require('./routes/api/siftz');

const app = express();

// Middleware:
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(historyApiFallback({
  verbose: false
}));

// Cookie session:
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIEKEY]
  })
);

// MongoDB:
const db = process.env.MONGO_DB_URL;

// Connect to MongoDB:
mongoose.connect(db, {
  useNewUrlParser: true
}).then(() => console.log("MongoDB connected."))
.catch(error => console.log(error));

// Static file declaration:
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes:
app.use('/api/auth', auth);
app.use('/api/my-siftz', siftz);

// Passport:
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Serve static assets if in production:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}

app.listen(port, () => console.log(`Server is running on port: ${port}`));
