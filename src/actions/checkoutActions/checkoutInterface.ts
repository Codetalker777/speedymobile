export enum CheckoutTypes {
	SETPERSONALNAME = 'CHECKOUT/SETPERSONALNAME',
	SETLASTNAME = 'CHECKOUT/SETLASTNAME',
	SETEMAIL = 'CHECKOUT/SETEMAIL',
	SETPHONENUMBER = 'CHECKOUT/SETPHONENUMBER',
	SETADDRESS = 'CHECKOUT/SETADDRESS',
	SETCITY = 'CHECKOUT/SETCITY',
	SETPROVINCE = 'CHECKOUT/SETPROVINCE',
	SETPOSTALCODE = 'CHECKOUT/SETPOSTALCODE',
	SETBILLPERSONALNAME = 'CHECKOUT/SETBILLPERSONALNAME',
	SETBILLLASTNAME = 'CHECKOUT/SETBILLLASTNAME',
	SETBILLADDRESS = 'CHECKOUT/SETBILLADDRESS',
	SETBILLCITY = 'CHECKOUT/SETBILLCITY',
	SETBILLPROVINCE = 'CHECKOUT/SETBILLPROVINCE',
	SETBILLPOSTALCODE = 'CHECKOUT/SETBILLPOSTALCODE',
	SETCARDNUMBER = 'CHECKOUT/SETCARDNUMBER',
	SETSECURITYCODE = 'CHECKOUT/SETSECURITYCODE',
	SETEXPIRATIONMONTH = 'CHECKOUT/SETEXPIRATIONMONTH',
	SETEXPIRATIONYEAR = 'CHECKOUT/SETEXPIRATIONYEAR',
	SETSAMEASABOVE = 'CHECKOUT/SETSAMEASABOVE',
	FIRSTDELIVERYOPTION = 'CHECKOUT/FIRSTDELIVERYOPTION',
	SECONDDELIVERYOPTION = 'CHECKOUT/SECONDDELIVERYOPTION',
	THIRDDELIVERYOPTION = 'CHECKOUT/THIRDDELIVERYOPTION',
	SETDELIVERY = 'CHECKOUT/SETDELIVERY',
	PLACEORDER = 'CHECKOUT/PLACEORDER',
	ORDERRESULT = 'CHECKOUT/ORDERRESULT',
	SETSUBSCRIBE = 'CHECKOUT/SETSUBSCRIBE',
	REGISTERSUBSCRIPTION = 'CHECKOUT/REGISTERSUBSCRIPTION',
	DELETESUBSCRIPTION = 'CHECKOUT/DELETESUBSCRIPTION',
	SUBSCRIBESTATUS = 'CHECKOUT/SUBSCRIBESTATUS',
	UNSUBSCRIBESTATUS = 'CHECKOUT/UNSUBSCRIBESTATUS'
}

export interface ActionSetUnSubscribeStatus {
	type: CheckoutTypes.UNSUBSCRIBESTATUS;
	value: boolean;
}

export interface ActionSetSubscribeStatus {
	type: CheckoutTypes.SUBSCRIBESTATUS;
	value: boolean;
}

export interface ActionSetSubscribe {
	type: CheckoutTypes.SETSUBSCRIBE;
	value: string;
}

export interface ActionDeleteSubscription {
	type: CheckoutTypes.DELETESUBSCRIPTION;
}

export interface ActionRegisterSubscripton {
	type: CheckoutTypes.REGISTERSUBSCRIPTION;
}

export interface ActionOrderResult {
	type: CheckoutTypes.ORDERRESULT;
	error: boolean;
}

export interface ActionPlaceOrder {
	type: CheckoutTypes.PLACEORDER;
}

export interface ActionSetDelivery {
	type: CheckoutTypes.SETDELIVERY;
	cost: number;
	delivery: string;
}

export interface ActionFirstDeliveryOption {
	type: CheckoutTypes.FIRSTDELIVERYOPTION;
}

export interface ActionSecondDeliveryOption {
	type: CheckoutTypes.SECONDDELIVERYOPTION;
}

export interface ActionThirdDeliveryOption {
	type: CheckoutTypes.THIRDDELIVERYOPTION;
}

export interface ActionSetPersonalName {
	type: CheckoutTypes.SETPERSONALNAME;
	value: string;
}

export interface ActionSetLastName {
	type: CheckoutTypes.SETLASTNAME;
	value: string;
}

export interface ActionSetEmail {
	type: CheckoutTypes.SETEMAIL;
	value: string;
}

export interface ActionSetPhoneNumber {
	type: CheckoutTypes.SETPHONENUMBER;
	value: string;
}

export interface ActionSetAddress {
	type: CheckoutTypes.SETADDRESS;
	value: string;
}

export interface ActionSetCity {
	type: CheckoutTypes.SETCITY;
	value: string;
}

export interface ActionSetProvince {
	type: CheckoutTypes.SETPROVINCE;
	value: string;
}

export interface ActionSetPostalCode {
	type: CheckoutTypes.SETPOSTALCODE;
	value: string;
}

export interface ActionSetBillPersonalName {
	type: CheckoutTypes.SETBILLPERSONALNAME;
	value: string;
}

export interface ActionSetBillLastName {
	type: CheckoutTypes.SETBILLLASTNAME;
	value: string;
}

export interface ActionSetBillAddress {
	type: CheckoutTypes.SETBILLADDRESS;
	value: string;
}

export interface ActionSetBillCity {
	type: CheckoutTypes.SETBILLCITY;
	value: string;
}

export interface ActionSetBillProvince {
	type: CheckoutTypes.SETBILLPROVINCE;
	value: string;
}

export interface ActionSetBillPostalCode {
	type: CheckoutTypes.SETBILLPOSTALCODE;
	value: string;
}

export interface ActionSetCardNumber {
	type: CheckoutTypes.SETCARDNUMBER;
	value: string;
}

export interface ActionSetSecurityCode {
	type: CheckoutTypes.SETSECURITYCODE;
	value: string;
}

export interface ActionSetExpirationMonth {
	type: CheckoutTypes.SETEXPIRATIONMONTH;
	value: string;
}

export interface ActionSetExpirationYear {
	type: CheckoutTypes.SETEXPIRATIONYEAR;
	value: string;
}

export interface ActionSetSameAsAbove {
	type: CheckoutTypes.SETSAMEASABOVE;
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	province: string;
	postalCode: string;
}

export type AllCheckoutTypes =
	| ActionDeleteSubscription
	| ActionFirstDeliveryOption
	| ActionOrderResult
	| ActionPlaceOrder
	| ActionRegisterSubscripton
	| ActionSecondDeliveryOption
	| ActionSetAddress
	| ActionSetBillAddress
	| ActionSetBillCity
	| ActionSetBillLastName
	| ActionSetBillPersonalName
	| ActionSetBillPostalCode
	| ActionSetBillProvince
	| ActionSetCardNumber
	| ActionSetCity
	| ActionSetDelivery
	| ActionSetEmail
	| ActionSetExpirationMonth
	| ActionSetExpirationYear
	| ActionSetPersonalName
	| ActionSetPhoneNumber
	| ActionSetPostalCode
	| ActionSetProvince
	| ActionSetSameAsAbove
	| ActionSetSecurityCode
	| ActionSetSubscribe
	| ActionSetSubscribeStatus
	| ActionSetUnSubscribeStatus
	| ActionThirdDeliveryOption
	| ActionSetLastName;
