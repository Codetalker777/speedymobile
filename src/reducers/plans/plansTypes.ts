import { Plan } from '../../utils/dataTypes';

export type PlanState = {
	loading: boolean;
	plan?: Plan | null;
};
