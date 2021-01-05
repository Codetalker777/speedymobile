import mongoose from 'mongoose';
import uniqid from 'uniqid';

const { Schema } = mongoose;

// this will be our data base's data structure
const verifyUser = new Schema({
	uniqueID: String,
	userID: String,
	expiryDate: Date,
	newUser: Boolean,
	resetPassword: Boolean
});

verifyUser.methods.setExpiryDate = function setExpiryDate() {
	const expiry = new Date();
	expiry.setDate(expiry.getDate() + 1);
	this.expiryDate = expiry;
};

verifyUser.methods.setUniqueID = function setUniqueID() {
	this.uniqueID = uniqid();
};

// export the new Schema so we could modify it using Node.js
export default mongoose.model('verifyUser', verifyUser);
