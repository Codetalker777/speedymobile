import {
	ActionGetPlans,
	ActionSetPlans,
	ActionSetFilter,
	IndividualPlanTypes
} from './individualPlanInterface';
import { Plan } from '../../utils/dataTypes';

export const getPlans = (): ActionGetPlans => ({
	type: IndividualPlanTypes.GETPLANS
});

export const setPlans = (value: Plan[]): ActionSetPlans => ({
	type: IndividualPlanTypes.SETPLANS,
	value
});

export const setFilter = (value: Plan[]): ActionSetFilter => ({
	type: IndividualPlanTypes.SETFILTER,
	value
});
