import { Plan } from '../../utils/dataTypes';

export enum CompareTypes {
	ADD = 'COMPARE/ADD',
	REMOVE = 'COMPARE/REMOVE'
}

export interface ActionAddToCompareList {
	type: CompareTypes.ADD;
	value: Plan;
}

export interface ActionRemoveFromCompareList {
	type: CompareTypes.REMOVE;
	value: number;
}

export type AllCompareActions = ActionAddToCompareList | ActionRemoveFromCompareList;
