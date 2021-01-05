import { IndividualPhone } from '../../utils/dataTypes';
import {
	CompareTypes,
	ActionAddToCompareList,
	ActionRemoveFromCompareList
} from './comparePhonesInterface';

/* This file holds all the checkout actions */

// Subscribition Actions
export const addToPhonesCompareList = (value: IndividualPhone): ActionAddToCompareList => ({
	type: CompareTypes.ADD,
	value
});

export const removeFromPhonesCompareList = (value: number): ActionRemoveFromCompareList => ({
	type: CompareTypes.REMOVE,
	value
});
