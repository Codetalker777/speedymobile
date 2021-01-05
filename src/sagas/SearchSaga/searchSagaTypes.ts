import {
	CallEffect,
	PutEffect,
	SelectEffect,
	ForkEffect,
	AllEffect
} from 'redux-saga/effects';
import {
	ActionSetPhones,
	ActionSetProvider,
	ActionSetContract,
	ActionBasicSearch
} from '../../actions/searchActions/searchInterface';
import { ReactSelectArray } from '../../utils/localTypes';
import { Data } from '../../utils/dataTypes';

export type SetPhonesType = Generator<
	CallEffect<string[]> | PutEffect<ActionSetPhones>,
	void,
	string[]
>;

export type UpdateOperatingSystemType = Generator<
	SelectEffect | CallEffect<void>,
	void,
	ReactSelectArray | string
>;

export type UpdatePhonesType = Generator<CallEffect<void> | SelectEffect, void, string>;

export type UpdateProviderType = Generator<CallEffect<void>, void, string[]>;

export type SetProviderType = Generator<
	CallEffect<string[]> | PutEffect<ActionSetProvider>,
	void,
	string[]
>;

export type InitialLoadType = Generator<ForkEffect<void>, void, unknown>;

export type SetContractType = Generator<
	CallEffect<string[]> | PutEffect<ActionSetContract>,
	void,
	string[]
>;

export type GetDataType = Generator<
	CallEffect<SearchResponseType> | PutEffect<ActionBasicSearch>,
	void,
	SearchResponseType
>;

export interface SearchResponseType {
	data: Array<{ data: Array<Data>; type: string }>;
	searchNumber: number;
	similarResults?: Array<{ data: Array<Data>; type: string }>;
}

export type SearchListener = Generator<
	| ForkEffect<never>
	| AllEffect<SearchResponseType & string[] & string & ReactSelectArray>,
	void,
	SearchResponseType & string[] & string & ReactSelectArray
>;
