import ReactGA from 'react-ga';

// this file contains all methods for google analytics use within the application

// tracks a page view requires the location variable to be passed in
const trackPageView = (location: Location): void => {
	ReactGA.set({
		page: location.pathname + location.search
	});
	ReactGA.pageview(location.pathname + location.search);
};

// tracks a event trigged can take 4 or 3 fields as input
const addGAEvent = (
	category: string,
	action: string,
	label: string,
	value?: number
): void => {
	if (value !== null && value !== undefined) {
		ReactGA.event({
			category,
			action,
			label,
			value
		});
	} else {
		ReactGA.event({
			category,
			action,
			label
		});
	}
};

// initalizes google analytics, should only be called once on app launch
const initGa = (): void => {
	// if (window.location.host === 'localhost:3000') return;
	ReactGA.initialize('UA-132876468-1', {
		// debug: true,
		gaOptions: {
			cookieDomain: 'SpeedyMobile.ca'
		}
	});
};

export { initGa as default, trackPageView, addGAEvent };
