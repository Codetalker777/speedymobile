import {
	FeedbackTypes,
	AllFeedbackActions
} from '../../actions/feedbackActions/feedbackInterface';
import { FeedbackState } from './feedbackTypes';
/* the state on app mount */
const intialState: FeedbackState = {
	valueNextPurchase: '5',
	somethingmissing: '',
	recommend: '5',
	development: ''
};

/* the following actions trigger changes in the state */
export default (state = intialState, action: AllFeedbackActions): FeedbackState => {
	switch (action.type) {
		case FeedbackTypes.VALUE: {
			return { ...state, valueNextPurchase: action.value };
		}
		case FeedbackTypes.MISSING: {
			return { ...state, somethingmissing: action.value };
		}
		case FeedbackTypes.RECOMMEND: {
			return { ...state, recommend: action.value };
		}
		case FeedbackTypes.DEVELOPMENT: {
			return { ...state, development: action.value };
		}
		case FeedbackTypes.RESET: {
			return { ...intialState };
		}
		default:
			return { ...state };
	}
};
