
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'email' // not necessary, DEFAULT
	},
	function(email, password, done) {
		User.findOne({ email }, (error, user) => {
			if (error) {
				return done(error)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect email' })
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	}
)

module.exports = strategy
