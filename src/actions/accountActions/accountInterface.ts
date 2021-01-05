export enum AccountTypes {
	MODIFYFIRSTNAME = 'ACCOUNT/MODIFYFIRSTNAME',
	MODIFYLASTNAME = 'ACCOUNT/MODIFYLASTNAME',
	MODIFYEMAIL = 'ACCOUNT/MODIFYEMAIL',
	MODIFYGENDER = 'ACCOUNT/MODIFYGENDER',
	MODIFYBIRTHDATE = 'ACCOUNT/MODIFYBIRTHDATE',
	MODIFYADDRESS = 'ACCOUNT/MODIFYADDRESS',
	MODIFYCITY = 'ACCOUNT/MODIFYCITY',
	MODIFYPROVINCE = 'ACCOUNT/MODIFYPROVINCE',
	MODIFYPOSTALCODE = 'ACCOUNT/MODIFYPOSTALCODE'
}

export interface AccountModifyFirstName {
	type: AccountTypes.MODIFYFIRSTNAME;
	value: string;
}

export interface AccountModifyLastName {
	type: AccountTypes.MODIFYLASTNAME;
	value: string;
}

export interface AccountModifyEmail {
	type: AccountTypes.MODIFYEMAIL;
	value: string;
}

export interface AccountModifyGender {
	type: AccountTypes.MODIFYGENDER;
	value: string;
}

export interface AccountModifyBirthDate {
	type: AccountTypes.MODIFYBIRTHDATE;
	value: Date;
}

export interface AccountModifyAddress {
	type: AccountTypes.MODIFYADDRESS;
	value: string;
}

export interface AccountModifyCity {
	type: AccountTypes.MODIFYCITY;
	value: string;
}

export interface AccountModifyProvince {
	type: AccountTypes.MODIFYPROVINCE;
	value: string;
}

export interface AccountModifyPostalCode {
	type: AccountTypes.MODIFYPOSTALCODE;
	value: string;
}

export type AllAccountTypes =
	| AccountModifyFirstName
	| AccountModifyLastName
	| AccountModifyAddress
	| AccountModifyBirthDate
	| AccountModifyCity
	| AccountModifyEmail
	| AccountModifyGender
	| AccountModifyPostalCode
	| AccountModifyProvince;
