export type User = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	gender?: string;
	postalCode?: string;
	address?: string;
	city?: string;
	province?: string;
	birthDate: Date;
};

export type Data = {
	id: number;
	providerName: string;
	type: string;
	contractLength: string;
	name: string;
	minutes: number | string;
	additionalMinuteInfo?: Array<string>;
	data: number | string;
	additionalDataInfo?: Array<string>;
	messages: number | string;
	additonalMessageInfo?: Array<string>;
	monthlyCost: number;
	upfrontCost: number;
	simCardFee: number;
	activationFee: number;
	storeCredit: number;
	additonalInfo?: string;
	phone?: string;
	phoneType?: string;
	features?: Array<string>;
	addOns?: Array<AddonsType>;
	extra?: Array<AdditonalFields>;
	categories?: Array<AdditonalFields>;
	logo: string;
	image: Array<string>;
	ranking?: number;
	color: Array<ColorDataType>;
	storage: Array<StorageDataType>;
	myTab?: MyTabDataType;
	coverage?: string;
	manufacturer?: string;
};

export type AddonsType = {
	title: string;
	text: string;
	cost: number;
};

export type AdditonalFields = {
	name: string;
	body: string;
	list: Array<string>;
};

export type ColorDataType = {
	colorName: string;
	color: string;
};

export type StorageDataType = {
	size: string;
	cost: number;
};

export type MyTabDataType = {
	storage: {
		size: string;
		min: number;
		max: number;
	};
};

export type CartType = {
	plans: Record<string, PlanCartType>;
	phones: Record<string, PhoneCartType>;
};

export type PlanCartType = {
	quantity: number;
	plan?: string;
};

export type PhoneCartType = {
	phone?: string;
	color?: string;
	quantity: number;
	storage?: string;
};

export type PhoneType = {
	color: string;
	name: string;
	version?: string;
	screenSize?: string;
	screenRes?: string;
	battery?: string;
	storage?: string;
	camera?: string;
	frontCamera?: string;
	CPU?: string;
	GPU?: string;
	weight?: string;
	memory?: string;
	externalStorage?: string;
	video?: string;
};

export type SearchTerm = {
	image: string;
	phoneType: string;
	phoneName: string;
};

export type IndividualPhone = {
	color: string[];
	name: string;
	manufacturer: string;
	operatingSystem: string;
	storage: string[];
	keywords?: string[];
	cost: Record<string, number>;
	phoneSpecs: string[];
	images: string[];
	slug: string;
	summary: string;
};

export type Plan = {
	id: number;
	providerName: string;
	type: string;
	contractLength: number | null;
	name: string;
	planName: string;
	minutes: string | number;
	data: string | number;
	messages: string | number;
	monthlyCost: number;
	upfrontCost: number;
	simCardFee: number;
	activationFee: number;
	storeCredit: number;
	planBonus: {
		title: string;
		description: string;
		terms: string | null;
		costSavings: number | null;
		bonusData: string | number | null;
		bonusMinutes: string | number | null;
		bonusMessages: string | number | null;
		disclaimer: string;
	};
	addOns: { title: string; text: string; cost: number }[] | null;
	logo: string;
	keywords: string[];
	slug: string;
	summary: string;
	additionalFeatures: { title: string; text: string }[];
	additionalMinuteInformation: { title: string; text: string }[];
	additionalDataInformation: {
		title: string;
		text: string;
	}[];
	additionalMessageInformation: { title: string; text: string }[];
};
