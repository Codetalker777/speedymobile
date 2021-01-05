export enum CreateAccountTypes {
	MODIFYFIRSTNAME = 'CREATEACCOUNT/MODIFYFIRSTNAME',
	MODIFYLASTNAME = 'CREATEACCOUNT/MODIFYLASTNAME',
	MODIFYEMAIL = 'CREATEACCOUNT/MODIFYEMAIL',
	MODIFYGENDER = 'CREATEACCOUNT/MODIFYGENDER',
	MODIFYBIRTHDATE = 'CREATEACCOUNT/MODIFYBIRTHDATE',
	MODIFYADDRESS = 'CREATEACCOUNT/MODIFYADDRESS',
	MODIFYCITY = 'CREATEACCOUNT/MODIFYCITY',
	MODIFYPROVINCE = 'CREATEACCOUNT/MODIFYPROVINCE',
	MODIFYPOSTALCODE = 'CREATEACCOUNT/MODIFYPOSTALCODE',
	MODIFYPASSWORD = 'CREATEACCOUNT/MODIFYPASSWORD',
	MODIFYCONFIRMPASSWORD = 'CREATEACCOUNT/MODIFYCREATEPASSWORD',
	MODIFYCLEARMODIFIED = 'CREATEACCOUNT/CLEARMODIFIED'
}

export interface ActionSetFirstName {
	type: CreateAccountTypes.MODIFYFIRSTNAME;
	value: string;
}

export interface ActionSetLastName {
	type: CreateAccountTypes.MODIFYLASTNAME;
	value: string;
}

export interface ActionSetEmail {
	type: CreateAccountTypes.MODIFYEMAIL;
	value: string;
}

export interface ActionSetGender {
	type: CreateAccountTypes.MODIFYGENDER;
	value: string;
}

export interface ActionSetBirthDate {
	type: CreateAccountTypes.MODIFYBIRTHDATE;
	value: Date;
}

export interface ActionSetAddress {
	type: CreateAccountTypes.MODIFYADDRESS;
	value: string;
}

export interface ActionSetCity {
	type: CreateAccountTypes.MODIFYCITY;
	value: string;
}

export interface ActionSetProvince {
	type: CreateAccountTypes.MODIFYPROVINCE;
	value: string;
}

export interface ActionSetPostalCode {
	type: CreateAccountTypes.MODIFYPOSTALCODE;
	value: string;
}

export interface ActionSetPassword {
	type: CreateAccountTypes.MODIFYPASSWORD;
	value: string;
}

export interface ActionSetConfirmPassword {
	type: CreateAccountTypes.MODIFYCONFIRMPASSWORD;
	value: string;
}

export interface ActionClearModified {
	type: CreateAccountTypes.MODIFYCLEARMODIFIED;
}

export type AllCreateAccountActions =
	| ActionClearModified
	| ActionSetAddress
	| ActionSetBirthDate
	| ActionSetCity
	| ActionSetConfirmPassword
	| ActionSetEmail
	| ActionSetFirstName
	| ActionSetGender
	| ActionSetLastName
	| ActionSetPassword
	| ActionSetPostalCode
	| ActionSetProvince;
