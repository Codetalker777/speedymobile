import {
	VerifyEmailTypes,
	ActionVerfiyEmailSetResult,
	ActionVerifyEmail
} from './verifyEmailInterface';

export const verifyEmailActions = {
	verfiyEmail: (value: string): ActionVerifyEmail => ({
		type: VerifyEmailTypes.VERIFYEMAIL,
		value
	}),
	setResult: (value: boolean): ActionVerfiyEmailSetResult => ({
		type: VerifyEmailTypes.SETRESULT,
		value
	})
};
