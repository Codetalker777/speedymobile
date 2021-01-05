import { ReactSelectArray } from '../localTypes';

export type SetOS = {
	allOS: boolean;
	ios: boolean;
	android: boolean;
	operatingSystem: string;
};

export const setOS = (operatingSystem: string): SetOS => {
	if (operatingSystem === 'null') {
		return { allOS: true, ios: false, android: false, operatingSystem: '' };
	}
	if (operatingSystem === 'iPhone') {
		return { allOS: false, ios: true, android: false, operatingSystem: 'iPhone' };
	}
	return { allOS: false, ios: false, android: true, operatingSystem: 'Android' };
};

export const setLabels = (labels: Array<string>): ReactSelectArray | string => {
	if (labels[0] === 'Any' || labels[0] === 'null') {
		return '';
	}
	const suggestions = labels.map(label => ({
		value: label,
		label
	}));

	return suggestions;
};
