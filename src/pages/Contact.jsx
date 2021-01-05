import React from 'react';
import { Helmet } from 'react-helmet';
import { trackPageView } from '../utils/GoogleAnalytics';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

import Contact from '../components/Contact/ContactForm';

class ContactPage extends React.Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		// GA track page view
		trackPageView(this.props.location);
		// get top plans
	}

	render() {
		return (
			<div>
				<Helmet>
					<title>Contact Us | SpeedyMobile</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`${process.env.API_URL}/Contact`} />
					<meta
						name="description"
						content="Contact us with your questions and comments"
					/>
					<meta property="og:title" content="Contact Us" />
					<meta
						property="og:description"
						content="Contact us with your questions and comments"
					/>
					<meta name="twitter:image" content={TwitterLink} />
					<meta property="og:image" content={FaceBookLink} />
					<meta property="fb:app_id" content="794534664367050" />
				</Helmet>
				<div
					style={{
						backgroundColor: '#49c5b6',
						paddingTop: '30px',
						paddingBottom: '30px'
					}}
					align="center"
				>
					<Contact />
				</div>
			</div>
		);
	}
}

export default ContactPage;
