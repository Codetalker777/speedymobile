// this is the structure of phone schema which stores all of the phone specs

import mongoose from 'mongoose';

const { Schema } = mongoose;

// this will be our data base's data structure
const UserSearch = new Schema({
	searchType: String,
	data: Schema.Types.Mixed,
	minutes: Schema.Types.Mixed,
	messages: Schema.Types.Mixed,
	upFrontCost: Number,
	monthlyCost: Number,
	phone: [String],
	providers: [String],
	contractType: [String],
	operatingSystem: String
});

// export the new Schema so we could modify it using Node.js
export default mongoose.model('UserSearch', UserSearch);
