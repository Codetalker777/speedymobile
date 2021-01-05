export type ResetPasswordState = {
	loading: boolean;
	success: boolean | null;
	token?: string;
	password: string;
	confirmPassword: string;
};
