import React, { useEffect, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import WebSiteInfographic from '../components/HomePage/WebSiteInfographic';

import { NewsActions } from '../actions/newsActions/newsActions';

// import Home_content from '../components/home_content';
import { trackPageView } from '../utils/GoogleAnalytics';
import RenderNewsShort from '../components/News/NewsShort';
import { useSelector } from '../reducers';
import PhoneCarousel from '../components/HomePage/PhoneCarousel/PhoneCarousel';
import ShopButtons from '../components/HomePage/ShopButtons';
import YouTubeVideo from '../components/HomePage/YoutubeVideo';
import PlanGrid from '../components/HomePage/PlanGrid/PlanGrid';
import CarrierGrid from '../components/HomePage/PlanGrid/CarrierGrid';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

/* this file holds the content for the main page */

export default function Home(): ReactElement {
	const dispatch = useDispatch();
	const newsData = useSelector(
		state => state.news.newsMainData && state.news.newsMainData.slice(0, 3)
	);
	useEffect(() => {
		window.scrollTo(0, 0);
		trackPageView(window.location);
		if (!newsData) {
			dispatch(NewsActions.downloadMainNews(1));
		}
	}, []);
	return (
		<div>
			<Helmet>
				<title>SpeedyMobile | Latest Phones & Lowest Prices</title>
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={process.env.API_URL} />
				<meta
					name="description"
					content="Need a plan or phone that covers all of your needs but dont know where to start? Save time and find the perfect one for you on SpeedyMobile."
				/>
				<meta property="og:title" content="SpeedyMobile" />
				<meta
					property="og:description"
					content="Need a plan or phone that covers all of your needs but dont know where to start? Save time and find the perfect one for you on SpeedyMobile."
				/>
				<meta name="twitter:image" content={TwitterLink} />
				<meta property="og:image" content={FaceBookLink} />
				<meta property="fb:app_id" content="794534664367050" />
			</Helmet>
			<ShopButtons />

			<WebSiteInfographic />
			<PhoneCarousel />
			<CarrierGrid />
			<PlanGrid />
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					height: '2%',
					backgroundColor: 'white',
					alignContent: 'center',
					width: '100%',
					justifyContent: 'center'
				}}
			>
				<br />
				<br />
				<YouTubeVideo />
				<br />
			</div>

			<RenderNewsShort data={newsData} />
			<div
				style={{
					paddingTop: '5%',
					margin: 0
				}}
			/>
		</div>
	);
}
