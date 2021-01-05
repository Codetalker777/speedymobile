import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Helmet } from 'react-helmet';
import { trackPageView } from '../utils/GoogleAnalytics';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

/* this page displays all the phones in the app */

// Styling
const StyledPaper = {
	flex: 1,
	display: 'flex',
	justifyContent: 'left',
	// alignItems: 'center',
	// alignSelf: 'center',
	flexDirection: 'column',
	maxWidth: '50em',
	marginLeft: '15px',
	marginRight: '15px',
	marginTop: '20px',
	marginBottom: '5%',
	paddingTop: '20px',
	paddingBottom: '50px',
	paddingLeft: '25px',
	paddingRight: '25px'
};

class Phones extends React.Component {
	componentDidMount() {
		window.prerenderReady = true;
		window.scrollTo(0, 0);
		// GA track page view
		trackPageView(this.props.location);
	}

	render() {
		return (
			<div>
				<Helmet>
					<title>Privacy Policy | SpeedyMobile</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`${process.env.API_URL}/Privacy`} />
					<meta
						name="description"
						content="We take your privacy seriously. Click here to learn more"
					/>
					<meta property="og:title" content="Privacy Policy" />
					<meta
						property="og:description"
						content="We take your privacy seriously. Click here to learn more"
					/>
					<meta name="twitter:image" content={TwitterLink} />
					<meta property="og:image" content={FaceBookLink} />
					<meta property="fb:app_id" content="794534664367050" />
				</Helmet>

				<div align="center" style={{ fontFamily: 'roboto' }}>
					<Paper style={StyledPaper} align="justify">
						<h2>Privacy Policy</h2>
						<p>
							Your privacy is important to us. It is SpeedyMobile's policy to respect
							your privacy regarding any information we may collect from you across our
							website, <a href="https://SpeedyMobile.ca">https://SpeedyMobile.ca</a>, and
							other sites we own and operate.
						</p>
						<p>
							We only ask for personal information when we truly need it to provide a
							service to you. We collect it by fair and lawful means, with your knowledge
							and consent. We also let you know why we’re collecting it and how it will
							be used.
						</p>
						<p>
							We only retain collected information for as long as necessary to provide
							you with your requested service. What data we store, we’ll protect within
							commercially acceptable means to prevent loss and theft, as well as
							unauthorised access, disclosure, copying, use or modification.
						</p>
						<p>
							We don’t share any personally identifying information publicly or with
							third-parties, except when required to by law.
						</p>
						<p>
							Our website may link to external sites that are not operated by us. Please
							be aware that we have no control over the content and practices of these
							sites, and cannot accept responsibility or liability for their respective
							privacy policies.
						</p>
						<p>
							You are free to refuse our request for your personal information, with the
							understanding that we may be unable to provide you with some of your
							desired services.
						</p>
						<p>
							Your continued use of our website will be regarded as acceptance of our
							practices around privacy and personal information. If you have any
							questions about how we handle user data and personal information, feel free
							to contact us.
						</p>
						<p>This policy is effective as of 21 May 2019.</p>
					</Paper>
				</div>

				<div
					align="center"
					style={{
						backgroundColor: '#f9f9f9',
						paddingTop: '5%',
						margin: 0
					}}
				/>
			</div>
		);
	}
}

export default Phones;
