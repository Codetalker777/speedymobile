import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet';

import CheckoutStepper from '../components/Checkout/CheckoutStepper';

import { trackPageView } from '../utils/GoogleAnalytics';

import { getCartItems } from '../actions/cartActions/cartActions';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

/* This file contains the code for the checkout flow */

class Checkout extends React.Component {
	componentDidMount() {
		document.title = 'Checkout';
		// GA page view
		trackPageView(this.props.location);
	}

	render() {
		const { items, cart, loading } = this.props;

		// if cart is empty redirect to the cart
		if (cart === null || cart === []) {
			return <Redirect to="/Cart" />;
		}
		// display the checkout pages

		return (
			<div>
				<Helmet>
					<title>Checkout | SpeedyMobile</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`${process.env.API_URL}/Checkout`} />
					<meta name="description" content="Complete the purchasses of your plan" />
					<meta property="og:title" content="Checkout" />
					<meta
						property="og:description"
						content="Complete the purchasses of your plan"
					/>
					<meta name="twitter:image" content={TwitterLink} />
					<meta property="og:image" content={FaceBookLink} />
				</Helmet>
				<CheckoutStepper />
			</div>
		);
	}
}

// actions
const mapDispatchToProps = dispatch => bindActionCreators({ getCartItems }, dispatch);

// redux state
const mapStateToProps = state => {
	return {
		items: state.cart.plans,
		cart: state.cart.cart,
		loading: state.cart.loading
	};
};

// gives us access to router variables, cookies, redux and actions and exports checkout
export default withRouter(
	withCookies(connect(mapStateToProps, mapDispatchToProps)(Checkout))
);
