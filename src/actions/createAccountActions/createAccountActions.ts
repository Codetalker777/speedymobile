import {
	CreateAccountTypes,
	ActionClearModified,
	ActionSetAddress,
	ActionSetBirthDate,
	ActionSetCity,
	ActionSetConfirmPassword,
	ActionSetEmail,
	ActionSetFirstName,
	ActionSetGender,
	ActionSetLastName,
	ActionSetPassword,
	ActionSetPostalCode,
	ActionSetProvince
} from './createAccountnterface';

export const createAccountActions = {
	setFirstName: (value: string): ActionSetFirstName => ({
		type: CreateAccountTypes.MODIFYFIRSTNAME,
		value
	}),
	setLastName: (value: string): ActionSetLastName => ({
		type: CreateAccountTypes.MODIFYLASTNAME,
		value
	}),
	setEmail: (value: string): ActionSetEmail => ({
		type: CreateAccountTypes.MODIFYEMAIL,
		value
	}),
	setGender: (value: string): ActionSetGender => ({
		type: CreateAccountTypes.MODIFYGENDER,
		value
	}),
	setBirthDate: (value: Date): ActionSetBirthDate => ({
		type: CreateAccountTypes.MODIFYBIRTHDATE,
		value
	}),
	setAddress: (value: string): ActionSetAddress => ({
		type: CreateAccountTypes.MODIFYADDRESS,
		value
	}),
	setCity: (value: string): ActionSetCity => ({
		type: CreateAccountTypes.MODIFYCITY,
		value
	}),
	setProvince: (value: string): ActionSetProvince => ({
		type: CreateAccountTypes.MODIFYPROVINCE,
		value
	}),
	setPostalCode: (value: string): ActionSetPostalCode => ({
		type: CreateAccountTypes.MODIFYPOSTALCODE,
		value
	}),
	setPassword: (value: string): ActionSetPassword => ({
		type: CreateAccountTypes.MODIFYPASSWORD,
		value
	}),
	setConfirmPassword: (value: string): ActionSetConfirmPassword => ({
		type: CreateAccountTypes.MODIFYCONFIRMPASSWORD,
		value
	}),
	clearModified: (): ActionClearModified => ({
		type: CreateAccountTypes.MODIFYCLEARMODIFIED
	})
};
