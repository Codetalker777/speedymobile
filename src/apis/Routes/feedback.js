// env variables
import express from 'express';
import { config } from 'dotenv';
import Feedback from '../Schemas/feedback';
// Sets up a express js router

config();

const feedbackRoute = express.Router();

feedbackRoute.post('/feedback', (req, res) => {
	const feedback = new Feedback();

	const { valueNextPurchase, somethingMissing, recommend, development } = req.body;
	feedback.valueNextPurchase = valueNextPurchase;
	feedback.somethingMissing = somethingMissing;
	feedback.recommend = recommend;
	feedback.development = development;

	feedback.save(err => {
		if (err) {
			return res.json({ success: false, error: err });
		}
		return res.json({ success: true });
	});
});

export default feedbackRoute;
