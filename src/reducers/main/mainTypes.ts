import { Data } from '../../utils/dataTypes';
import { ReactSelectArray } from '../../utils/localTypes';

export type MainState = {
	dataRequested: string | number;
	minutesRequested: string | number;
	messagesRequested: string | number;
	dataSlider: number;
	minutesSlider: number;
	messagesSlider: number;
	searchText: ReactSelectArray;
	tab: number;
	phones: Array<string>;
	URL: string;
	topPlans: Array<Data>;
	loadingPlans: boolean;
};
