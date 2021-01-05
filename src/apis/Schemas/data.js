// this is the structure of the data collection which stores the plans

import mongoose from 'mongoose';

const { Schema } = mongoose;

// this will be our data base's data structure
const DataSchema = new Schema({
	id: { type: Number, unique: true },
	providerName: String,
	type: String,
	contractLength: Number,
	name: String,
	minutes: Schema.Types.Mixed,
	additionalMinuteInfo: [String],
	data: Schema.Types.Mixed,
	additionalDataInfo: [String],
	messages: Schema.Types.Mixed,
	additionalMessageInfo: [String],
	monthlyCost: Number,
	upfrontCost: Number,
	simCardFee: Number,
	activationFee: Number,
	storeCredit: Number,
	additionalInfo: String,
	phone: String,
	phoneType: String,
	features: [String],
	addOns: [{ title: String, text: String, cost: Number }],
	extra: [{ name: String, body: String, list: [String] }],
	categories: [{ name: String, body: String, list: [String] }],
	logo: String,
	image: [String],
	ranking: Number,
	color: [{ colorName: String, color: String }],
	storage: [{ size: String, cost: Number }],
	myTab: { storage: { size: String, min: Number, max: Number } },
	coverage: String,
	manufacturer: String
});

// export the new Schema so we could modify it using Node.js
export default mongoose.model('Data', DataSchema);