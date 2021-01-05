import { all, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { parse } from 'node-html-parser';
import {
	NewsTypes,
	ActionDownloadArticle,
	ActionDownloadMainNews
} from '../../actions/newsActions/newsInterface';
import { NewsActions } from '../../actions/newsActions/newsActions';
import {
	GetMainNews,
	NewsListener,
	GetArticle,
	MainNewsResponse,
	SetFeaturedNewsPlans,
	FeaturedPlanNewsResponse
} from './newsSagaTypes';
import BaseURL from '../../utils/api';

const getMainNewsCall = (page: number): Promise<MainNewsResponse> => {
	return axios
		.get(
			`https://news.SpeedyMobile.ca/wp-json/wp/v2/posts?_embed&page=${page}&per_page=10`
		)
		.then(response => {
			return {
				data: response.data,
				totalPages: Number.parseInt(response.headers['x-wp-totalpages'], 10)
			};
		})
		.catch(error => {
			return { data: [], error: 'The selected page you were looking for was not found' };
		});
};

const getArticleCall = (slug: string): Promise<Record<string, any>> => {
	return axios
		.get(`https://news.SpeedyMobile.ca/wp-json/wp/v2/posts?_embed&slug=${slug}`)
		.then(response => {
			return response.data[0];
		});
};

const getFeaturedPlansOnNews = (): Promise<FeaturedPlanNewsResponse> => {
	return BaseURL.post('/api/getFeaturedPlans').then(response => {
		return response.data;
	});
};

export function* getMainNews(action: ActionDownloadMainNews): GetMainNews {
	const response: MainNewsResponse = yield call(getMainNewsCall, action.page);
	try {
		for (let i = 0; i < response.data.length; i++) {
			const doc = parse(response.data[i].content.rendered);
			const firstParagraph = doc.querySelector('p');
			response.data[i].excerpt.rendered = firstParagraph.toString();
			response.data[i].title.rendered = parse(
				`<p>${response.data[i].title.rendered.replace(/&nbsp;/gi, ' ')}<p>`
			).childNodes[0].text;
		}
	} catch (error) {
		console.error('failed to parse news response', error.message);
	}
	yield put(
		NewsActions.setDownloadMainNews(response.data, response.totalPages, response.error)
	);
}

export function* getArticleNews(action: ActionDownloadArticle): GetArticle {
	const data: Record<string, any> = yield call(getArticleCall, action.slug);
	try {
		const doc = parse(data.content.rendered);
		const figures = doc.querySelectorAll('figure');
		const images = doc.querySelectorAll('img');
		const firstParagraph = doc.querySelector('p');
		figures.forEach(element => {
			element.setAttribute('style', 'margin: 0; width: 100%; justify-content: center');
		});
		images.forEach(element => {
			element.setAttribute(
				'style',
				'width: 100%; display: flex; object-fit: contain; height: auto'
			);
		});
		data.content.rendered = doc.toString();
		data.content.description = firstParagraph.childNodes[0].text;
		data.title.rendered = parse(
			`<p>${data.title.rendered.replace(/&nbsp;/gi, ' ')}<p>`
		).childNodes[0].text;
	} catch (error) {
		console.error('Failed to parse news article content', error.message);
	}
	yield put(NewsActions.setDownloadArticle(data));
}

export function* featuredPlansOnNewsArticle(): SetFeaturedNewsPlans {
	const response: FeaturedPlanNewsResponse = yield call(getFeaturedPlansOnNews);
	yield put(NewsActions.setFeaturedNewsPlans(response.data));
}

export default function* feedbackSaga(): NewsListener {
	yield all([
		yield takeLatest(NewsTypes.DOWNLOADMAINNEWS, getMainNews),
		yield takeLatest(NewsTypes.DOWNLOADARTICLE, getArticleNews),
		yield takeLatest(NewsTypes.DOWNLOADARTICLE, featuredPlansOnNewsArticle)
	]);
}
