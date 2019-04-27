require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const passport = require('./passport');
const path = require("path");
const historyApiFallback = require('connect-history-api-fallback');

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

app.use(cors());

// MongoDB:
const db = process.env.MONGO_DB_URL;

// Connect to MongoDB:
mongoose.connect(db, {
  useNewUrlParser: true
}).then(() => console.log("MongoDB connected."))
.catch(error => console.log(error));

// Passport:
app.use(passport.initialize());
app.use(passport.session());

// Routes:
app.use('/api/auth', auth);
app.use('/api/my-siftz', siftz);

// Serve static assets if in production:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    res.end();
  });
}

app.use(historyApiFallback({
  verbose: false
}));

// Static file declaration:
app.use(express.static(path.join(__dirname, '../client/build')));

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server is running on port: ${port}`));
