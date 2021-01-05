import UrlSetter from '../../utils/dataFunctions/url';
import { ReactSelectArray } from '../../utils/localTypes';
import {
	SearchActionType,
	ActionReset,
	ActionAllOperatingSystems,
	ActionAndroidOperatingSystem,
	ActionBasicSearch,
	ActionGetContract,
	ActionGetPhones,
	ActionGetProvider,
	ActionIosOperatingSystem,
	ActionNextPage,
	ActionPrevPage,
	ActionSetCheckbox1,
	ActionSetCheckbox2,
	ActionSetCheckbox3,
	ActionSetContract,
	ActionSetContractText,
	ActionSetCriteria,
	ActionSetMonthlyCost,
	ActionSetMonthlySlider,
	ActionSetPhoneText,
	ActionSetPhones,
	ActionSetProvider,
	ActionSetProviderText,
	ActionSetUpFrontCost,
	ActionSetUpFrontSlider,
	ActionUpdatePage,
	ActionUpdateResults
} from './searchInterface';
import {
	upfrontRate,
	monthlyRate
} from '../../utils/dataFunctions/tabToValueConversions';
import { setOS, setLabels } from '../../utils/dataFunctions/dataFunctions';
import { Data } from '../../utils/dataTypes';

/* this file contains all the actions for the search Results page */

export const allOperatingSystems = (): ActionAllOperatingSystems => ({
	type: SearchActionType.ALLOS
});

export const iOSOperatingSystem = (): ActionIosOperatingSystem => ({
	type: SearchActionType.IOSOS
});

export const androidOperatingSystem = (): ActionAndroidOperatingSystem => ({
	type: SearchActionType.ANDROIDOS
});

export const updatePage = (page: number): ActionUpdatePage => ({
	type: SearchActionType.UPDATEPAGE,
	page
});

export const nextPage = (
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
): ActionNextPage => ({
	type: SearchActionType.NEXTPAGE,
	pageURL: UrlSetter(
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

export const prevPage = (
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
): ActionPrevPage => ({
	type: SearchActionType.PREVPAGE,
	pageURL: UrlSetter(
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

export const setCheckbox1 = (): ActionSetCheckbox1 => ({
	type: SearchActionType.CHECKBOX1
});

export const setCheckbox2 = (): ActionSetCheckbox2 => ({
	type: SearchActionType.CHECKBOX2
});

export const setCheckbox3 = (): ActionSetCheckbox3 => ({
	type: SearchActionType.CHECKBOX3
});

export const setCriteria = (value: string): ActionSetCriteria => ({
	type: SearchActionType.SETCRITERIA,
	value
});

// called when you make another search
export const updateResults = (
	searchText: Array<string>,
	data: number | string,
	minutes: number | string,
	messages: number | string,
	monthly: number | string,
	upfront: number | string,
	providers: Array<string> | undefined,
	contract: Array<string> | undefined,
	criteria: string,
	page: number,
	operatingSystem: string
): ActionUpdateResults => ({
	type: SearchActionType.UPDATERESULTS,
	searchText,
	data,
	minutes,
	messages,
	phoneText: setLabels(searchText),
	monthly: monthly !== 'null' ? monthly : 'Any',
	upfront: upfront !== 'null' ? upfront : 'Any',
	providers: providers !== undefined ? setLabels(providers) : '',
	contract: contract !== undefined ? setLabels(contract) : '',
	criteria,
	page,
	operatingSystem,
	os: setOS(operatingSystem)
});

export const setMonthlySlider = (value: number): ActionSetMonthlySlider => ({
	type: SearchActionType.SETMONTHLYSLIDER,
	value
});

export const setUpFrontSlider = (value: number): ActionSetUpFrontSlider => ({
	type: SearchActionType.SETUPFRONTSLIDER,
	value
});

export const setPhoneText = (value: ReactSelectArray): ActionSetPhoneText => ({
	type: SearchActionType.PHONETEXT,
	value
});

export const setProviderText = (value: ReactSelectArray): ActionSetProviderText => ({
	type: SearchActionType.PROVIDERTEXT,
	value
});

export const setContractText = (value: ReactSelectArray): ActionSetContractText => ({
	type: SearchActionType.CONTRACTTEXT,
	value
});

export const setContract = (value: Array<string>): ActionSetContract => ({
	type: SearchActionType.SETCONTRACT,
	value
});

export const getContract = (): ActionGetContract => ({
	type: SearchActionType.GETCONTRACT
});

export const setProvider = (value: Array<string>): ActionSetProvider => ({
	type: SearchActionType.SETPROVIDER,
	value
});

export const getProvider = (): ActionGetProvider => ({
	type: SearchActionType.GETPROVIDER
});

export const setPhones = (value: Array<string>): ActionSetPhones => ({
	type: SearchActionType.SETPHONES,
	value
});

export const getPhones = (): ActionGetPhones => ({
	type: SearchActionType.GETPHONES
});

export const basicSearch = (
	value: Array<{ data: Array<Data>; type: string }>,
	searchNumber: number,
	similarResults?: Array<{ data: Array<Data>; type: string }>
): ActionBasicSearch => ({
	type: SearchActionType.BASICSEARCH,
	value,
	searchNumber,
	similarResults
});

export const setMonthlyCost = (slider: number): ActionSetMonthlyCost => ({
	type: SearchActionType.MONTHLYCOST,
	slider,
	amount: monthlyRate(slider)
});

export const setUpFrontCost = (slider: number): ActionSetUpFrontCost => ({
	type: SearchActionType.UPFRONTCOST,
	slider,
	amount: upfrontRate(slider)
});

export const reset = (): ActionReset => ({
	type: SearchActionType.RESET
});
