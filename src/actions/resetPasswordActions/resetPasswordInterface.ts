export enum ResetPasswordTypes {
	VERIFYPASSWORD = 'VERIFYPASSWORD/VERIFYPASSWORD',
	SETRESULT = 'VERIFYPASSWORD/SETRESULT',
	SETPASSWORD = 'VERIFYPASSWORD/SETPASSWORD',
	SETCONFIRMPASSWORD = 'VERIFYPASSWORD/SETCONFIRMPASSWORD',
	SUBMITNEWPASSWORD = 'VERIFYPASSOWRD/SUBMITNEWPASSWORD'
}

export interface ActionVerifyPassword {
	type: ResetPasswordTypes.VERIFYPASSWORD;
	value: string;
}

export interface ActionSetResult {
	type: ResetPasswordTypes.SETRESULT;
	value: boolean;
	token?: string;
}

export interface ActionSetPassword {
	type: ResetPasswordTypes.SETPASSWORD;
	value: string;
	token: string;
}

export interface ActionSetConfirmPassword {
	type: ResetPasswordTypes.SETCONFIRMPASSWORD;
	value: string;
	token: string;
}

export interface ActionSubmitNewPassword {
	type: ResetPasswordTypes.SUBMITNEWPASSWORD;
}

export type AllResetPasswordActions =
	| ActionSetConfirmPassword
	| ActionSetPassword
	| ActionSetResult
	| ActionSubmitNewPassword
	| ActionVerifyPassword;
