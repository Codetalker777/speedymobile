import { END } from 'redux-saga';
import { MainTypes, AllMainActions } from '../../actions/actions/actionInterface';
import { MainState } from './mainTypes';

import { Reset, SearchActionType } from '../../actions/searchActions/searchInterface';
/* contains all the definition for all of the variables used in the main page */

/* the state on app mount */
const intialState: MainState = {
	dataRequested: 0,
	minutesRequested: 0,
	messagesRequested: 0,
	dataSlider: 0,
	minutesSlider: 0,
	messagesSlider: 0,
	searchText: [],
	tab: 0,
	phones: [],
	URL: '',
	topPlans: [],
	loadingPlans: true
};

/* the following actions trigger changes in the state */
export default (
	state = intialState,
	action: Reset | AllMainActions | END
): MainState => {
	switch (action.type) {
		case SearchActionType.RESET:
			return { ...intialState };
		case MainTypes.MAINLOADEDTOPPLANS:
			return { ...state, topPlans: action.value, loadingPlans: false };
		case MainTypes.UPDATEURL:
			return { ...state, URL: action.value };
		case MainTypes.UPDATESEARCHFIELD:
			return { ...state, phones: action.value };
		case MainTypes.SETTAB:
			return { ...state, tab: action.value };
		case MainTypes.SETTEXT:
			return { ...state, searchText: action.value };
		case MainTypes.SETDATASLIDER:
			return { ...state, dataRequested: action.data, dataSlider: action.value };
		case MainTypes.SETMINUTESSLIDER:
			return {
				...state,
				minutesRequested: action.data,
				minutesSlider: action.value
			};
		case MainTypes.SETMESSAGESSLIDER:
			return {
				...state,
				messagesRequested: action.data,
				messagesSlider: action.value
			};
		default:
			return { ...state };
	}
};
