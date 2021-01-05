// this is the structure of the subscribe schemma which stores all of the subscriber emails

import mongoose from 'mongoose';

const { Schema } = mongoose;

// this will be our data base's data structure
const SubscribleSchema = new Schema({
	email: { type: String, unique: true }
});

// export the new Schema so we could modify it using Node.js
export default mongoose.model('Subscribe', SubscribleSchema);
