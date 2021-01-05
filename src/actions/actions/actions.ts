import UrlSetter from '../../utils/dataFunctions/url';
import {
	dataTranslate,
	minmsgTranslate
} from '../../utils/dataFunctions/tabToValueConversions';
import { ReactSelectArray } from '../../utils/localTypes';
import { Data } from '../../utils/dataTypes';
import {
	MainTypes,
	ActionGetMainTopPlans,
	ActionMainLoadedTopPlans,
	ActionSetDataSlider,
	ActionSetMessagesSliders,
	ActionSetMinutesSlider,
	ActionSetTab,
	ActionSetText,
	ActionUpdateSearchField,
	ActionUpdateURL
} from './actionInterface';

/* this page holds all the actions for the main page */

export const mainLoadedTopPlans = (value: Array<Data>): ActionMainLoadedTopPlans => ({
	type: MainTypes.MAINLOADEDTOPPLANS,
	value
});

//
export const getMainTopPlans = (): ActionGetMainTopPlans => ({
	type: MainTypes.GETMAINTOPPLANS
});

// sets the url for the search results page
export const updateUrl = (
	phones: ReactSelectArray,
	dataRequested: number | string,
	minutesRequested: number | string,
	messagesRequested: number | string,
	monthlyCost: number,
	upFrontCost: number,
	providers: ReactSelectArray,
	contracts: ReactSelectArray,
	searchCriteria: string,
	page: number,
	operatingSystem: string
): ActionUpdateURL => ({
	type: MainTypes.UPDATEURL,
	value: UrlSetter(
		phones,
		dataRequested,
		minutesRequested,
		messagesRequested,
		monthlyCost,
		upFrontCost,
		providers,
		contracts,
		searchCriteria,
		operatingSystem,
		page
	)
});

export const updateSearchField = (value: Array<string>): ActionUpdateSearchField => ({
	type: MainTypes.UPDATESEARCHFIELD,
	value
});

export const setTab = (value: number): ActionSetTab => ({
	type: MainTypes.SETTAB,
	value
});

export const setDataSlider = (value: number): ActionSetDataSlider => ({
	type: MainTypes.SETDATASLIDER,
	value,
	data: dataTranslate(value)
});

export const setMinutesSlider = (value: number): ActionSetMinutesSlider => ({
	type: MainTypes.SETMINUTESSLIDER,
	value,
	data: minmsgTranslate(value)
});

export const setMessagesSlider = (value: number): ActionSetMessagesSliders => ({
	type: MainTypes.SETMESSAGESSLIDER,
	value,
	data: minmsgTranslate(value)
});

export const setText = (value: ReactSelectArray): ActionSetText => ({
	type: MainTypes.SETTEXT,
	value
});
