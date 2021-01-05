import { all, takeLeading, put, select, call, takeLatest } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import {
	loginSucess,
	setAccountSettings,
	logout as logoutRedux,
	updateName
} from '../../actions/authActions/auth';
import {
	AuthTypes,
	ActionCreateAccount,
	ActionGetLogin,
	ActionGetSocialLogin,
	ActionUpdateAccountSettings,
	ActionResetPassword
} from '../../actions/authActions/authInterface';
import { createAccountActions } from '../../actions/createAccountActions/createAccountActions';
import { messageActions } from '../../actions/messageActions/messageActions';
import axios from '../../utils/api';
import { MessageTypeDef } from '../../reducers/messages/messagesTypes';
import {
	CreateAccount,
	CreateNewAccount,
	CreateAccountModified,
	TriggerLoginInterface,
	LoginCallType,
	AccountStateModified,
	UpdatedAccountSettings,
	UpdateAccountSettingsType,
	ResetEmail,
	ResetPasswordType,
	UserResponse,
	AccountSettingsType,
	LogoutType,
	AuthListenerType
} from './authSagaTypes';

const createAccountApi = (userData: CreateAccountModified): Promise<CreateAccount> => {
	return axios
		.post('/api/RegisterAccount', {
			...userData
		})
		.then(response => {
			return response.data;
		});
};

const triggerLogin = (
	email: string,
	password: string
): Promise<TriggerLoginInterface> => {
	return axios.post('/api/Login', { email, password }).then(response => {
		return response.data;
	});
};

const triggerSocialLogin = (
	email: string,
	firstName: string,
	lastName: string
): Promise<TriggerLoginInterface> => {
	return axios
		.post('/api/SocialButtonLogin', { email, firstName, lastName })
		.then(response => {
			return response.data;
		});
};

const sendResetEmail = (email: string): Promise<ResetEmail> => {
	return axios.post('/api/SendResetEmail', { email }).then(response => {
		return response.data;
	});
};

const getAccountSettings = (token: string): Promise<UserResponse> => {
	const config = {
		headers: {
			Authorization: `Token ${token}`
		}
	};
	return axios.post('/api/GetUserInfo', null, config).then(response => {
		return response.data;
	});
};

const sendUpdatedAccountSettings = (
	token: string,
	userData: AccountStateModified
): Promise<UpdatedAccountSettings> => {
	const config = {
		headers: {
			Authorization: `Token ${token}`
		}
	};
	return axios.post('/api/UpdateUserInfo', { userData }, config).then(response => {
		return response.data;
	});
};

function* createNewAccount({ date }: ActionCreateAccount): CreateNewAccount {
	const userData: CreateAccountModified = JSON.parse(
		JSON.stringify(yield select(state => state.createAccount))
	);
	delete userData.loading;
	delete userData.modified;
	delete userData.confirmPassword;
	userData.birthDate = date.toJSON();
	try {
		const response: CreateAccount = yield call(createAccountApi, userData);
		if (response.success) {
			yield put(
				messageActions.setPopup(
					'Account has been created, Please verify your email in order to use your account',
					MessageTypeDef.SUCCESS
				)
			);
			yield put(createAccountActions.clearModified());
		} else if (response.error) {
			yield put(messageActions.setPopup(response.error, MessageTypeDef.ERROR));
		}
	} catch (error) {
		yield put(
			messageActions.setPopup(
				'Failed to create your account, please try again',
				MessageTypeDef.ERROR
			)
		);
	}
}

function* updateAccountSettings({
	date
}: ActionUpdateAccountSettings): UpdateAccountSettingsType {
	const token: string = yield select(state => state.auth.token);
	const userData: AccountStateModified = JSON.parse(
		JSON.stringify(yield select(state => state.account))
	);
	delete userData.loading;
	delete userData.modified;
	if (typeof userData.birthDate !== 'string') {
		userData.birthDate = date.toJSON();
	}
	try {
		const response: UpdatedAccountSettings = yield call(
			sendUpdatedAccountSettings,
			token,
			userData
		);
		if (response.success) {
			yield put(messageActions.setPopup('Account Info Updated', MessageTypeDef.SUCCESS));
			const cookies = new Cookies();
			const updateCookies = cookies.get('xid');
			updateCookies.firstName = userData.firstName;
			updateCookies.lastName = userData.lastName;
			cookies.set('xid', updateCookies);
			yield put(updateName(userData.firstName, userData.lastName));
		} else {
			yield put(
				messageActions.setPopup('Account Info Failed to Update', MessageTypeDef.ERROR)
			);
		}
	} catch (error) {
		yield put(
			messageActions.setPopup('Account Info Failed to Update', MessageTypeDef.ERROR)
		);
	}
}

export function* accountSettings(): AccountSettingsType {
	const token: string = yield select(state => state.auth.token);
	try {
		const accountData: UserResponse = yield call(getAccountSettings, token);
		if (accountData.success) {
			delete accountData.success;
			accountData.birthDate = new Date(accountData.birthDate);
			yield put(setAccountSettings(accountData));
		} else {
			yield put(
				messageActions.setPopup(
					'Unable to Retrieve Account information, please try again',
					MessageTypeDef.ERROR
				)
			);
		}
	} catch (error) {
		yield put(
			messageActions.setPopup(
				'Not Signed In, Please login to access Account Settings',
				MessageTypeDef.ERROR
			)
		);
	}
}

function* loginCall(payload: ActionGetLogin): LoginCallType {
	const response: TriggerLoginInterface = yield call(
		triggerLogin,
		payload.email,
		payload.password
	);
	if (response.success) {
		yield put(messageActions.setPopup('Logged in Successfully', MessageTypeDef.SUCCESS));
		const cookies = new Cookies();
		cookies.set('xid', response.user);
		yield put(loginSucess(response.user));
	} else if (response.error) {
		yield put(messageActions.setPopup(response.error, MessageTypeDef.ERROR));
	}
}

//Facebook/GoogleLogin

function* socialLoginCall(payload: ActionGetSocialLogin): LoginCallType {
	const response: TriggerLoginInterface = yield call(
		triggerSocialLogin,
		payload.email,
		payload.firstName,
		payload.lastName
	);
	if (response.success) {
		yield put(messageActions.setPopup('Logged in Successfully', MessageTypeDef.SUCCESS));
		const cookies = new Cookies();
		cookies.set('xid', response.user);
		yield put(loginSucess(response.user));
	} else if (response.error) {
		yield put(messageActions.setPopup(response.error, MessageTypeDef.ERROR));
	}
}

function* logout(): LogoutType {
	yield put(logoutRedux());
	const cookies = new Cookies();
	cookies.remove('xid');
	yield put(messageActions.setPopup('Logged Out Successfully', MessageTypeDef.SUCCESS));
}

function* resetPassword({ email }: ActionResetPassword): ResetPasswordType {
	const response: ResetEmail = yield call(sendResetEmail, email);
	if (response.success) {
		yield put(
			messageActions.setPopup('Reset Password Email Sent!', MessageTypeDef.SUCCESS)
		);
	} else if (response.error) {
		yield put(messageActions.setPopup(response.error, MessageTypeDef.ERROR));
	}
}

export default function* authListener(): AuthListenerType {
	yield all([
		yield takeLeading(AuthTypes.LOGIN, loginCall),
		yield takeLeading(AuthTypes.LOGIN, socialLoginCall),
		yield takeLeading(AuthTypes.CALLLOGOUT, logout),
		yield takeLatest(AuthTypes.GETACCOUNTSETTINGS, accountSettings),
		yield takeLeading(AuthTypes.UPDATEACCOUNTSETTINGS, updateAccountSettings),
		yield takeLeading(AuthTypes.CREATEACCOUNT, createNewAccount),
		yield takeLeading(AuthTypes.RESETPASSWORD, resetPassword)
	]);
}
