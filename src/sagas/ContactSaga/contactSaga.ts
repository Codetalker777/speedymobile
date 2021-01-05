import { all, takeLatest, call, put } from 'redux-saga/effects';
import axios from '../../utils/api';
import {
	ContactTypes,
	ActionSendContactForm
} from '../../actions/contactActions/contactInterface';
import { contactFormType, ContactListener } from './contactSagaTypes';
import { messageActions } from '../../actions/messageActions/messageActions';
import { MessageTypeDef } from '../../reducers/messages/messagesTypes';

const submitContactForm = (
	name: string,
	email: string,
	phoneNumber: string,
	message: string
): Promise<{ success: boolean; error?: string }> => {
	return axios
		.post('/api/Contact', null, {
			params: {
				name,
				email,
				phoneNumber,
				message
			}
		})
		.then(response => {
			return response.data;
		});
};

export function* contactForm(action: ActionSendContactForm): contactFormType {
	const result: { success: boolean; error?: string } = yield call(
		submitContactForm,
		action.name,
		action.email,
		action.phoneNumber,
		action.message
	);
	if (!result.success) {
		if (result.error) {
			yield put(messageActions.setPopup(result.error, MessageTypeDef.ERROR));
		} else {
			yield put(
				messageActions.setPopup('Failed to submit Contact Form', MessageTypeDef.ERROR)
			);
		}
	} else {
		yield put(
			messageActions.setPopup(
				'Successfully Submitted Contact Form',
				MessageTypeDef.SUCCESS
			)
		);
	}
}

// main listener function
export default function* contactSaga(): ContactListener {
	yield all([yield takeLatest(ContactTypes.SENDCONTACTFORM, contactForm)]);
}
