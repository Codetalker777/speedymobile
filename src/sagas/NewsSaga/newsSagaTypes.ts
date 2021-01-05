import { CallEffect, PutEffect, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
	ActionSetDownloadMainNews,
	ActionSetDownloadArticle,
	ActionSetFeaturedNewsPlans
} from '../../actions/newsActions/newsInterface';
import { Data } from '../../utils/dataTypes';

export type SetFeaturedNewsPlans = Generator<
	CallEffect<FeaturedPlanNewsResponse> | PutEffect<ActionSetFeaturedNewsPlans>,
	void,
	FeaturedPlanNewsResponse
>;

export type MainNewsResponse = {
	data: Array<Record<string, any>>;
	totalPages?: number;
	error?: string;
};

export type GetMainNews = Generator<
	CallEffect<MainNewsResponse> | PutEffect<ActionSetDownloadMainNews>,
	void,
	MainNewsResponse
>;

export type GetArticle = Generator<
	CallEffect<Record<string, any>> | PutEffect<ActionSetDownloadArticle>,
	void,
	Record<string, any>
>;

export type NewsListener = Generator<
	ForkEffect<never> | AllEffect<Record<string, any>[]>,
	void,
	Record<string, any>[]
>;
export interface FeaturedPlanNewsResponse {
	data: Data[];
	success: boolean;
}
