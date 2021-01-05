import { Plan } from '../../utils/dataTypes';

export enum PlanTypes {
	GETPLAN = 'PLAN/GETPLAN',
	SETPLAN = 'PLAN/SETPLAN',
	RESET = 'PLAN/RESET'
}

export interface ActionGetPlan {
	type: PlanTypes.GETPLAN;
	value: string;
}

export interface ActionSetPlan {
	type: PlanTypes.SETPLAN;
	value: Plan;
}

export interface ActionResetPlan {
	type: PlanTypes.RESET;
}

export type AllPlanActions = ActionGetPlan | ActionSetPlan | ActionResetPlan;
