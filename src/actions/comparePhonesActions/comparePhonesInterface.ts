import { IndividualPhone } from '../../utils/dataTypes';

export enum CompareTypes {
	ADD = 'COMPAREPHONES/ADD',
	REMOVE = 'COMPAREPHONES/REMOVE'
}

export interface ActionAddToCompareList {
	type: CompareTypes.ADD;
	value: IndividualPhone;
}

export interface ActionRemoveFromCompareList {
	type: CompareTypes.REMOVE;
	value: number;
}

export type AllCompareActions = ActionAddToCompareList | ActionRemoveFromCompareList;
