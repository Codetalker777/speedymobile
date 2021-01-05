import { IndividualPhone } from '../../utils/dataTypes';

export enum PhonesTypes {
	GETPHONEPLANS = 'PHONE/GETPHONES',
	SETPHONEPLANS = 'PHONE/SETPHONE'
}

export interface ActionSetPhonePlans {
	type: PhonesTypes.SETPHONEPLANS;
	value: IndividualPhone | null;
}

export interface ActionGetPhonePlans {
	type: PhonesTypes.GETPHONEPLANS;
	slug: string;
}

export type AllPhoneTypes = ActionSetPhonePlans | ActionGetPhonePlans;
