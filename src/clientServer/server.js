import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import { createStore, applyMiddleware } from 'redux';
import CookiesMiddleware from 'universal-cookie-express';
import { CookiesProvider } from 'react-cookie';
import { CssBaseline } from '@material-ui/core';
import { Context as ResponsiveContext } from 'react-responsive';
import Device from 'express-device';
import { Helmet } from 'react-helmet';
import createSagaMiddleware, { END } from 'redux-saga';
import AWS from 'aws-sdk';
import Serialize from 'serialize-javascript';
import mediaQuery from 'css-mediaquery';
import App from '../components/App';
import { GlobalTheme } from '../components/Theme/GlobalTheme';
import reducers from '../reducers';
import { setAuthCookie } from '../actions/authActions/auth';
import { accountSettings } from '../sagas/AuthSaga/authSaga';
import { verifyEmail, verifyPassword } from '../sagas/VerifySaga/verifySaga';
import {
	getMainNews,
	getArticleNews,
	featuredPlansOnNewsArticle
} from '../sagas/NewsSaga/newsSaga';
import { getSelectedPlan } from '../sagas/PlanSaga/planSaga';
import { getCartItems } from '../actions/cartActions/cartActions';
import { getPlans as getCart } from '../sagas/CartSaga/cartSaga';
import { getPhone } from '../sagas/PhoneSaga/phoneSaga';
import { getPhones, getPlans } from '../sagas/RootSaga/rootSaga';

/**
 * AWS S3 access
 */
const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const app = express();

function getStaticHeader() {
	const isDev = process.env.API_URL === 'http://localhost:3000';
	return `<link rel="shortcut icon" href="${
		isDev ? '' : process.env.API_URL
	}/static/favicon.ico" /><link rel="stylesheet" type="text/css" href="${
		isDev ? '' : process.env.API_URL
	}/static/client.css"><link rel="manifest" href="${
		isDev ? '' : process.env.API_URL
	}/static/manifest.json" />`;
}

function getReactScript() {
	const isDev = process.env.API_URL === 'http://localhost:3000';
	return `<script src="${isDev ? '' : process.env.API_URL}/static/client.js"></script>${
		isDev ? '<script src="/reload/reload.js"></script>' : ''
	}`;
}

function renderReact(state, cookies, screenWidth, url, mediaQuerySize) {
	const sheets = new ServerStyleSheets();
	const html = ReactDOMServer.renderToString(
		sheets.collect(
			<ResponsiveContext.Provider value={{ width: screenWidth }}>
				<CookiesProvider cookies={cookies}>
					<ThemeProvider
						theme={{
							...GlobalTheme,
							props: {
								MuiUseMediaQuery: { ssrMatchMedia: mediaQuerySize }
							}
						}}
					>
						<CssBaseline />
						<Provider store={state}>
							<StaticRouter location={url}>
								<App />
							</StaticRouter>
						</Provider>
					</ThemeProvider>
				</CookiesProvider>
			</ResponsiveContext.Provider>
		)
	);
	const helmet = Helmet.renderStatic();
	const css = sheets.toString();
	return {
		state: Serialize(state.getState()),
		content: html,
		css,
		helmet: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
		staticheader: getStaticHeader(),
		reactscript: getReactScript()
	};
}

app.set('view engine', 'ejs');
app.set('views', 'static/views');
app.get('/sitemap.xml', (req, res) => {
	res.set({
		'Content-Type': 'text/xml',
		'Cache-Control': 'no-cache'
	});
	const params = {
		Bucket: 'speedymobile-web-storage',
		Key: 'sitemap.xml'
	};
	s3.getObject(params).createReadStream().pipe(res);
});
app.use('/static', express.static('public'));
app.use('/static', express.static('static'));
app.use(
	express.static('HTML', {
		setHeaders(res, path) {
			res.set('Cache-Control', 'no-cache');
		}
	})
);

app.use(CookiesMiddleware());
app.use(Device.capture());
app.use(async (req, res, next) => {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(reducers, applyMiddleware(sagaMiddleware));
	const auth = req.universalCookies.get('xid');
	if (auth) {
		store.dispatch(setAuthCookie(auth));
	}
	let width = 1000;
	const isMobile = req.get('cloudFront-is-mobile-viewer') === 'true';
	const isTablet = req.get('cloudFront-is-tablet-viewer') === 'true';
	const isDesktop = req.get('cloudFront-is-desktop-viewer') === 'true';
	if (isDesktop) {
		width = '1024px';
	} else if (isTablet) {
		width = '700px';
	} else if (isMobile) {
		width = '400px';
	} else {
		switch (req.device.type) {
			case 'phone':
				width = '400px';
				break;
			case 'tablet':
				width = '700px';
				break;
			default:
				width = '1025px';
		}
	}
	const ssrMatchMedia = query => ({
		matches: mediaQuery.match(query, {
			width
		})
	});
	store.runSaga = sagaMiddleware.run;
	store.close = () => store.dispatch(END);
	req.width = width;
	req.state = store;
	req.ssrMatchMedia = ssrMatchMedia;
	next();
});

app.get(
	[
		'/TOS',
		'/Privacy',
		'/AboutUs',
		'/FAQ',
		'/UnSubscribe',
		'/CreateAccount',
		'/ResetPassword',
		'/Checkout',
		'/OrderConfirmed',
		'/Compare',
		'/ComparePlans',
		'/Contact'
	],
	async (req, res) => {
		res.render(
			'layout',
			renderReact(req.state, req.universalCookies, req.width, req.url, req.ssrMatchMedia)
		);
	}
);

app.get('/', async (req, res) => {
	await req.state.runSaga(getMainNews, { page: 1 }).toPromise();
	await req.state.runSaga(getPhones).toPromise();
	await req.state.runSaga(getPlans).toPromise();
	await req.state.close();
	res.render(
		'layout',
		renderReact(req.state, req.universalCookies, req.width, req.url, req.ssrMatchMedia)
	);
});

app.get('/Phones', async (req, res) => {
	await req.state.runSaga(getPhones).toPromise();
	await req.state.close();
	res.render(
		'layout',
		renderReact(req.state, req.universalCookies, req.width, req.url, req.ssrMatchMedia)
	);
});

app.get('/Phones/:slug', async (req, res) => {
	const { slug } = req.params;
	await req.state.runSaga(getPhone, { slug }).toPromise();
	await req.state.close();
	res.render(
		'layout',
		renderReact(req.state, req.universalCookies, req.width, req.url, req.ssrMatchMedia)
	);
});

app.get('/Plans', async (req, res) => {
	await req.state.runSaga(getPlans).toPromise();
	await req.state.close();
	res.render(
		'layout',
		renderReact(req.state, req.universalCookies, req.width, req.url, req.ssrMatchMedia)
	);
});

app.get('/Plans/:slug', async (req, res) => {
	const { slug } = req.params;
	await req.state.runSaga(getSelectedPlan, { value: slug }).toPromise();
	await req.state.close();
	res.render(
		'layout',
		renderReact(req.state, req.universalCookies, req.width, req.url, req.ssrMatchMedia)
	);
});

app.get('/AccountSettings', async (req, res) => {
	await req.state.runSaga(accountSettings).toPromise();
	await req.state.close();
	res.render(
		'layout',
		renderReact(req.state, req.universalCookies, req.width, req.url, req.ssrMatchMedia)
	);
});

app.get('/verify', async (req, res) => {
	const search = req.query.bit;
	await req.state.runSaga(verifyEmail, { value: search }).toPromise();
	await req.state.close();
	res.render(
		'layout',
		renderReact(req.state, req.universalCookies, req.width, req.url, req.ssrMatchMedia)
	);
});

app.get('/verifyPasswordReset', async (req, res) => {
	const search = req.query.bit;
	await req.state.runSaga(verifyPassword, { value: search }).toPromise();
	await req.state.close();

	res.render(
		'layout',
		renderReact(req.state, req.universalCookies, req.width, req.url, req.ssrMatchMedia)
	);
});

app.get('/News', async (req, res) => {
	const page = (req.query.page && Number.parseInt(req.query.page, 10)) || 1;
	await req.state.runSaga(getMainNews, { page }).toPromise();
	await req.state.close();

	res.render(
		'layout',
		renderReact(req.state, req.universalCookies, req.width, req.url, req.ssrMatchMedia)
	);
});

app.get('/Article/:slug', async (req, res) => {
	const { slug } = req.params;
	await req.state.runSaga(getArticleNews, { slug }).toPromise();
	await req.state.runSaga(featuredPlansOnNewsArticle).toPromise();
	await req.state.close();

	res.render(
		'layout',
		renderReact(req.state, req.universalCookies, req.width, req.url, req.ssrMatchMedia)
	);
});

app.get('/Cart', async (req, res) => {
	const cart = req.universalCookies.get('cart');
	await req.state.dispatch(getCartItems(cart));
	await req.state.runSaga(getCart, { value: cart }).toPromise();
	await req.state.close();
	res.render(
		'layout',
		renderReact(req.state, req.universalCookies, req.width, req.url, req.ssrMatchMedia)
	);
});

app.get('/Carrier/:carrierSlug', async (req, res) => {
	res.render(
		'layout',
		renderReact(req.state, req.universalCookies, req.width, req.url, req.ssrMatchMedia)
	);
});

export default app;
