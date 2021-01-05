// this is the structure of the data collection which stores the plans

import { Schema, model, Document } from 'mongoose';

export interface FeaturedPlanInterface extends Document {
	id: number;
}

// this will be our data base's data structure
const featuredPlan = new Schema({
	id: { type: Number, unique: true }
});

// export the new Schema so we could modify it using Node.js
export default model<FeaturedPlanInterface>('FeaturedPlan', featuredPlan);
