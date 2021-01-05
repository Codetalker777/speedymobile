import { IndividualPhone } from '../../utils/dataTypes';

export enum IndividualPhoneTypes {
	GETPHONES = 'INDIVIDUALPHONE/GETPHONES',
	SETPHONES = 'INDIVIDUALPHONE/SETPHONES',
	SETFILTER = 'INDIVIDUALPHONE/SETFILTER'
}

export interface ActionGetPhones {
	type: IndividualPhoneTypes.GETPHONES;
}

export interface ActionSetPhones {
	type: IndividualPhoneTypes.SETPHONES;
	value: IndividualPhone[];
}

export interface ActionSetFilter {
	type: IndividualPhoneTypes.SETFILTER;
	value: IndividualPhone[];
}

export type AllIndividualPhonesActions =
	| ActionGetPhones
	| ActionSetPhones
	| ActionSetFilter;
