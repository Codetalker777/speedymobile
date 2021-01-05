import { CartType, IndividualPhone, Plan } from '../../utils/dataTypes';

export type CartState = {
	phones: IndividualPhone[];
	plans: Plan[];
	cart: CartType | null;
	loading: boolean;
};
