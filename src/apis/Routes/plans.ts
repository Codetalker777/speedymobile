import { config } from 'dotenv';
import express from 'express';
import Plans from '../Schemas/plans';

config();

/**
 * Router for plans
 */
const PlanRoute = express.Router();

PlanRoute.post('/getListPlans', (req, res) => {
	Plans.find({}, function result(error, plans) {
		res.send(plans);
	});
});

PlanRoute.post('/getMultiPlans', (req, res) => {
	const { planNames } = req.body;
	try {
		if (!Array.isArray(planNames) && typeof planNames[0] !== 'string')
			throw new Error('PhoneNames must be an array of phones');
		Plans.find({ slug: { $in: planNames } }, function result(error, phones) {
			if (error) {
				res.send({ success: false, error });
			} else {
				res.send(phones);
			}
		});
	} catch (error) {
		res.status(422).json({ success: false, error: error.message });
	}
});

PlanRoute.post('/getSinglePlan', (req, res) => {
	const { planName } = req.body;
	try {
		const slug = planName?.toString();
		Plans.find({ slug }, function result(error, plan) {
			if (error) {
				res.send({ success: false, error });
			} else {
				res.send(plan[0]);
			}
		});
	} catch (error) {
		res.status(422).json({ success: false, error: error.message });
	}
});

export default PlanRoute;
