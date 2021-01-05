import {
	CheckoutTypes,
	AllCheckoutTypes
} from '../../actions/checkoutActions/checkoutInterface';
import { CheckoutState } from './checkoutTypes';
import { SearchActionType, Reset } from '../../actions/searchActions/searchInterface';

/* contains all the definition for all of the variables used in the checkout page */

/* the state on app mount */
const intialState: CheckoutState = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
	address: '',
	city: '',
	province: '',
	postalCode: '',
	billingFirstName: '',
	billingLastName: '',
	billingAddress: '',
	billingCity: '',
	billingProvince: '',
	billingPostalCode: '',
	cardNumber: '',
	securityCode: '',
	expirationMonth: 'MM',
	expirationYear: 'YYYY',
	deliveryCost: 0,
	deliveryType: '',
	check1: true,
	check2: false,
	check3: false,
	loading: true,
	error: false,
	subscribe: '',
	subscribeState: null,
	unSubscribeState: null
};

/* the following actions trigger changes in the state */

export default (
	state = intialState,
	action: Reset | AllCheckoutTypes
): CheckoutState => {
	switch (action.type) {
		case SearchActionType.RESET:
			return {
				...intialState
			};
		case CheckoutTypes.UNSUBSCRIBESTATUS:
			return {
				...state,
				unSubscribeState: action.value
			};
		case CheckoutTypes.SUBSCRIBESTATUS:
			return {
				...state,
				subscribeState: action.value
			};
		case CheckoutTypes.SETSUBSCRIBE:
			return {
				...state,
				subscribe: action.value
			};
		case CheckoutTypes.ORDERRESULT:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case CheckoutTypes.SETDELIVERY:
			return {
				...state,
				deliveryCost: action.cost,
				deliveryType: action.delivery
			};
		case CheckoutTypes.FIRSTDELIVERYOPTION:
			return {
				...state,
				check1: true,
				check2: false,
				check3: false
			};
		case CheckoutTypes.SECONDDELIVERYOPTION:
			return {
				...state,
				check1: false,
				check2: true,
				check3: false
			};
		case CheckoutTypes.THIRDDELIVERYOPTION:
			return {
				...state,
				check1: false,
				check2: false,
				check3: true
			};
		case CheckoutTypes.SETPERSONALNAME:
			return {
				...state,
				firstName: action.value
			};
		case CheckoutTypes.SETLASTNAME:
			return {
				...state,
				lastName: action.value
			};
		case CheckoutTypes.SETEMAIL:
			return {
				...state,
				email: action.value
			};
		case CheckoutTypes.SETPHONENUMBER:
			return {
				...state,
				phoneNumber: action.value
			};
		case CheckoutTypes.SETADDRESS:
			return {
				...state,
				address: action.value
			};
		case CheckoutTypes.SETCITY:
			return {
				...state,
				city: action.value
			};
		case CheckoutTypes.SETPROVINCE:
			return {
				...state,
				province: action.value
			};
		case CheckoutTypes.SETPOSTALCODE:
			return {
				...state,
				postalCode: action.value
			};
		case CheckoutTypes.SETBILLPERSONALNAME:
			return {
				...state,
				billingFirstName: action.value
			};
		case CheckoutTypes.SETBILLLASTNAME:
			return {
				...state,
				billingLastName: action.value
			};
		case CheckoutTypes.SETBILLADDRESS:
			return {
				...state,
				billingAddress: action.value
			};
		case CheckoutTypes.SETBILLCITY:
			return {
				...state,
				billingCity: action.value
			};
		case CheckoutTypes.SETBILLPROVINCE:
			return {
				...state,
				billingProvince: action.value
			};
		case CheckoutTypes.SETBILLPOSTALCODE:
			return {
				...state,
				billingPostalCode: action.value
			};
		case CheckoutTypes.SETCARDNUMBER:
			return {
				...state,
				cardNumber: action.value
			};
		case CheckoutTypes.SETSECURITYCODE:
			return {
				...state,
				securityCode: action.value
			};
		case CheckoutTypes.SETEXPIRATIONMONTH:
			return {
				...state,
				expirationMonth: action.value
			};
		case CheckoutTypes.SETEXPIRATIONYEAR:
			return {
				...state,
				expirationYear: action.value
			};
		case CheckoutTypes.SETSAMEASABOVE:
			return {
				...state,
				billingFirstName: action.firstName,
				billingLastName: action.lastName,
				billingAddress: action.address,
				billingCity: action.city,
				billingProvince: action.province,
				billingPostalCode: action.postalCode
			};
		default:
			return { ...state };
	}
};
