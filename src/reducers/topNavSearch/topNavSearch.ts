import { TopNavSearchState } from './topNavSearchTypes';
import {
	TopNavSearchTypes,
	AllTopNavSearchActions
} from '../../actions/topNavSearchActions/topNavSearchInterface';

const initialState: TopNavSearchState = {
	loading: true,
	data: []
};

export default (
	state = initialState,
	action: AllTopNavSearchActions
): TopNavSearchState => {
	switch (action.type) {
		case TopNavSearchTypes.SETSEARCHTERMS:
			return { loading: false, data: action.data };
		default:
			return { ...state };
	}
};
