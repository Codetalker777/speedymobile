import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/styles';
import { Helmet } from 'react-helmet';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

import { trackPageView, addGAEvent } from '../utils/GoogleAnalytics';

import { placeOrder } from '../actions/checkoutActions/checkoutActions';
import { reset } from '../actions/searchActions/searchActions';

import SubscribeInput from '../components/Subscribe/SubscribeInput';

/* This page displays once you placed an order following the checkout flow */

// Styling
const StyledPaper = styled(Paper)({
	// background: "red",
	flex: 1,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	alignSelf: 'center',
	flexDirection: 'column',
	width: '100%',
	marginTop: '8%',
	marginBottom: '5%',
	paddingTop: '50px',
	paddingBottom: '50px'
});

class OrderConfirmed extends React.Component {
	componentDidMount() {
		const { cart } = this.props;
		document.title = 'Order Confirmed';
		// GA track view
		trackPageView(this.props.location);

		// clear cart and place order if the cart is not empty
		if (cart !== null && cart !== [] && cart.length !== 0) {
			this.props.placeOrder();
			this.props.cookies.remove('cart');
		}
	}

	componentWillUnmount() {
		// clear all data once you leave this page
		const { cart } = this.props;
		if (cart !== null && cart !== []) {
			this.props.reset();
		}
	}

	render() {
		const { cart, loading, error } = this.props;

		// nothing in cart redirect to cart
		if ((cart === null || cart === []) && loading) {
			return <Redirect to="/Cart" />;
		}
		// waiting for response from backend
		if (loading) {
			return (
				<div>
					<Helmet>
						<title>Order Confirmation | SpeedyMobile</title>
						<meta name="twitter:card" content="summary_large_image" />
						<meta property="og:type" content="website" />
						<meta property="og:url" content={`${process.env.API_URL}/OrderConfirmed`} />
						<meta
							name="description"
							content="Confirmation that your order has been placed"
						/>
						<meta property="og:title" content="Order Confirmation" />
						<meta
							property="og:description"
							content="Confirmation that your order has been placed"
						/>
						<meta name="twitter:image" content={TwitterLink} />
						<meta property="og:image" content={FaceBookLink} />
						<meta property="fb:app_id" content="794534664367050" />
					</Helmet>
					<CircularProgress />
				</div>
			);
		}
		// order failed
		if (!loading && error) {
			addGAEvent('Order Confirmation', 'Failed to place order', 'Order');
			return (
				<div>
					<Helmet>
						<title>Order Confirmation | SpeedyMobile</title>
						<meta name="twitter:card" content="summary_large_image" />
						<meta property="og:type" content="website" />
						<meta property="og:url" content={`${process.env.API_URL}/OrderConfirmed`} />
						<meta
							name="description"
							content="Confirmation that your order has been placed"
						/>
						<meta property="og:title" content="Order Confirmation" />
						<meta
							property="og:description"
							content="Confirmation that your order has been placed"
						/>
						<meta name="twitter:image" content={TwitterLink} />
						<meta property="og:image" content={FaceBookLink} />
						<meta property="fb:app_id" content="794534664367050" />
					</Helmet>
					<div align="center">
						<StyledPaper>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center'
								}}
							>
								<Typography
									variant="h1"
									style={{
										fontSize: 20,
										fontWeight: 'bold',
										marginBottom: 30
									}}
								>
									Thank you for using our Website!
								</Typography>
								<Typography
									align="left"
									variant="body1"
									style={{ marginBottom: 10, padding: 10 }}
								>
									We hope that we helped you find a plan and/or phone that better suits
									your needs! We are still building the order portion of our site so
									unfortunately your order will not be processed. But don't be worried!
									No credit card information was stored.
								</Typography>
								<Typography
									align="left"
									variant="body1"
									style={{ marginBottom: 10, padding: 10 }}
								>
									With that being said we would love your feedback (button at the top) on
									what would make your experience better. And please subscribe to our
									newsletter for deals, discounts and plan updates from our carriers!
								</Typography>
								<Typography
									align="left"
									variant="body1"
									style={{ marginBottom: 30, padding: 10 }}
								>
									We want to make buying a cell phone feel convenient, easy and stress
									free. This way when it comes to hitting purchase you don't feel cheated
									later down the line.
								</Typography>
								<SubscribeInput deleteSub={false} />
							</div>
						</StyledPaper>
					</div>
				</div>
			);
		}
		// order confirmed
		addGAEvent('Order Confirmation', 'Sucessfully placed order', 'Order');
		return (
			<div>
				<Helmet>
					<title>Order Confirmation | SpeedyMobile</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`${process.env.API_URL}/OrderConfirmed`} />
					<meta
						name="description"
						content="Confirmation that your order has been placed"
					/>
					<meta property="og:title" content="Order Confirmation" />
					<meta
						property="og:description"
						content="Confirmation that your order has been placed"
					/>
					<meta name="twitter:image" content={TwitterLink} />
					<meta property="og:image" content={FaceBookLink} />
					<meta property="fb:app_id" content="794534664367050" />
				</Helmet>
				<div align="center">
					<StyledPaper>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center'
							}}
						>
							<Typography
								variant="h1"
								style={{
									fontSize: 20,
									fontWeight: 'bold',
									marginBottom: 30
								}}
							>
								Thank you for using our Website!
							</Typography>
							<Typography
								align="left"
								variant="body1"
								style={{ marginBottom: 10, padding: 10 }}
							>
								We hope that we helped you find a plan and/or phone that better suits
								your needs! We are still building the order portion of our site so
								unfortunately your order will not be processed. But don't be worried! No
								credit card information was stored.
							</Typography>
							<Typography
								align="left"
								variant="body1"
								style={{ marginBottom: 10, padding: 10 }}
							>
								With that being said we would love your feedback (button at the top) on
								what would make your experience better. And please subscribe to our
								newsletter for deals, discounts and plan updates from our carriers!
							</Typography>
							<Typography
								align="left"
								variant="body1"
								style={{ marginBottom: 30, padding: 10 }}
							>
								We want to make buying a cell phone feel convenient, easy and stress
								free. This way when it comes to hitting purchase you don't feel cheated
								later down the line.
							</Typography>
							<SubscribeInput deleteSub={false} />
						</div>
					</StyledPaper>
				</div>
			</div>
		);
	}
}

// actions
const mapDispatchToProperties = dispatch =>
	bindActionCreators({ placeOrder, reset }, dispatch);

// redux state
const mapStateToProperties = state => {
	return {
		cart: state.cart.cart,
		loading: state.checkout.loading,
		error: state.checkout.error
	};
};

// gives us access to router variables, cookies, redux and actions and exports cart
export default withRouter(
	withCookies(connect(mapStateToProperties, mapDispatchToProperties)(OrderConfirmed))
);
