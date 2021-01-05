import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import uniqid from 'uniqid';

const { Schema } = mongoose;

// this will be our data base's data structure
const User = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	birthDate: { type: Date, required: false },
	gender: String,
	postalCode: String,
	address: String,
	city: String,
	province: String,
	verified: { type: Boolean, default: false },
	locked: { type: Boolean, default: false },
	retry: { type: Number, default: 0 },
	email: { type: String, required: true, unique: true },
	password: String,
	uniqueID: String,
	phonePlans: String
});

User.methods.setUniqueID = function setUniqueID() {
	this.uniqueID = uniqid();
};

User.methods.setPassword = function setPassword(input) {
	this.password = bcrypt.hashSync(input, 10);
};

User.statics.setPasswordExternal = function newPassword(input) {
	return bcrypt.hashSync(input, 10);
};

User.methods.validatePassword = function validatePassword(input) {
	return bcrypt.compareSync(input, this.password);
};

User.methods.generateJWT = function generateAuthToken() {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			email: this.email,
			uniqueID: this.uniqueID,
			firstName: this.firstName,
			lastName: this.lastName,
			exp: parseInt(expirationDate.getTime() / 1000, 10)
		},
		'secret'
	);
};

User.methods.toAuthJSON = function getAuthToken() {
	return {
		email: this.email,
		firstName: this.firstName,
		lastName: this.lastName,
		token: this.generateJWT()
	};
};

// export the new Schema so we could modify it using Node.js
export default mongoose.model('User', User);
