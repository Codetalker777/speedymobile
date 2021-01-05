import {
	CheckoutTypes,
	ActionDeleteSubscription,
	ActionFirstDeliveryOption,
	ActionOrderResult,
	ActionPlaceOrder,
	ActionRegisterSubscripton,
	ActionSecondDeliveryOption,
	ActionSetAddress,
	ActionSetBillAddress,
	ActionSetBillCity,
	ActionSetBillLastName,
	ActionSetBillPersonalName,
	ActionSetBillPostalCode,
	ActionSetBillProvince,
	ActionSetCardNumber,
	ActionSetCity,
	ActionSetDelivery,
	ActionSetEmail,
	ActionSetExpirationMonth,
	ActionSetExpirationYear,
	ActionSetPersonalName,
	ActionSetPhoneNumber,
	ActionSetPostalCode,
	ActionSetProvince,
	ActionSetSameAsAbove,
	ActionSetSecurityCode,
	ActionSetSubscribe,
	ActionSetSubscribeStatus,
	ActionSetUnSubscribeStatus,
	ActionThirdDeliveryOption,
	ActionSetLastName
} from './checkoutInterface';

/* This file holds all the checkout actions */

// Subscribition Actions
export const setUnSubscribeStatus = (value: boolean): ActionSetUnSubscribeStatus => ({
	type: CheckoutTypes.UNSUBSCRIBESTATUS,
	value
});

export const setSubscribeStatus = (value: boolean): ActionSetSubscribeStatus => ({
	type: CheckoutTypes.SUBSCRIBESTATUS,
	value
});

export const setSubscribe = (value: string): ActionSetSubscribe => ({
	type: CheckoutTypes.SETSUBSCRIBE,
	value
});

export const DeleteSubscription = (): ActionDeleteSubscription => ({
	type: CheckoutTypes.DELETESUBSCRIPTION
});

export const registerSubscription = (): ActionRegisterSubscripton => ({
	type: CheckoutTypes.REGISTERSUBSCRIPTION
});
// End of Subscribton actions

// Checkout Actions
export const orderResult = (error: boolean): ActionOrderResult => ({
	type: CheckoutTypes.ORDERRESULT,
	error
});

export const placeOrder = (): ActionPlaceOrder => ({
	type: CheckoutTypes.PLACEORDER
});

export const setDelivery = (cost: number, delivery: string): ActionSetDelivery => ({
	type: CheckoutTypes.SETDELIVERY,
	cost,
	delivery
});

export const firstDeliveryOption = (): ActionFirstDeliveryOption => ({
	type: CheckoutTypes.FIRSTDELIVERYOPTION
});

export const secondDeliveryOption = (): ActionSecondDeliveryOption => ({
	type: CheckoutTypes.SECONDDELIVERYOPTION
});

export const thirdDeliveryOption = (): ActionThirdDeliveryOption => ({
	type: CheckoutTypes.THIRDDELIVERYOPTION
});

export const setPersonalName = (value: string): ActionSetPersonalName => ({
	type: CheckoutTypes.SETPERSONALNAME,
	value
});

export const setLastName = (value: string): ActionSetLastName => ({
	type: CheckoutTypes.SETLASTNAME,
	value
});

export const setEmail = (value: string): ActionSetEmail => ({
	type: CheckoutTypes.SETEMAIL,
	value
});

export const setPhoneNumber = (value: string): ActionSetPhoneNumber => ({
	type: CheckoutTypes.SETPHONENUMBER,
	value
});

export const setAddress = (value: string): ActionSetAddress => ({
	type: CheckoutTypes.SETADDRESS,
	value
});

export const setCity = (value: string): ActionSetCity => ({
	type: CheckoutTypes.SETCITY,
	value
});

export const setProvince = (value: string): ActionSetProvince => ({
	type: CheckoutTypes.SETPROVINCE,
	value
});

export const setPostalCode = (value: string): ActionSetPostalCode => ({
	type: CheckoutTypes.SETPOSTALCODE,
	value
});

export const setBillPersonalName = (value: string): ActionSetBillPersonalName => ({
	type: CheckoutTypes.SETBILLPERSONALNAME,
	value
});

export const setBillLastName = (value: string): ActionSetBillLastName => ({
	type: CheckoutTypes.SETBILLLASTNAME,
	value
});

export const setBillAddress = (value: string): ActionSetBillAddress => ({
	type: CheckoutTypes.SETBILLADDRESS,
	value
});

export const setBillCity = (value: string): ActionSetBillCity => ({
	type: CheckoutTypes.SETBILLCITY,
	value
});

export const setBillProvince = (value: string): ActionSetBillProvince => ({
	type: CheckoutTypes.SETBILLPROVINCE,
	value
});

export const setBillPostalCode = (value: string): ActionSetBillPostalCode => ({
	type: CheckoutTypes.SETBILLPOSTALCODE,
	value
});

export const setCardNumber = (value: string): ActionSetCardNumber => ({
	type: CheckoutTypes.SETCARDNUMBER,
	value
});

export const setSecurityCode = (value: string): ActionSetSecurityCode => ({
	type: CheckoutTypes.SETSECURITYCODE,
	value
});

export const setExpirationMonth = (value: string): ActionSetExpirationMonth => ({
	type: CheckoutTypes.SETEXPIRATIONMONTH,
	value
});

export const setExpirationYear = (value: string): ActionSetExpirationYear => ({
	type: CheckoutTypes.SETEXPIRATIONYEAR,
	value
});

export const setSameAsAbove = (
	firstName: string,
	lastName: string,
	address: string,
	city: string,
	province: string,
	postalCode: string
): ActionSetSameAsAbove => ({
	type: CheckoutTypes.SETSAMEASABOVE,
	firstName,
	lastName,
	address,
	city,
	province,
	postalCode
});
