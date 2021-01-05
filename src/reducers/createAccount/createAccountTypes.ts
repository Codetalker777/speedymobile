export type CreateAccountState = {
	address: string;
	birthDate: Date | null;
	city: string;
	email: string;
	firstName: string;
	gender: string;
	lastName: string;
	postalCode: string;
	province: string;
	password: string;
	confirmPassword: string;
	loading: boolean;
	modified: boolean;
};
