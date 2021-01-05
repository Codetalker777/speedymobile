import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet';
import { trackPageView } from '../utils/GoogleAnalytics';

import { placeOrder } from '../actions/checkoutActions/checkoutActions';
import { reset } from '../actions/searchActions/searchActions';

import UnSubscribeInput from '../components/Subscribe/UnSubscribeInput';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

/* UnSubscribe page on the web app */

// Styling
const StyledPaper = {
	fontFamily: 'Roboto',
	fontWeight: '200',
	fontSize: 'small',
	flexDirection: 'row',
	display: 'flex',
	justifyContent: 'space-evenly',
	flexWrap: 'wrap',
	width: '100%',
	overflow: 'visible'
};

class UnSubscribe extends React.Component {
	componentDidMount() {
		window.prerenderReady = true;
		// GA track page view
		trackPageView(this.props.location);
	}

	componentWillUnmount() {
		// reset data once you leave the page
		this.props.reset();
	}

	render() {
		return (
			<div>
				<Helmet>
					<title>UnSubscribe | SpeedyMobile</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`${process.env.API_URL}/UnSubscribe`} />
					<meta
						name="description"
						content="Click here to unsubscribe from our weekly newsletter"
					/>
					<meta property="og:title" content="UnSubscribe" />
					<meta
						property="og:description"
						content="Click here to unsubscribe from our weekly newsletter"
					/>
					<meta name="twitter:image" content={TwitterLink} />
					<meta property="og:image" content={FaceBookLink} />
					<meta property="fb:app_id" content="794534664367050" />
				</Helmet>
				<div align="center">
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							height: '400px',
							boxShadow: `0px 1px 3px #999999`,
							maxWidth: '50em',
							marginLeft: '20px',
							marginRight: '20px',
							marginTop: '7em',
							marginBottom: '10%',
							paddingTop: '5em',
							paddingLeft: '20px',
							paddingRight: '20px'
						}}
					>
						<Typography
							style={{
								fontSize: 20,
								fontWeight: 'bold',
								marginTop: 60,
								marginBottom: 30
							}}
						>
							Stop Subscription
						</Typography>
						<UnSubscribeInput />
					</div>
				</div>
			</div>
		);
	}
}

// actions
const mapDispatchToProps = dispatch =>
	bindActionCreators({ placeOrder, reset }, dispatch);

// redux store
const mapStateToProps = state => {
	return {
		cart: state.cart.cart,
		loading: state.checkout.loading,
		error: state.checkout.error
	};
};

// gives us access to router variables, cookies, redux and actions and exports Unsubscribe
export default withRouter(
	withCookies(connect(mapStateToProps, mapDispatchToProps)(UnSubscribe))
);
