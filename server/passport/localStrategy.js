
const User = require('../db/models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		User.findOne({ username: username }, (error, user) => {
			if (error) {
				return done(error)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, userMatch)
		})
	}
)

module.exports = strategy
