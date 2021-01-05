import {
	AuthTypes,
	ActionLogout,
	ActionSetAccountSettings,
	ActionUpdateAccountSettings,
	ActionCreateAccount,
	ActionLoginSuccess,
	ActionGetAccountSettings,
	ActionGetLogin,
	ActionGetSocialLogin,
	ActionResetPassword,
	ActionCallLogout,
	ActionSetAuthCookie,
	ActionUpdateName
} from './authInterface';
import { ParsedUser } from '../../utils/localTypes';
import { User } from '../../utils/dataTypes';

export const updateName = (
	firstName: string | null,
	lastName: string | null
): ActionUpdateName => ({
	type: AuthTypes.UPDATENAME,
	firstName,
	lastName
});

export const setAuthCookie = (user: ParsedUser): ActionSetAuthCookie => ({
	type: AuthTypes.SETAUTHCOOKIE,
	user
});

/* this file contains all the actions for the cart page */
export const resetPassword = (email: string): ActionResetPassword => ({
	type: AuthTypes.RESETPASSWORD,
	email
});

export const updateAccountSettings = (date: Date): ActionUpdateAccountSettings => ({
	type: AuthTypes.UPDATEACCOUNTSETTINGS,
	date
});

export const createAccount = (date: Date): ActionCreateAccount => ({
	type: AuthTypes.CREATEACCOUNT,
	date
});

export const setAccountSettings = (user: User): ActionSetAccountSettings => ({
	type: AuthTypes.SETACCOUNTSETTINGS,
	user
});

export const getAccountSettings = (): ActionGetAccountSettings => ({
	type: AuthTypes.GETACCOUNTSETTINGS
});

export const getLogin = (email: string, password: string): ActionGetLogin => ({
	type: AuthTypes.LOGIN,
	email,
	password
});

export const getSocialLogin = (
	email: string,
	firstName: string,
	lastName: string
): ActionGetSocialLogin => ({
	type: AuthTypes.LOGIN,
	email,
	firstName,
	lastName
});

export const loginSucess = (user: ParsedUser): ActionLoginSuccess => ({
	type: AuthTypes.LOGINSUCCESS,
	user
});

export const logout = (): ActionLogout => ({
	type: AuthTypes.LOGOUT
});

export const callLogout = (): ActionCallLogout => ({
	type: AuthTypes.CALLLOGOUT
});
