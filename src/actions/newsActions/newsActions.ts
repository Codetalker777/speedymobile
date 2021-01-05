import {
	ActionDownloadMainNews,
	ActionSetDownloadMainNews,
	ActionDownloadArticle,
	ActionResetArticle,
	ActionSetDownloadArticle,
	ActionSetFeaturedNewsPlans,
	NewsTypes
} from './newsInterface';
import { Data } from '../../utils/dataTypes';

export const NewsActions = {
	downloadMainNews: (page: number): ActionDownloadMainNews => ({
		type: NewsTypes.DOWNLOADMAINNEWS,
		page
	}),
	setDownloadMainNews: (
		data: Array<Record<string, any>>,
		totalPages?: number,
		error?: string
	): ActionSetDownloadMainNews => ({
		type: NewsTypes.SETDOWNLOADMAINNEWS,
		data,
		totalPages,
		error
	}),
	setDownloadArticle: (data: Record<string, any>): ActionSetDownloadArticle => ({
		type: NewsTypes.SETDOWNLOADARTICLE,
		data
	}),
	downloadArticle: (slug: string): ActionDownloadArticle => ({
		type: NewsTypes.DOWNLOADARTICLE,
		slug
	}),
	resetArticle: (): ActionResetArticle => ({
		type: NewsTypes.RESETARTICLE
	}),
	setFeaturedNewsPlans: (data: Data[]): ActionSetFeaturedNewsPlans => ({
		type: NewsTypes.SETFEATUREDNEWSPLANS,
		data
	})
};
