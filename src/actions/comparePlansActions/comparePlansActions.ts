import { Plan } from '../../utils/dataTypes';
import {
	CompareTypes,
	ActionAddToCompareList,
	ActionRemoveFromCompareList
} from './comparePlansInterface';

/* This file holds all the Plan compare actions */

// Compare Actions
export const addToCompareList = (value: Plan): ActionAddToCompareList => ({
	type: CompareTypes.ADD,
	value
});

export const removeFromCompareList = (value: number): ActionRemoveFromCompareList => ({
	type: CompareTypes.REMOVE,
	value
});
