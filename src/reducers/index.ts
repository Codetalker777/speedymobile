import { combineReducers } from 'redux';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import main from './main/main';
import search from './search/search';
import plan from './plans/plans';
import cart from './cart/cart';
import checkout from './checkout/checkout';
import phones from './phones/phones';
import compare from './compare/comparePlans';
import comparePhones from './comparePhones/comparePhones';
import feedback from './feedback/feedback';
import auth from './auth/auth';
import account from './account/account';
import createAccount from './createAccount/createAccount';
import messages from './messages/messages';
import verifyEmail from './verifyEmail/verifyEmail';
import resetPassword from './resetPassword/resetPassword';
import news from './news/news';
import topNavSearch from './topNavSearch/topNavSearch';
import individualPhones from './individualPhones/individualPhones';
import individualPlans from './individualPlans/individualPlans';

/* combines all reducers into one object so it can easily be inserted into the redux store */

const rootReducer = combineReducers({
	main,
	search,
	plan,
	cart,
	checkout,
	phones,
	compare,
	comparePhones,
	feedback,
	auth,
	account,
	messages,
	createAccount,
	verifyEmail,
	resetPassword,
	news,
	topNavSearch,
	individualPhones,
	individualPlans
});

export type RootReducer = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootReducer> = useReduxSelector;

export default rootReducer;
