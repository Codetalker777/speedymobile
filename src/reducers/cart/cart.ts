import { CartActionType, AllCartActions } from '../../actions/cartActions/cartInterface';
import { SearchActionType, Reset } from '../../actions/searchActions/searchInterface';

import { CartState } from './cartTypes';

/* contains all the definition for all of the variables used in the cart page */

/* the state on app mount */
const intialState: CartState = {
	plans: [],
	phones: [],
	cart: null,
	loading: true
};

/* the following actions trigger changes in the state */

export default (state = intialState, action: AllCartActions | Reset): CartState => {
	switch (action.type) {
		case SearchActionType.RESET:
			return { ...intialState };
		case CartActionType.GETCARTITEMS:
			return {
				...state,
				cart: action.value
			};
		case CartActionType.DELETECARTITEM:
			return {
				...state,
				phones: action.newPlan,
				cart: action.newCart
			};
		case CartActionType.DELETEPLANITEM:
			return {
				...state,
				plans: action.newPlan,
				cart: action.newCart
			};

		case CartActionType.UPDATECARTITEM:
			return {
				...state,
				cart: action.value
			};
		case CartActionType.SETCARTITEMS:
			return {
				...state,
				phones: action.phones,
				plans: action.plans,
				loading: false
			};
		case CartActionType.REQUIRERELOAD:
			return { ...state, loading: true };
		default:
			return { ...state };
	}
};
