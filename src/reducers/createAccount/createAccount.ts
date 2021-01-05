import {
	CreateAccountTypes,
	AllCreateAccountActions
} from '../../actions/createAccountActions/createAccountnterface';
import { CreateAccountState } from './createAccountTypes';
/* the state on app mount */
const intialState: CreateAccountState = {
	address: '',
	birthDate: null,
	city: '',
	email: '',
	firstName: '',
	gender: '',
	lastName: '',
	postalCode: '',
	province: '',
	password: '',
	confirmPassword: '',
	loading: true,
	modified: false
};

/* the following actions trigger changes in the state */

export default (
	state = intialState,
	action: AllCreateAccountActions
): CreateAccountState => {
	switch (action.type) {
		case CreateAccountTypes.MODIFYCLEARMODIFIED:
			return { ...state, modified: false };
		case CreateAccountTypes.MODIFYFIRSTNAME:
			return { ...state, modified: true, firstName: action.value };
		case CreateAccountTypes.MODIFYADDRESS:
			return { ...state, modified: true, address: action.value };
		case CreateAccountTypes.MODIFYBIRTHDATE:
			return { ...state, modified: true, birthDate: action.value };
		case CreateAccountTypes.MODIFYCITY:
			return { ...state, modified: true, city: action.value };
		case CreateAccountTypes.MODIFYEMAIL:
			return { ...state, modified: true, email: action.value };
		case CreateAccountTypes.MODIFYGENDER:
			return { ...state, modified: true, gender: action.value };
		case CreateAccountTypes.MODIFYLASTNAME:
			return { ...state, modified: true, lastName: action.value };
		case CreateAccountTypes.MODIFYPOSTALCODE:
			return { ...state, modified: true, postalCode: action.value };
		case CreateAccountTypes.MODIFYPROVINCE:
			return { ...state, modified: true, province: action.value };
		case CreateAccountTypes.MODIFYPASSWORD:
			return { ...state, modified: true, password: action.value };
		case CreateAccountTypes.MODIFYCONFIRMPASSWORD:
			return { ...state, modified: true, confirmPassword: action.value };
		default:
			return state;
	}
};
