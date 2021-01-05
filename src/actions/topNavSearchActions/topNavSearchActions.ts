import {
	TopNavSearchTypes,
	ActionGetSearchTerms,
	ActionSetSearchTerms
} from './topNavSearchInterface';
import { IndividualPhone } from '../../utils/dataTypes';

export const topNavSearchActions = {
	getSearchTerms: (): ActionGetSearchTerms => ({
		type: TopNavSearchTypes.GETSEARCHTERMS
	}),
	setSearchTerms: (data: IndividualPhone[]): ActionSetSearchTerms => ({
		type: TopNavSearchTypes.SETSEARCHTERMS,
		data
	})
};
