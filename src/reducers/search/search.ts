import {
	SearchActionType,
	AllSearchActions
} from '../../actions/searchActions/searchInterface';
import { SearchState } from './searchTypes';

/* contains all the definition for all of the variables used in the search results page */

/* the state on app mount */
const intialState: SearchState = {
	searchType: null,
	dataRequested: 0,
	minutesRequested: 0,
	messagesRequested: 0,
	searchText: [],
	basicSearch: [],
	upFrontSlider: 9,
	upFrontCost: 'Any',
	monthlySlider: 9,
	monthlyCost: 'Any',
	loading: true,
	phones: [],
	providers: [],
	contracts: [],
	phoneText: [],
	providersText: [],
	contractsText: [],
	searchCriteria: '',
	checkbox1: false,
	checkbox2: false,
	checkbox3: false,
	page: 1,
	nextPageURL: '',
	prevPageURL: '',
	searchNumber: 0,
	allOS: false,
	ios: false,
	android: false,
	operatingSystem: '',
	similarResults: undefined
};

/* the following actions trigger changes in the state */

export default (state = intialState, action: AllSearchActions): SearchState => {
	switch (action.type) {
		case SearchActionType.ALLOS:
			return { ...state, allOS: true, ios: false, android: false, operatingSystem: '' };
		case SearchActionType.IOSOS:
			return {
				...state,
				allOS: false,
				ios: true,
				android: false,
				operatingSystem: 'iPhone'
			};
		case SearchActionType.ANDROIDOS:
			return {
				...state,
				allOS: false,
				ios: false,
				android: true,
				operatingSystem: 'Android'
			};
		case SearchActionType.UPDATEPAGE:
			return { ...state, page: action.page };
		case SearchActionType.PREVPAGE:
			return { ...state, prevPageURL: action.pageURL };
		case SearchActionType.NEXTPAGE:
			return { ...state, nextPageURL: action.pageURL };
		case SearchActionType.CHECKBOX1:
			return { ...state, checkbox1: true, checkbox2: false, checkbox3: false };
		case SearchActionType.CHECKBOX2:
			return { ...state, checkbox1: false, checkbox2: true, checkbox3: false };
		case SearchActionType.CHECKBOX3:
			return { ...state, checkbox1: false, checkbox2: false, checkbox3: true };
		case SearchActionType.SETCRITERIA:
			return { ...state, searchCriteria: action.value };
		case SearchActionType.SETMONTHLYSLIDER:
			return { ...state, monthlySlider: action.value };
		case SearchActionType.SETUPFRONTSLIDER:
			return { ...state, upFrontSlider: action.value };
		case SearchActionType.PHONETEXT:
			return { ...state, phoneText: action.value };
		case SearchActionType.PROVIDERTEXT:
			return { ...state, providersText: action.value };
		case SearchActionType.CONTRACTTEXT:
			return { ...state, contractsText: action.value };
		case SearchActionType.SETPHONES:
			return { ...state, phones: action.value };
		case SearchActionType.SETCONTRACT:
			return { ...state, contracts: action.value };
		case SearchActionType.SETPROVIDER:
			return { ...state, providers: action.value };
		case SearchActionType.RESET:
			return {
				...intialState
			};
		case SearchActionType.UPFRONTCOST:
			return {
				...state,
				upFrontSlider: action.slider,
				upFrontCost: action.amount
			};
		case SearchActionType.MONTHLYCOST:
			return {
				...state,
				monthlySlider: action.slider,
				monthlyCost: action.amount
			};
		case SearchActionType.UPDATERESULTS:
			return {
				...state,
				searchText: action.searchText,
				dataRequested: action.data,
				minutesRequested: action.minutes,
				messagesRequested: action.messages,
				phoneText: action.phoneText,
				monthlyCost: action.monthly,
				upFrontCost: action.upfront,
				providersText: action.providers,
				contractsText: action.contract,
				allOS: action.os.allOS,
				ios: action.os.ios,
				android: action.os.android,
				operatingSystem: action.os.operatingSystem
			};
		case SearchActionType.BASICSEARCH:
			return {
				...state,
				basicSearch: action.value,
				searchNumber: action.searchNumber,
				loading: false,
				similarResults: action.similarResults
			};
		default:
			return { ...state };
	}
};
