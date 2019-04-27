
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'passwd' // not necessary, DEFAULT
	},
	function(email, password, done) {
		User.findOne({ email }, (error, user) => {
			if (error) {
				console.log(error)
				return done(error)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect email' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	});

module.exports = strategy
