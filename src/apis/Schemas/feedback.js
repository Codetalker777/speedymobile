// this is the structure of the subscribe schemma which stores all of the subscriber emails

import mongoose from 'mongoose';

const { Schema } = mongoose;

// this will be our data base's data structure
const FeedbackSchema = new Schema({
	valueNextPurchase: String,
	somethingMissing: String,
	recommend: String,
	development: String,
	time: { type: Date, default: Date.now }
});

// export the new Schema so we could modify it using Node.js
export default mongoose.model('Feedback', FeedbackSchema);
