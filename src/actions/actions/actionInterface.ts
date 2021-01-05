import { ReactSelectArray } from '../../utils/localTypes';
import { Data } from '../../utils/dataTypes';

export enum MainTypes {
	SETTAB = 'MAIN/SETTAB',
	SETDATASLIDER = 'MAIN/SETDATASLIDER',
	SETMINUTESSLIDER = 'MAIN/SETMINUTESSLIDER',
	SETMESSAGESSLIDER = 'MAIN/SETMESSAGESSLIDER',
	SETDATA = 'MAIN/SETDATA',
	SETMINUTES = 'MAIN/SETMINUTES',
	SETMESSAGES = 'MAIN/SETMESSAGES',
	SETTEXT = 'MAIN/SETTEXT',
	UPDATESEARCHFIELD = 'MAIN/UPDATESEARCHFIELD',
	UPDATEURL = 'MAIN/UPDATEURL',
	GETMAINTOPPLANS = 'MAIN/GETMAINTOPPLANS',
	MAINLOADEDTOPPLANS = 'MAIN/MAINLOADEDTOPPLANS'
}

export interface ActionMainLoadedTopPlans {
	type: MainTypes.MAINLOADEDTOPPLANS;
	value: Array<Data>;
}

export interface ActionGetMainTopPlans {
	type: MainTypes.GETMAINTOPPLANS;
}

export interface ActionUpdateURL {
	type: MainTypes.UPDATEURL;
	value: string;
}

export interface ActionUpdateSearchField {
	type: MainTypes.UPDATESEARCHFIELD;
	value: Array<string>;
}

export interface ActionSetTab {
	type: MainTypes.SETTAB;
	value: number;
}

export interface ActionSetDataSlider {
	type: MainTypes.SETDATASLIDER;
	value: number;
	data: number;
}

export interface ActionSetMinutesSlider {
	type: MainTypes.SETMINUTESSLIDER;
	value: number;
	data: number | string;
}

export interface ActionSetMessagesSliders {
	type: MainTypes.SETMESSAGESSLIDER;
	value: number;
	data: number | string;
}

export interface ActionSetText {
	type: MainTypes.SETTEXT;
	value: ReactSelectArray;
}

export type AllMainActions =
	| ActionGetMainTopPlans
	| ActionMainLoadedTopPlans
	| ActionSetDataSlider
	| ActionSetMessagesSliders
	| ActionSetMinutesSlider
	| ActionSetTab
	| ActionSetText
	| ActionUpdateSearchField
	| ActionUpdateURL;
