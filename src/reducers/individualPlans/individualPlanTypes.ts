import { Plan } from '../../utils/dataTypes';

export type IndividualPlanState = {
	plans?: Plan[] | null;
	filteredPlans?: Plan[] | null;
};
