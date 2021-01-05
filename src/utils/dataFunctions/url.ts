import { ReactSelectArray } from '../localTypes';

const urlSetter = (
	phones: ReactSelectArray,
	dataRequested: number | string,
	minutesRequested: number | string,
	messagesRequested: number | string,
	monthlyCost: number | string,
	upFrontCost: number | string,
	providers: ReactSelectArray,
	contracts: ReactSelectArray,
	searchCriteria: string,
	operatingSystem: string,
	page?: number
): string => {
	const searchParams = new URLSearchParams();
	searchParams.append(
		'phones',
		!phones || phones.length === 0 ? 'Any' : phones.map(a => a.label).toString()
	);
	searchParams.append('data', dataRequested.toString());
	searchParams.append('minutes', minutesRequested.toString());
	searchParams.append('messages', messagesRequested.toString());
	searchParams.append('monthlyCost', monthlyCost ? monthlyCost.toString() : 'Any');
	searchParams.append('upFrontCost', upFrontCost ? upFrontCost.toString() : 'Any');
	searchParams.append(
		'providers',
		!providers || providers.length === 0
			? 'null'
			: providers.map(a => a.label).toString()
	);
	searchParams.append(
		'contracts',
		!contracts || contracts.length === 0
			? 'null'
			: contracts.map(a => a.label).toString()
	);
	searchParams.append(
		'searchCriteria',
		!searchCriteria || searchCriteria === '' ? 'All' : searchCriteria
	);
	searchParams.append('page', (page && page.toString()) || '1');
	searchParams.append(
		'operatingSystem',
		operatingSystem === '' ? 'null' : operatingSystem
	);
	return searchParams.toString();
};

export default urlSetter;
