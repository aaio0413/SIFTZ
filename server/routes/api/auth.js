require('dotenv').config();

const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Passport:
const passport = require('../../passport');

// User model:
const User = require('../../models/user');

// Signup User:
router.post('/signup', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists.' });
    } else {

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    // Hash password before saving:
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(newUser.password, salt, (error, hash) => {
        if (error) throw error;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(error => console.log(error));
        });
      });
    }
  });
});

// Login user:
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found.' });
    }

    // Check password:
    bcrypt.compare(password, user.password).then(isMatch => {
      console.log('password:', password, 'user.password:', user.password)
      if (isMatch) {
        // Create jwt payload:
        const payload = {
          id: user.id,
          username: user.username
        }

        jwt.sign(
          payload,
          process.env.COOKIEKEY,
          {
            expiresIn: 31556926
          },
          (error, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
      } else {
        return res.status(400).json({ passwordincorrect: 'Incorrect password' });
      }
    });
  });
});

// Passport Authentication routes:
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/auth/google/callback',
  passport.authenticate('google',
  (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/my-siftz')
    } else {
      res.redirect('/my-siftz')
    }
  });

router.get('/instagram', passport.authenticate('instagram'));
router.get(
  '/auth/instagram/callback',
  passport.authenticate('instagram', {
    failureRedirect: '/login'
  }),
  (error, req, res) => {
    if (error) {
      res.redirect('https://lit-scrubland-24877.herokuapp.com/login');
    } else {
      res.redirect('https://lit-scrubland-24877.herokuapp.com/my-siftz');
    }
  });

router.get('/facebook', passport.authenticate('facebook'));
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  (error, req, res) => {
    if (error) {
      res.redirect('https://lit-scrubland-24877.herokuapp.com/login');
    } else {
      res.redirect('https://lit-scrubland-24877.herokuapp.com/my-siftz');
    }
  });


module.exports = router;
