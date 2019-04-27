const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define userSchema:
const UserSchema = mongoose.Schema({

  email: { type: String, unique: true },
	googleId: { type: String, required: false },
	username: { type: String, unique: true, required: false },
	password: { type: String, unique: false, required: false }
});

// Define schema methods:
UserSchema.methods = {
	checkPassword: (inputPassword) => {
		return bcrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10);
	}
}

// Create reference to User & export
module.exports = users = mongoose.model('users',UserSchema)
