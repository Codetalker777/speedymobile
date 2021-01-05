import { CallEffect, PutEffect, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
	ActionUpdateSearchField,
	ActionMainLoadedTopPlans
} from '../../actions/actions/actionInterface';
import { ActionSetCriteria } from '../../actions/searchActions/searchInterface';
import { Data, IndividualPhone, Plan } from '../../utils/dataTypes';
import { ActionSetPhones } from '../../actions/individualPhoneActions/individualPhoneInterface';
import { ActionSetPlans } from '../../actions/individualPlanActions/individualPlanInterface';

export type GetSearchDataType = Generator<
	CallEffect<string[]> | PutEffect<ActionUpdateSearchField>,
	void,
	string[]
>;

export type GetSearchTypeDefiniton = Generator<
	PutEffect<ActionSetCriteria>,
	void,
	unknown
>;

export type GetTopPlansType = Generator<
	CallEffect<Data[]> | PutEffect<ActionMainLoadedTopPlans>,
	void,
	Data[]
>;

export type GetPhonesCarosuelType = Generator<
	CallEffect<IndividualPhone[]> | PutEffect<ActionSetPhones>,
	void,
	IndividualPhone[]
>;

export type GetPlansCarosuelType = Generator<
	CallEffect<Plan[]> | PutEffect<ActionSetPlans>,
	void,
	Plan[]
>;

export type RootListener = Generator<
	ForkEffect<never> | AllEffect<unknown>,
	void,
	Data[] | unknown | string[]
>;
