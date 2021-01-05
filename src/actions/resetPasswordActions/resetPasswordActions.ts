import {
	ResetPasswordTypes,
	ActionSetConfirmPassword,
	ActionSetPassword,
	ActionSetResult,
	ActionSubmitNewPassword,
	ActionVerifyPassword
} from './resetPasswordInterface';

export const verifyPasswordActions = {
	verifyPassword: (value: string): ActionVerifyPassword => ({
		type: ResetPasswordTypes.VERIFYPASSWORD,
		value
	}),
	setResult: (value: boolean, token?: string): ActionSetResult => ({
		type: ResetPasswordTypes.SETRESULT,
		value,
		token
	}),
	setPassword: (value: string, token: string): ActionSetPassword => ({
		type: ResetPasswordTypes.SETPASSWORD,
		value,
		token
	}),
	setConfirmPassword: (value: string, token: string): ActionSetConfirmPassword => ({
		type: ResetPasswordTypes.SETCONFIRMPASSWORD,
		value,
		token
	}),
	submitNewPassword: (): ActionSubmitNewPassword => ({
		type: ResetPasswordTypes.SUBMITNEWPASSWORD
	})
};
