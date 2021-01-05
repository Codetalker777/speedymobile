import { ReactSelectArray } from '../../utils/localTypes';
import { Data } from '../../utils/dataTypes';
import { SetOS } from '../../utils/dataFunctions/dataFunctions';

export enum SearchActionType {
	UPDATERESULTS = 'SEARCH/UPDATERESULTS',
	BASICSEARCH = 'SEARCH/BASICSEARCH',
	MONTHLYCOST = 'SEARCH/MONTHLYCOST',
	UPFRONTCOST = 'SEARCH/UPFRONTCOST',
	RESET = 'SEARCH/RESET',
	GETPHONES = 'SEARCH/GETPHONES',
	GETPROVIDER = 'SEARCH/GETPROVIDER',
	GETCONTRACT = 'SEARCH/GETCONTRACT',
	PHONETEXT = 'SEARCH/PHONETEXT',
	PROVIDERTEXT = 'SEARCH/PROVIDERTEXT',
	CONTRACTTEXT = 'SEARCH/CONTRACTTEXT',
	SETMONTHLYSLIDER = 'SEARCH/SETMONTHLYSLIDER',
	SETUPFRONTSLIDER = 'SEARCH/SETUPFRONTSLIDER',
	SETCRITERIA = 'SEARCH/SETCRITERIA',
	CHECKBOX1 = 'SEARCH/CHECKBOX1',
	CHECKBOX2 = 'SEARCH/CHECKBOX2',
	CHECKBOX3 = 'SEARCH/CHECKBOX3',
	SETPHONES = 'SEARCH/SETPHONES',
	SETPROVIDER = 'SEARCH/SETPROVIDER',
	SETCONTRACT = 'SEARCH/SETCONTRACT',
	PREVPAGE = 'SEARCH/PREVPAGE',
	NEXTPAGE = 'SEARCH/NEXTPAGE',
	UPDATEPAGE = 'SEARCH/UPDATEPAGE',
	ALLOS = 'SEARCH/ALLOS',
	IOSOS = 'SEARCH/IOSOS',
	ANDROIDOS = 'SEARCH/ANDROIDOS'
}

export interface ActionReset {
	type: SearchActionType.RESET;
}

export interface ActionAllOperatingSystems {
	type: SearchActionType.ALLOS;
}

export interface ActionIosOperatingSystem {
	type: SearchActionType.IOSOS;
}

export interface ActionAndroidOperatingSystem {
	type: SearchActionType.ANDROIDOS;
}

export interface ActionUpdatePage {
	type: SearchActionType.UPDATEPAGE;
	page: number;
}

export interface ActionNextPage {
	type: SearchActionType.NEXTPAGE;
	pageURL: string;
}

export interface ActionPrevPage {
	type: SearchActionType.PREVPAGE;
	pageURL: string;
}

export interface ActionSetCheckbox1 {
	type: SearchActionType.CHECKBOX1;
}

export interface ActionSetCheckbox2 {
	type: SearchActionType.CHECKBOX2;
}

export interface ActionSetCheckbox3 {
	type: SearchActionType.CHECKBOX3;
}

export interface ActionSetCriteria {
	type: SearchActionType.SETCRITERIA;
	value: string;
}

export interface ActionUpdateResults {
	type: SearchActionType.UPDATERESULTS;
	searchText: Array<string>;
	data: number | string;
	minutes: number | string;
	messages: number | string;
	monthly: number | string;
	upfront: number | string;
	phoneText: ReactSelectArray | string;
	providers: ReactSelectArray | string;
	contract: ReactSelectArray | string;
	criteria: string;
	page: number;
	operatingSystem: string;
	os: SetOS;
}

export interface ActionSetMonthlySlider {
	type: SearchActionType.SETMONTHLYSLIDER;
	value: number;
}

export interface ActionSetUpFrontSlider {
	type: SearchActionType.SETUPFRONTSLIDER;
	value: number;
}

export interface ActionSetPhoneText {
	type: SearchActionType.PHONETEXT;
	value: ReactSelectArray;
}

export interface ActionSetProviderText {
	type: SearchActionType.PROVIDERTEXT;
	value: ReactSelectArray;
}
export interface ActionSetContractText {
	type: SearchActionType.CONTRACTTEXT;
	value: ReactSelectArray;
}

export interface ActionSetContract {
	type: SearchActionType.SETCONTRACT;
	value: Array<string>;
}

export interface ActionGetContract {
	type: SearchActionType.GETCONTRACT;
}

export interface ActionSetProvider {
	type: SearchActionType.SETPROVIDER;
	value: Array<string>;
}

export interface ActionGetProvider {
	type: SearchActionType.GETPROVIDER;
}

export interface ActionSetPhones {
	type: SearchActionType.SETPHONES;
	value: Array<string>;
}

export interface ActionGetPhones {
	type: SearchActionType.GETPHONES;
}

export interface ActionBasicSearch {
	type: SearchActionType.BASICSEARCH;
	value: Array<{ data: Array<Data>; type: string }>;
	searchNumber: number;
	similarResults?: Array<{ data: Array<Data>; type: string }>;
}

export interface ActionSetMonthlyCost {
	type: SearchActionType.MONTHLYCOST;
	slider: number;
	amount: number | string;
}

export interface ActionSetUpFrontCost {
	type: SearchActionType.UPFRONTCOST;
	slider: number;
	amount: number | string;
}

export type Reset = ActionReset;

export type AllSearchActions =
	| ActionReset
	| ActionAllOperatingSystems
	| ActionAndroidOperatingSystem
	| ActionBasicSearch
	| ActionGetContract
	| ActionGetPhones
	| ActionGetProvider
	| ActionIosOperatingSystem
	| ActionNextPage
	| ActionPrevPage
	| ActionSetCheckbox1
	| ActionSetCheckbox2
	| ActionSetCheckbox3
	| ActionSetContract
	| ActionSetContractText
	| ActionSetCriteria
	| ActionSetMonthlyCost
	| ActionSetMonthlySlider
	| ActionSetPhoneText
	| ActionSetPhones
	| ActionSetProvider
	| ActionSetProviderText
	| ActionSetUpFrontCost
	| ActionSetUpFrontSlider
	| ActionUpdatePage
	| ActionUpdateResults;
