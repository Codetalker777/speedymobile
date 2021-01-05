import { CallEffect, PutEffect, ForkEffect, AllEffect } from 'redux-saga/effects';
import { IndividualPhone } from '../../utils/dataTypes';
import { ActionSetSearchTerms } from '../../actions/topNavSearchActions/topNavSearchInterface';

export type GetSearchTermsType = Generator<
	CallEffect<IndividualPhone[]> | PutEffect<ActionSetSearchTerms>,
	void,
	IndividualPhone[]
>;

export type SearchTermListener = Generator<
	ForkEffect<never> | AllEffect<any>,
	void,
	any
>;
