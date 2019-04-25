const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({

  email: { type: String, unique: true },
	firstName: { type: String, unique: false },
	googleId: { type: String, required: false },
	lastName: { type: String, unique: false },
	local: {
		username: { type: String, unique: false, required: false },
		password: { type: String, unique: false, required: false }
	}
})

// Define schema methods
userSchema.methods = {
	validPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.local.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	if (!this.local.password) {
		console.log('No password provided')
		next()
	} else {
		this.local.password = this.hashPassword(this.local.password)
		next()
	}
	// this.password = this.hashPassword(this.password)
	// next()
})

// Create reference to User & export
const User = mongoose.model('User', userSchema)
module.exports = User
