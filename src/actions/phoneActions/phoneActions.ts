import { IndividualPhone } from '../../utils/dataTypes';
import { PhonesTypes, ActionGetPhonePlans, ActionSetPhonePlans } from './phoneInterface';

export const getPhone = (slug: string): ActionGetPhonePlans => ({
	type: PhonesTypes.GETPHONEPLANS,
	slug
});

export const setPhone = (value: IndividualPhone | null): ActionSetPhonePlans => ({
	type: PhonesTypes.SETPHONEPLANS,
	value
});
