import {
	CallEffect,
	PutEffect,
	SelectEffect,
	ForkEffect,
	AllEffect
} from 'redux-saga/effects';
import { ActionSetPopup } from '../../actions/messageActions/messageInterface';
import { ActionClearModified } from '../../actions/createAccountActions/createAccountnterface';
import {
	ActionLoginSuccess,
	ActionSetAccountSettings,
	ActionLogout,
	ActionUpdateName
} from '../../actions/authActions/authInterface';
import { User } from '../../utils/dataTypes';

export interface UserResponse extends User {
	success?: boolean;
}

export interface CreateAccount {
	success: boolean;
	error?: string;
}

export interface UpdatedAccountSettings {
	success: boolean;
	error?: string;
}

export interface ResetEmail {
	success: boolean;
	error?: string;
}

export interface UserLoginResponseType {
	email: string;
	firstName: string;
	lastName: string;
	token: string;
}

export interface TriggerLoginInterface {
	success: boolean;
	error?: string;
	user: UserLoginResponseType;
}

export interface CreateAccountModified {
	address: string;
	birthDate: Date | string | null;
	city: string;
	email: string;
	firstName: string;
	gender: string;
	lastName: string;
	postalCode: string;
	province: string;
	password: string;
	confirmPassword?: string;
	loading?: boolean;
	modified?: boolean;
}

export interface AccountStateModified {
	address: string | null;
	birthDate: Date | string | null;
	city: string | null;
	email: string | null;
	firstName: string | null;
	gender: string | null;
	lastName: string | null;
	postalCode: string | null;
	province: string | null;
	loading?: boolean;
	modified?: boolean;
}

export type CreateNewAccount = Generator<
	| SelectEffect
	| CallEffect<CreateAccount>
	| PutEffect<ActionSetPopup>
	| PutEffect<ActionClearModified>,
	void,
	CreateAccount & CreateAccountModified
>;

export type LoginCallType = Generator<
	| CallEffect<TriggerLoginInterface>
	| PutEffect<ActionSetPopup>
	| PutEffect<ActionLoginSuccess>,
	void,
	TriggerLoginInterface
>;

export type UpdateAccountSettingsType = Generator<
	| SelectEffect
	| CallEffect<UpdatedAccountSettings>
	| PutEffect<ActionSetPopup>
	| PutEffect<ActionUpdateName>,
	void,
	UpdatedAccountSettings & string & AccountStateModified
>;

export type ResetPasswordType = Generator<
	CallEffect<ResetEmail> | PutEffect<ActionSetPopup>,
	void,
	ResetEmail
>;

export type AccountSettingsType = Generator<
	| SelectEffect
	| CallEffect<UserResponse>
	| PutEffect<ActionSetAccountSettings>
	| PutEffect<ActionSetPopup>,
	void,
	string & UserResponse
>;

export type LogoutType = Generator<
	PutEffect<ActionLogout> | PutEffect<ActionSetPopup>,
	void,
	undefined
>;

export type AuthListenerType = Generator<
	| ForkEffect<never>
	| AllEffect<
			| LogoutType
			| AccountSettingsType
			| ResetPasswordType
			| UpdateAccountSettingsType
			| LoginCallType
			| CreateNewAccount
	  >,
	void,
	string &
		UserResponse &
		ResetEmail &
		undefined &
		UpdatedAccountSettings &
		AccountStateModified &
		TriggerLoginInterface &
		CreateAccount &
		CreateAccountModified
>;
