import {
	PlanTypes,
	ActionGetPlan,
	ActionResetPlan,
	ActionSetPlan
} from './planInterface';
import { Plan } from '../../utils/dataTypes';

/* this file holds all the plan details actions */

export const getPlan = (value: string): ActionGetPlan => ({
	type: PlanTypes.GETPLAN,
	value
});

export const setPlan = (value: Plan): ActionSetPlan => ({
	type: PlanTypes.SETPLAN,
	value
});

export const reset = (): ActionResetPlan => ({
	type: PlanTypes.RESET
});
