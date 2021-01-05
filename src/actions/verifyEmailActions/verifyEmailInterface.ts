export enum VerifyEmailTypes {
	VERIFYEMAIL = 'VERIFYEMAIL/VERIFYEMAIL',
	SETRESULT = 'VERIFYEMAIL/SETRESULT'
}

export interface ActionVerifyEmail {
	type: VerifyEmailTypes.VERIFYEMAIL;
	value: string;
}

export interface ActionVerfiyEmailSetResult {
	type: VerifyEmailTypes.SETRESULT;
	value: boolean;
}

export type AllVerifyEmailActions = ActionVerifyEmail | ActionVerfiyEmailSetResult;
