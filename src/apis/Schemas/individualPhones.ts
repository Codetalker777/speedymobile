// this is the structure of the data collection which stores the plans

import { Schema, model, Document } from 'mongoose';

export interface IndividualPhoneInterface extends Document {
	color: string[];
	name: string;
	manufacturer: string;
	operatingSystem: string;
	storage: string[];
	keywords?: string[];
	cost: Record<string, number>;
	phoneSpecs: string[];
	images: string[];
	slug: string;
	summary: string;
}

// this will be our data base's data structure
const individualPhone = new Schema<IndividualPhoneInterface>({
	color: [String],
	name: String,
	manufacturer: String,
	operatingSystem: String,
	storage: [String],
	keywords: [String],
	cost: {},
	phoneSpecs: [String],
	images: [String],
	slug: String,
	summary: String
});

// export the new Schema so we could modify it using Node.js
export default model<IndividualPhoneInterface>('IndividualPhone', individualPhone);
