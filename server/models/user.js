const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const UserSchema = mongoose.Schema({

  email: { type: String, unique: true },
	googleId: { type: String, required: false },
	username: { type: String, unique: true, required: false },
	password: { type: String, unique: false, required: false }
})

// Create reference to User & export
module.exports = users = mongoose.model('users',UserSchema)
