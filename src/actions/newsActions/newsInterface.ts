import { Data } from '../../utils/dataTypes';

export enum NewsTypes {
	DOWNLOADMAINNEWS = 'NEWS/DOWNLOADMAINNEWS',
	SETDOWNLOADMAINNEWS = 'NEWS/SETDOWNLOADMAINNEWS',
	DOWNLOADARTICLE = 'NEWS/DOWNLOADARTICLE',
	SETDOWNLOADARTICLE = 'NEWS/SETDOWNLOADARTICLE',
	RESETARTICLE = 'NEWS/RESETARTICLE',
	SETFEATUREDNEWSPLANS = 'NEWS/SETFEATUREDNEWSPLANS'
}

export interface ActionSetFeaturedNewsPlans {
	type: NewsTypes.SETFEATUREDNEWSPLANS;
	data: Data[];
}

export interface ActionDownloadMainNews {
	type: NewsTypes.DOWNLOADMAINNEWS;
	page: number;
}

export interface ActionSetDownloadMainNews {
	type: NewsTypes.SETDOWNLOADMAINNEWS;
	data: Array<Record<string, any>>;
	totalPages?: number;
	error?: string;
}

export interface ActionDownloadArticle {
	type: NewsTypes.DOWNLOADARTICLE;
	slug: string;
}

export interface ActionSetDownloadArticle {
	type: NewsTypes.SETDOWNLOADARTICLE;
	data: Record<string, any>;
}

export interface ActionResetArticle {
	type: NewsTypes.RESETARTICLE;
}

export type AllNewsActions =
	| ActionDownloadMainNews
	| ActionSetDownloadMainNews
	| ActionDownloadArticle
	| ActionSetDownloadArticle
	| ActionResetArticle
	| ActionSetFeaturedNewsPlans;
