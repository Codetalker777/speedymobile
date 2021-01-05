// this is the structure of the order collection which stores the orders recived from customers

import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrderSchema = new Schema({
	data: [{}],
	cart: {},
	shippingType: String,
	shippingCost: Number,
	firstName: String,
	lastName: String,
	email: String,
	phoneNumber: String,
	address: String,
	city: String,
	province: String,
	postalCode: String,
	billingFirstName: String,
	billingLastName: String,
	billingAddress: String,
	billingCity: String,
	billingProvince: String,
	billingPostalCode: String
});

export default mongoose.model('Order', OrderSchema);
