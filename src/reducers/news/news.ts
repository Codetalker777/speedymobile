import { NewsState } from './newsTypes';
import { AllNewsActions, NewsTypes } from '../../actions/newsActions/newsInterface';
/* the state on app mount */
const intialState: NewsState = {
	newsMainData: null,
	loadingMain: true,
	newsArticle: null,
	loadingArticle: true,
	totalPages: null,
	error: null,
	loadingFeaturedPlans: true,
	featuredPlans: null
};

/* the following actions trigger changes in the state */

export default (state = intialState, action: AllNewsActions): NewsState => {
	switch (action.type) {
		case NewsTypes.SETDOWNLOADARTICLE:
			return { ...state, loadingArticle: false, newsArticle: action.data };
		case NewsTypes.SETDOWNLOADMAINNEWS:
			return {
				...state,
				newsMainData: action.data,
				loadingMain: false,
				totalPages: action.totalPages,
				error: action.error
			};
		case NewsTypes.SETFEATUREDNEWSPLANS:
			return { ...state, featuredPlans: action.data, loadingFeaturedPlans: false };
		case NewsTypes.RESETARTICLE:
			return {
				...state,
				newsArticle: null,
				loadingArticle: true,
				loadingFeaturedPlans: true,
				featuredPlans: null
			};
		default:
			return state;
	}
};
