// this is the structure of the data collection which stores the plans

import { Schema, model, Document } from 'mongoose';

export interface PlanInterface extends Document {
	id: number;
	providerName: string;
	type: string;
	contractLength: number | null;
	name: string;
	planName: string;
	minutes: string | number;
	data: string | number;
	messages: string | number;
	monthlyCost: number;
	upfrontCost: number;
	simCardFee: number;
	activationFee: number;
	storeCredit: number;
	planBonus: {
		title: string;
		description: string;
		terms: string | null;
		costSavings: number | null;
		bonusData: string | number | null;
		bonusMinutes: string | number | null;
		bonusMessages: string | number | null;
		disclaimer: string;
	};
	addOns: { title: string; text: string; cost: number }[] | null;
	logo: string;
	keywords: string[];
	slug: string;
	summary: string;
	additionalFeatures: { title: string; text: string }[];
	additionalMinuteInformation: { title: string; text: string }[];
	additionalDataInformation: {
		title: string;
		text: string;
	}[];
	additionalMessageInformation: { title: string; text: string }[];
}

// this will be our data base's data structure
const PlanSchema = new Schema<PlanInterface>({
	id: { type: Number, unique: true },
	providerName: String,
	type: String,
	contractLength: Number,
	name: String,
	planName: String,
	minutes: Schema.Types.Mixed,
	data: Schema.Types.Mixed,
	messages: Schema.Types.Mixed,
	monthlyCost: Number,
	upfrontCost: Number,
	simCardFee: Number,
	activationFee: Number,
	storeCredit: Number,
	planBonus: {
		title: String,
		description: String,
		terms: String,
		costSavings: Number,
		bonusData: Schema.Types.Mixed,
		bonusMinutes: Schema.Types.Mixed,
		bonusMessages: Schema.Types.Mixed,
		disclaimer: String
	},
	addOns: [{ title: String, text: String, cost: Number }],
	logo: String,
	keywords: [String],
	slug: String,
	summary: String,
	additionalFeatures: [{ title: String, text: String }],
	additionalMinuteInformation: [{ title: String, text: String }],
	additionalDataInformation: [
		{
			title: String,
			text: String
		}
	],
	additionalMessageInformation: [{ title: String, text: String }]
});

// export the new Schema so we could modify it using Node.js
export default model<PlanInterface>('Plan', PlanSchema);
