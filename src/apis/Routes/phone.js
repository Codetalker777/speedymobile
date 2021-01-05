// This files holds the api call that returns the requested phone searched by name

// router set up for phones
import express from 'express';

// phone schema import
import Phone from '../Schemas/phone';

const phoneRoute = express.Router();

// this function searches for a specific phone in a database and returns the phone or returns nothing.
phoneRoute.get('/getPhone', (req, res) => {
	Phone.find({ name: req.query.name }, (err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data });
	});
});

export default phoneRoute;
