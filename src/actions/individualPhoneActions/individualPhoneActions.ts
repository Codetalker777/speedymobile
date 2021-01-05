import {
	ActionGetPhones,
	ActionSetPhones,
	ActionSetFilter,
	IndividualPhoneTypes
} from './individualPhoneInterface';
import { IndividualPhone } from '../../utils/dataTypes';

export const getPhones = (): ActionGetPhones => ({
	type: IndividualPhoneTypes.GETPHONES
});

export const setPhones = (value: IndividualPhone[]): ActionSetPhones => ({
	type: IndividualPhoneTypes.SETPHONES,
	value
});

export const setFilter = (value: IndividualPhone[]): ActionSetFilter => ({
	type: IndividualPhoneTypes.SETFILTER,
	value
});
