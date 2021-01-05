import { config } from 'dotenv';
import express from 'express';
import IndividualPhones from '../Schemas/individualPhones';

config();

/**
 * Router for phones
 */
const IndividualPhonesRoute = express.Router();

IndividualPhonesRoute.post('/getListPhones', (req, res) => {
	IndividualPhones.find({}, function result(error, phones) {
		res.send(phones);
	});
});

IndividualPhonesRoute.post('/getSinglePhone', (req, res) => {
	const { phoneName } = req.body;
	try {
		const slug = phoneName.toString();
		IndividualPhones.find({ slug }, function result(error, phone) {
			if (error) {
				res.send({ success: false, error });
			} else {
				res.send(phone[0]);
			}
		});
	} catch (error) {
		res.status(422).json({ success: false, error: error.message });
	}
});

IndividualPhonesRoute.post('/getMultiPhone', (req, res) => {
	const { phoneNames } = req.body;
	try {
		if (!Array.isArray(phoneNames) && typeof phoneNames[0] !== 'string')
			throw new Error('PhoneNames must be an array of phones');
		IndividualPhones.find({ slug: { $in: phoneNames } }, function result(error, phones) {
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

IndividualPhonesRoute.post('/navBarSearch', (req, res) => {
	IndividualPhones.find({})
		.sort({ manufacturer: 1 })
		.exec(function returnPhones(err, phones) {
			res.send({ success: true, data: phones });
		});
});

export default IndividualPhonesRoute;
