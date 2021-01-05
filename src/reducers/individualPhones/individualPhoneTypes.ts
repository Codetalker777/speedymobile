import { IndividualPhone } from '../../utils/dataTypes';

export type IndividualPhoneState = {
	phones?: IndividualPhone[] | null;
	filteredPhones?: IndividualPhone[] | null;
};
