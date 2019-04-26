require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('./passport');

const users = require('./routes/api/users')

const app = express();

// Middleware:
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

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
app.use('/api/users', users);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server is running on port: ${port}`));
