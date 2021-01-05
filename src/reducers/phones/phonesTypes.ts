import { IndividualPhone } from '../../utils/dataTypes';

export type PhonesState = {
	loading: boolean;
	data: IndividualPhone | null;
};
