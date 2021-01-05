// this is the structure of phone schema which stores all of the phone specs

import mongoose from 'mongoose';

const { Schema } = mongoose;

// this will be our data base's data structure
const PhoneSchema = new Schema({
	color: String,
	name: String,
	version: String,
	screenSize: String,
	screenRes: String,
	battery: String,
	storage: String,
	camera: String,
	frontCamera: String,
	CPU: String,
	GPU: String,
	weight: String,
	memory: String,
	externalStorage: String,
	video: String
});

// export the new Schema so we could modify it using Node.js
export default mongoose.model('Phone', PhoneSchema);
