// this file is the main search engine of the application, all of the searching requests for plans are accepted here

// env variables
// data schema import
// router setup
import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cachegoose from 'cachegoose';
import Data from '../Schemas/data';
import FeaturedPlan from '../Schemas/featuredPlan';

config();

const dataRoute = express.Router();

cachegoose(mongoose, {
	port: process.env.PORT || 3000
});
function getSearchResults(value, page, callback) {
	if (page === 1) {
		Data.aggregate([
			{
				$match: value
			},
			{
				$sort: {
					monthlyCost: 1,
					upfrontCost: 1
				}
			}
		])
			.cache(300)
			.exec((err, data) => {
				if (err) callback({ success: false, error: err });
				else {
					if (!data || data.length === 0) {
						callback({ success: true, data: [] });
						return;
					}
					const responseData = {};
					for (let i = 0; i < data.length; i++) {
						if (!responseData[data[i].providerName]) {
							responseData[data[i].providerName] = [data[i]];
						} else if (responseData[data[i].providerName].length < 2) {
							responseData[data[i].providerName].push(data[i]);
						}
					}
					data.sort(function sortbyLifeTimeValue(a, b) {
						if (
							a.monthlyCost * 24 + a.upfrontCost >
							b.monthlyCost * 24 + b.upfrontCost
						) {
							return 1;
						}
						return -1;
					});
					let bestOverallList = data.slice(0, 5);
					data.filter(plan => typeof plan.data !== 'string');
					data.sort(function sortbyPerGB(a, b) {
						if (a.data / a.monthlyCost < b.data / b.monthlyCost) {
							return 1;
						}

						return -1;
					});
					let bestValue = data.slice(0, 5);
					let topPlansFromProviders = [];
					let nextbestMatches = [];
					Object.keys(responseData).forEach(provider => {
						if (responseData[provider][0]) {
							topPlansFromProviders.push(responseData[provider][0]);
						}
						if (responseData[provider][1]) {
							nextbestMatches.push(responseData[provider][1]);
						}
					});
					topPlansFromProviders = convertImageString(topPlansFromProviders);
					nextbestMatches = convertImageString(nextbestMatches);
					bestValue = convertImageString(bestValue);
					bestOverallList = convertImageString(bestOverallList);
					callback(
						{
							data: [
								{ data: topPlansFromProviders, type: 'Best Matches' },
								{ data: nextbestMatches, type: 'Next Best Matches' },
								{ data: bestValue, type: 'Best per GB Value' },
								{ data: bestOverallList, type: 'Best Value' }
							],
							success: true
						},
						data.length
					);
				}
			});
	} else {
		Data.find(value)
			.sort({ monthlyCost: 1, upfrontCost: 1 })
			.skip((page - 2) * 10)
			.limit(10)
			.cache(300)
			.exec((err, data) => {
				if (err) callback({ success: false, error: err });
				else {
					const returnValue = convertImageString(data);
					callback({ success: true, data: returnValue });
				}
			});
	}
}

// this function converts to local host all of the image strings recieved from the database
// should only be called if you check if it is production or develop environment first
const convertImageString = data => {
	const conversion =
		process.env.NODE_ENV === 'production'
			? 'https://www.speedymobile.ca'
			: 'http://localhost:3000';
	for (let i = 0; i < data.length; i++) {
		if (data[i]?.logo) {
			const changer = data[i].logo.replace(
				'https://speedymobile-backend.herokuapp.com',
				conversion
			);
			data[i].logo = changer;
		}
		if (typeof data[i].image === 'string') {
			const changer = data[i].image.replace(
				'https://speedymobile-backend.herokuapp.com',
				conversion
			);
			data[i].image = changer;
		} else {
			for (let j = 0; j < data[i]?.image?.length; j++) {
				if (data[i]?.image[j]) {
					const changer = data[i].image[j].replace(
						'https://speedymobile-backend.herokuapp.com',
						conversion
					);
					data[i].image[j] = changer;
				}
			}
		}
	}
	return data;
};

// finds all plans that have a corresponding id, can accept an array of numbers or a single value as input
dataRoute.get('/getDataid', (req, res) => {
	const search = req.query.id;
	// more than 1 id
	if (search.length > 1) {
		Data.find({ id: { $in: search } })
			.cache(300)
			.exec((err, data) => {
				if (err) return res.json({ success: false, error: err });
				return res.json({ success: true, data: convertImageString(data) });
			});
	}
	// only 1 id
	else {
		Data.find({ id: search })
			.cache(300)
			.exec((err, data) => {
				if (err) return res.json({ success: false, error: err });

				return res.json({ success: true, data: convertImageString(data) });
			});
	}
});

// this api call searches for phones according to the provider and plan,
// it accepts a provider Name and name of the plan
dataRoute.get('/getPhonebyProvider', (req, res) => {
	const { providerName, name } = req.query;

	Data.find({ providerName, name, phone: { $ne: null } })
		.cache(300)
		.exec((err, data) => {
			if (err) return res.json({ success: false, error: err });

			return res.json({ success: true, data: convertImageString(data) });
		});
});

// main search algorithim of the app, accepts a vairety of parameters and searchs the database based on those inputs and
// then returns the results
dataRoute.get('/getData', (req, res) => {
	// console.log(req.query)

	// input
	const {
		searchText,
		criteria,
		providers,
		contract,
		data,
		messages,
		minutes,
		upfront,
		monthly,
		page,
		operatingSystem
	} = req.query;

	// converting data types to integers as needed
	const checkdata = Number.parseInt(data, 10);
	const checkmessage = Number.parseInt(messages, 10);
	const checkminute = Number.parseInt(minutes, 10);
	const checkUpFront = Number.parseInt(upfront, 10);
	const checkMonthly = Number.parseInt(monthly, 10);

	// checking inputs and setting search criteria based on inputs recived
	const getvalue = () => {
		let obj = [];
		if (criteria === 'All' && searchText[0] === 'Any') {
			return obj;
		}
		if (criteria === 'All' && searchText[0] !== 'Any') {
			obj = [{ phone: { $in: searchText } }];
			return obj;
		}
		if (criteria === 'Plans' && searchText[0] === 'Any') {
			obj = [{ phone: null }];
			return obj;
		}
		if (criteria === 'Plans' && searchText[0] !== 'Any') {
			obj = [{ phone: null }, { phone: { $in: searchText } }];
			return obj;
		}
		if (criteria === 'Phones' && searchText[0] === 'Any') {
			obj = [{ phone: { $ne: null } }];
			return obj;
		}
		if (criteria === 'Phones' && searchText[0] !== 'Any') {
			obj = [{ phone: { $ne: null } }, { phone: { $in: searchText } }];
			return obj;
		}
	};

	// adding providers to search
	const getProvider = () => {
		let obj = [];
		if (providers) {
			obj = [{ providerName: { $in: providers } }];
			return obj;
		}
		return obj;
	};

	// adding contract type to search
	const getContract = () => {
		let obj = [];
		if (contract) {
			obj = [{ type: { $in: contract } }];
			return obj;
		}
		return obj;
	};
	// adding data to search
	const getData = () => {
		let obj = [];
		if (!isNaN(checkdata)) {
			if (checkdata === 0) {
				obj = [
					{
						$or: [
							{ data: { $gte: checkdata } },
							{ data: { $in: ['Pay per use', 'Unlimited'] } }
						]
					}
				];
				return obj;
			}

			obj = [{ $or: [{ data: { $gte: checkdata } }, { data: 'Unlimited' }] }];
			return obj;
		}
		obj = [{ data: 'Unlimited' }];
		return obj;
	};

	// adding minutes to search
	const getMinute = () => {
		let obj = [];
		if (!isNaN(checkminute)) {
			obj = [{ $or: [{ minutes: { $gte: checkminute } }, { minutes: 'Unlimited' }] }];
			return obj;
		}
		obj = [{ minutes: 'Unlimited' }];
		return obj;
	};

	// adding messages to search
	const getMessage = () => {
		let obj = [];
		if (!isNaN(checkmessage)) {
			obj = [
				{
					$or: [{ messages: { $gte: checkmessage } }, { messages: 'Unlimited' }]
				}
			];
			return obj;
		}
		obj = [{ messages: 'Unlimited' }];
		return obj;
	};
	// adding upfrontcost to search
	const getUpfront = () => {
		let obj = [];
		if (!isNaN(checkUpFront)) {
			obj = [{ upfrontCost: { $lte: checkUpFront } }];
			return obj;
		}
		return obj;
	};

	// adding monthly cost to search
	const getMonthly = () => {
		let obj = [];
		if (!isNaN(checkMonthly)) {
			obj = [{ monthlyCost: { $lte: checkMonthly } }];
			return obj;
		}
		return obj;
	};

	const operatingSystemChosen = () => {
		if (operatingSystem !== 'null') return [{ phoneType: operatingSystem }];
		return [];
	};

	// combining search criteria to a array
	const value = { $and: [] };
	value.$and = value.$and.concat(
		getvalue(),
		getProvider(),
		getContract(),
		getData(),
		getMinute(),
		getMessage(),
		getUpfront(),
		getMonthly(),
		operatingSystemChosen()
	);
	if (value.$and.length === 0) {
		delete value.$and;
	}

	// search for plans and phones that meet the criteria
	//  finds the search results then finds how many results there are and returns it back to the frontend
	getSearchResults(value, Number.parseInt(page, 10), function response(
		result,
		searchNumber
	) {
		if (!result.data.length) {
			getSearchResults(value, Number.parseInt(page, 10), function nextResponse(
				similarResults,
				searchNumberSimilarResults
			) {
				return res.json({
					...similarResults,
					searchNumber: searchNumberSimilarResults,
					similarResults: true
				});
			});
		} else {
			return res.json({
				...result,
				searchNumber
			});
		}
	});
});

// searchs for a list of unique phones, can also pass in a value that can seperate searches from android and ios
dataRoute.get('/getPhones', (req, res) => {
	const { phoneType, providerName } = req.query;

	if (providerName && !phoneType) {
		Data.find({ phone: { $ne: null }, providerName: { $in: providerName } })
			.distinct('phone')
			.exec((err, data) => {
				if (err) return res.json({ success: false, error: err });
				return res.json({ success: true, data });
			});
	} else if (providerName && phoneType) {
		Data.find({ phoneType, providerName: { $in: providerName } })
			.distinct('phone')
			.exec((err, data) => {
				if (err) return res.json({ success: false, error: err });
				return res.json({ success: true, data });
			});
	}
	// no parameter passed
	else if (phoneType === null || phoneType === undefined) {
		Data.find({ phone: { $ne: null } })
			.distinct('phone')
			.exec((err, data) => {
				if (err) return res.json({ success: false, error: err });
				return res.json({ success: true, data });
			});
	}
	// paramter passed
	else {
		Data.find({ phoneType })
			.distinct('phone')
			.exec((err, data) => {
				if (err) return res.json({ success: false, error: err });
				return res.json({ success: true, data });
			});
	}
});

// Returns a list of all phones + plans based on provider
/* TASKS: add to differienaiate providers later on */
dataRoute.get('/getProviderPlans', (req, res) => {
	// differeniate between plans+phones and just plans
	const param = req.query.searchType;
	if (param === '0') {
		// Data.aggregate([
		// 	{
		// 		$match: {
		// 			phone: { $exists: true, $ne: null }
		// 		}
		// 	},
		// 	{
		// 		$group: {
		// 			_id: { phone: '$phone', providerName: '$providerName' },
		// 			image: { $first: '$image' },
		// 			logo: { $first: '$logo' },
		// 			price: { $min: '$monthlyCost' }
		// 		}
		// 	},
		// 	{
		// 		$group: {
		// 			_id: '$_id.phone',
		// 			image: { $first: '$image' },
		// 			price: { $first: '$price' },
		// 			providers: {
		// 				$push: {
		// 					providerName: '$_id.providerName',
		// 					logo: '$logo'
		// 				}
		// 			}
		// 		}
		// 	},
		// 	{
		// 		$project: {
		// 			_id: 0,
		// 			phone: '$_id',
		// 			image: 1,
		// 			providers: 1
		// 		}
		// 	}
		// ])
		Data.aggregate([
			{
				$match: {
					phone: { $exists: true, $ne: null }
				}
			},
			{
				$group: {
					_id: { phone: '$phone', providerName: '$providerName' },
					image: { $first: '$image' },
					logo: { $first: '$logo' },
					price: { $min: '$monthlyCost' }
				}
			},
			{
				$group: {
					_id: '$_id.providerName',
					logo: { $first: '$logo' },
					phone: {
						$push: {
							phoneName: '$_id.phone',
							image: '$image',
							price: '$price'
						}
					}
				}
			},
			{
				$project: {
					_id: 0,
					logo: '$logo',
					providerName: '$_id',
					phone: 1
				}
			}
		])
			.cache(300)
			.exec((err, data) => {
				if (err) return res.json({ success: false, error: err });
				return res.json({ success: true, data: convertImageString(data) });
			});
	} else {
		Data.find({ phone: null }).exec((err, data) => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true, data });
		});
	}
});

// dataRoute.post('/navBarSearch', (req, res) => {
// 	Data.aggregate([
// 		{
// 			$match: {
// 				phone: { $exists: true, $ne: null }
// 			}
// 		},
// 		{
// 			$group: {
// 				_id: '$phone',
// 				image: { $first: { $arrayElemAt: ['$image', 0] } },
// 				phoneType: { $first: '$phoneType' }
// 			}
// 		},
// 		{
// 			$addFields: { phoneName: '$_id' }
// 		},
// 		{
// 			$project: { _id: 0 }
// 		},
// 		{
// 			$sort: {
// 				phoneType: -1
// 			}
// 		}
// 	])
// 		.cache(300)
// 		.exec((err, data) => {
// 			if (err) return res.json({ success: false, error: err });
// 			return res.json({ success: true, data: convertImageString(data) });
// 		});
// });

// this api call returns a list of plans types all unique
dataRoute.get('/getPlanType', (req, res) => {
	Data.distinct('type').exec((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data });
	});
});

// this api call retruns a list of unique providers
dataRoute.get('/getProvider', (req, res) => {
	const param = req.query.phones;
	if (param) {
		Data.find({ phone: { $in: param } })
			.distinct('providerName')
			.exec((err, data) => {
				if (err) return res.json({ success: false, error: err });
				return res.json({ success: true, data });
			});
	} else {
		Data.distinct('providerName').exec((err, data) => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true, data });
		});
	}
});

// retrives the most visited plans on the website, you can pass in a value or by default it returns the top 6
dataRoute.get('/getTopPlans', (req, res) => {
	const { value } = req.query;

	// if a value is not passed in, it returns 6
	if (value === undefined || value === null) {
		Data.find()
			.sort('-ranking')
			.limit(6)
			.cache(300)
			.exec((err, data) => {
				if (err) return res.json({ success: false, error: err });

				return res.json({ success: true, data: convertImageString(data) });
			});
	} else {
		// it returns the custom amount of values you wish to display
		Data.find()
			.sort('-ranking')
			.limit(Number.parseInt(value))
			.exec((err, data) => {
				if (err) return res.json({ success: false, error: err });

				return res.json({ success: true, data: convertImageString(data) });
			});
	}
});

// tracks the page count of the plan+phone. Increments the value up by one
dataRoute.post('/updateRanking', (req, res) => {
	const { id } = req.query;
	Data.findOneAndUpdate({ id }, { $inc: { ranking: 1 } }, (err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

dataRoute.post('/getFeaturedPlans', (req, res) => {
	FeaturedPlan.distinct('id').exec((err, data) => {
		if (err) return res.json({ success: false, error: err });
		Data.find({ id: { $in: data } })
			.cache(300)
			.exec((error, result) => {
				if (error) return res.json({ success: false, error: err });
				return res.json({ success: true, data: convertImageString(result) });
			});
	});
});

export default dataRoute;
