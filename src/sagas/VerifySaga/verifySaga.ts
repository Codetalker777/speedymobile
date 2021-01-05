import { all, takeLeading, put, call, select } from 'redux-saga/effects';
import { verifyEmailActions } from '../../actions/verifyEmailActions/verifyEmailActions';
import {
	VerifyEmailTypes,
	ActionVerifyEmail
} from '../../actions/verifyEmailActions/verifyEmailInterface';
import { verifyPasswordActions } from '../../actions/resetPasswordActions/resetPasswordActions';
import {
	ActionVerifyPassword,
	ResetPasswordTypes
} from '../../actions/resetPasswordActions/resetPasswordInterface';
import axios from '../../utils/api';
import { messageActions } from '../../actions/messageActions/messageActions';
import { MessageTypeDef } from '../../reducers/messages/messagesTypes';
import {
	VerifyEmailType,
	VerifyPasswordType,
	SubmitNewPasswordType,
	VerifyEmailListenerType,
	VerifyEmailResponseType,
	VerifyPasswordResponseType,
	VerifyResetLinkType
} from './verfiySagaTypes';

const verifyEmailCall = (id: string): Promise<VerifyEmailResponseType> => {
	const timeStamp = new Date();
	return axios
		.post('/api/VerifyEmail', {
			id,
			timeStamp: timeStamp.toJSON()
		})
		.then(response => {
			return response.data;
		});
};

const verifyPasswordCall = (id: string): Promise<VerifyResetLinkType> => {
	const timeStamp = new Date();
	return axios
		.post('/api/VerifyResetLink', {
			id,
			timeStamp: timeStamp.toJSON()
		})
		.then(response => {
			return response.data;
		});
};

const resetPasswordCall = (
	password: string,
	id: string
): Promise<VerifyPasswordResponseType> => {
	return axios
		.post('/api/SetNewPassword', {
			password,
			id
		})
		.then(response => {
			return response.data;
		});
};

export function* verifyEmail(action: ActionVerifyEmail): VerifyEmailType {
	const response: VerifyEmailResponseType = yield call(verifyEmailCall, action.value);
	if (response.success) {
		yield put(verifyEmailActions.setResult(true));
	} else {
		yield put(verifyEmailActions.setResult(false));
	}
}
export function* verifyPassword(action: ActionVerifyPassword): VerifyPasswordType {
	const response: VerifyResetLinkType = yield call(verifyPasswordCall, action.value);
	if (response.success) {
		yield put(verifyPasswordActions.setResult(true, response.id));
	} else {
		yield put(verifyPasswordActions.setResult(false));
	}
}

function* submitNewPassword(): SubmitNewPasswordType {
	const password: string = yield select(state => state.resetPassword.password);
	const token: string = yield select(state => state.resetPassword.token);
	const response: VerifyPasswordResponseType = yield call(
		resetPasswordCall,
		password,
		token
	);
	if (response.success) {
		yield put(
			messageActions.setPopup(
				'Your Password has been sucessfully reset',
				MessageTypeDef.SUCCESS
			)
		);
	} else if (response.error) {
		yield put(messageActions.setPopup(response.error, MessageTypeDef.ERROR));
	} else {
		yield put(messageActions.setPopup('Unknown Error', MessageTypeDef.ERROR));
	}
}

export default function* verifyEmailListener(): VerifyEmailListenerType {
	yield all([
		yield takeLeading(VerifyEmailTypes.VERIFYEMAIL, verifyEmail),
		yield takeLeading(ResetPasswordTypes.VERIFYPASSWORD, verifyPassword),
		yield takeLeading(ResetPasswordTypes.SUBMITNEWPASSWORD, submitNewPassword)
	]);
}
