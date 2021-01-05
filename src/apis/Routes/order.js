// This file processes imcoming orders and sends a confirmation email once the order has been sucessfully processed

// environment variables
// router set up
import express from 'express';

// schema import

import { config } from 'dotenv';
import emailingService from '../Services/emailingService';
import Order from '../Schemas/order';

config();

const orderRoute = express.Router();

// this function accepts a order and then places into the database. After that it sends a confirmation email
orderRoute.post('/placeOrder', async (req, res) => {
	const order = new Order();

	// input variables
	const {
		data,
		cart,
		shippingType,
		shippingCost,
		firstName,
		lastName,
		email,
		phoneNumber,
		address,
		city,
		province,
		postalCode,
		billingFirstName,
		billingLastName,
		billingAddress,
		billingCity,
		billingPostalCode,
		billingProvince
	} = req.body;

	// setting input variables to the order cart
	order.data = data;
	order.cart = cart;
	order.shippingType = shippingType;
	order.shippingCost = shippingCost;
	order.firstName = firstName;
	order.lastName = lastName;
	order.email = email;
	order.phoneNumber = phoneNumber;
	order.address = address;
	order.city = city;
	order.province = province;
	order.postalCode = postalCode;
	order.billingFirstName = billingFirstName;
	order.billingLastName = billingLastName;
	order.billingAddress = billingAddress;
	order.billingCity = billingCity;
	order.billingPostalCode = billingPostalCode;
	order.billingProvince = billingProvince;

	// saving order to database
	order.save(err => {
		if (err) return res.json({ success: false, error: err });

		// email content
		const mailOptions = {
			from: 'speedymobile@gmail.com',
			to: email,
			subject: 'Order Placed',
			html:
				'<div><p>Thank for placing an Order. Currently we are running a market study but stayed tuned for more details</p></div>'
		};

		const response = emailingService.sendMail(mailOptions);
		if (response) {
			return res.json({ success: true });
		}
		return res.json({ success: true, error: 'Email failure' });
	});
});

export default orderRoute;
