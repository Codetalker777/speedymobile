import { ParsedUser } from '../../utils/localTypes';
import { User } from '../../utils/dataTypes';

export enum AuthTypes {
	LOGIN = 'AUTH/LOGIN',
	SOCIALLOGIN = 'AUTH/SOCIALLOGIN',
	LOGINSUCCESS = 'AUTH/LOGINSUCCESS',
	LOGOUT = 'AUTH/LOGOUT',
	CALLLOGOUT = 'AUTH/CALLOGOUT',
	GETACCOUNTSETTINGS = 'AUTH/GETACCOUNTSETTINGS',
	SETACCOUNTSETTINGS = 'AUTH/SETACCOUNTSETTINGS',
	UPDATEACCOUNTSETTINGS = 'AUTH/UPDATEACCOUNTSETTINGS',
	CREATEACCOUNT = 'AUTH/CREATEACCOUNT',
	RESETPASSWORD = 'AUTH/RESETPASSWORD',
	SETAUTHCOOKIE = 'AUTH/SETAUTHCOOKIE',
	UPDATENAME = 'AUTH/UPDATENAME'
}

export interface ActionUpdateName {
	type: AuthTypes.UPDATENAME;
	firstName: string | null;
	lastName: string | null;
}
export interface ActionSetAuthCookie {
	type: AuthTypes.SETAUTHCOOKIE;
	user: ParsedUser;
}

export interface ActionCallLogout {
	type: AuthTypes.CALLLOGOUT;
}

export interface ActionUpdateAccountSettings {
	type: AuthTypes.UPDATEACCOUNTSETTINGS;
	date: Date;
}

export interface ActionLogout {
	type: AuthTypes.LOGOUT;
}

export interface ActionSetAccountSettings {
	type: AuthTypes.SETACCOUNTSETTINGS;
	user: User;
}

export interface ActionResetPassword {
	type: AuthTypes.RESETPASSWORD;
	email: string;
}

export interface ActionCreateAccount {
	type: AuthTypes.CREATEACCOUNT;
	date: Date;
}

export interface ActionGetAccountSettings {
	type: AuthTypes.GETACCOUNTSETTINGS;
}

export interface ActionGetLogin {
	type: AuthTypes.LOGIN;
	email: string;
	password: string;
}

export interface ActionGetSocialLogin {
	type: AuthTypes.LOGIN;
	email: string;
	firstName: string;
	lastName: string;
}

export interface ActionLoginSuccess {
	type: AuthTypes.LOGINSUCCESS;
	user: ParsedUser;
}

export type AllAuthTypes =
	| ActionUpdateAccountSettings
	| ActionLogout
	| ActionSetAccountSettings
	| ActionResetPassword
	| ActionCreateAccount
	| ActionGetAccountSettings
	| ActionGetLogin
	| ActionGetSocialLogin
	| ActionLoginSuccess
	| ActionCallLogout
	| ActionSetAuthCookie
	| ActionUpdateName;
