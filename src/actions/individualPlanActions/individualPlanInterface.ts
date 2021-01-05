import { Plan } from '../../utils/dataTypes';

export enum IndividualPlanTypes {
	GETPLANS = 'INDIVIDUALPLAN/GETPLANS',
	SETPLANS = 'INDIVIDUALPLAN/SETPLANS',
	SETFILTER = 'INDIVIDUALPLAN/SETFILTER'
}

export interface ActionGetPlans {
	type: IndividualPlanTypes.GETPLANS;
}

export interface ActionSetPlans {
	type: IndividualPlanTypes.SETPLANS;
	value: Plan[];
}

export interface ActionSetFilter {
	type: IndividualPlanTypes.SETFILTER;
	value: Plan[];
}

export type AllIndividualPlanActions = ActionGetPlans | ActionSetPlans | ActionSetFilter;
