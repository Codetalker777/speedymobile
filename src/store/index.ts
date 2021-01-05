/* eslint no-underscore-dangle: "off" */
/* eslint global-require: off */
/* eslint import/no-extraneous-dependencies: ["off", {"devDependencies": false}] */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer, { RootReducer } from '../reducers';

declare global {
	interface Window {
		__REDUX_STATE__?: RootReducer;
		// eslint-disable-next-line no-undef
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const middleware = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);
if (process.env.NODE_ENV !== 'production') {
	const logger = require('redux-logger').default;
	middleware.push(logger);
}
const initialState = window.__REDUX_STATE__ || {};
if (window && window.__REDUX_STATE__) delete window.__REDUX_STATE__;
const composeEnhancers =
	(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;
const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(...middleware))
);

export const runSaga = sagaMiddleware.run;
export const close = (): END => store.dispatch(END);
export default store;
