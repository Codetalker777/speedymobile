import { Data } from '../../utils/dataTypes';

export type NewsState = {
	newsMainData: Array<Record<string, any>> | null;
	loadingMain: boolean;
	newsArticle: Record<string, any> | null;
	loadingArticle: boolean;
	totalPages?: number | null;
	error?: string | null;
	loadingFeaturedPlans: boolean;
	featuredPlans: Data[] | null;
};
