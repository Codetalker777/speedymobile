import {
	AccountTypes,
	AccountModifyAddress,
	AccountModifyBirthDate,
	AccountModifyCity,
	AccountModifyEmail,
	AccountModifyFirstName,
	AccountModifyGender,
	AccountModifyLastName,
	AccountModifyPostalCode,
	AccountModifyProvince
} from './accountInterface';

export const accountActions = {
	setFirstName: (value: string): AccountModifyFirstName => ({
		type: AccountTypes.MODIFYFIRSTNAME,
		value
	}),
	setLastName: (value: string): AccountModifyLastName => ({
		type: AccountTypes.MODIFYLASTNAME,
		value
	}),
	setEmail: (value: string): AccountModifyEmail => ({
		type: AccountTypes.MODIFYEMAIL,
		value
	}),
	setGender: (value: string): AccountModifyGender => ({
		type: AccountTypes.MODIFYGENDER,
		value
	}),
	setBirthDate: (value: Date): AccountModifyBirthDate => ({
		type: AccountTypes.MODIFYBIRTHDATE,
		value
	}),
	setAddress: (value: string): AccountModifyAddress => ({
		type: AccountTypes.MODIFYADDRESS,
		value
	}),
	setCity: (value: string): AccountModifyCity => ({
		type: AccountTypes.MODIFYCITY,
		value
	}),
	setProvince: (value: string): AccountModifyProvince => ({
		type: AccountTypes.MODIFYPROVINCE,
		value
	}),
	setPostalCode: (value: string): AccountModifyPostalCode => ({
		type: AccountTypes.MODIFYPOSTALCODE,
		value
	})
};
