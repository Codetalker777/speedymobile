import { CallEffect, PutEffect, ForkEffect, AllEffect } from 'redux-saga/effects';
import { Plan } from '../../utils/dataTypes';
import { ActionSetPlan } from '../../actions/planActions/planInterface';

export type GetSelectedPlanType = Generator<
	CallEffect<Plan> | PutEffect<ActionSetPlan>,
	void,
	Plan
>;

export type PlanListener = Generator<ForkEffect<never> | AllEffect<Plan>, void, Plan>;
