import { IndividualPhone } from '../../utils/dataTypes';

export enum TopNavSearchTypes {
	GETSEARCHTERMS = 'TOPNAVSEARCH/GETSEARCHTERMS',
	SETSEARCHTERMS = 'TOPNAVSEARCH/SETSEARCHTERMS'
}

export interface ActionGetSearchTerms {
	type: TopNavSearchTypes.GETSEARCHTERMS;
}

export interface ActionSetSearchTerms {
	type: TopNavSearchTypes.SETSEARCHTERMS;
	data: IndividualPhone[];
}

export type AllTopNavSearchActions = ActionGetSearchTerms | ActionSetSearchTerms;
