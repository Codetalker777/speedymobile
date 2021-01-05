import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/styles';
import CartItemPhone from '../Cart/CartItemPhone';
import CartItemPlan from '../Cart/CartItemPlan';

/* Last page of the checkout flow, it shows a page that allows you to review all your
purchases before confirming a purchase */

// Styling
const StyledPaper = styled(Paper)({
	// background: "red",
	flex: 1,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	alignSelf: 'center',
	flexDirection: 'column',
	width: '25em',
	// marginTop:"5em",
	marginBottom: '5%',
	paddingTop: '50px',
	paddingBottom: '50px'
});

const StyleTableCell = styled(TableCell)({
	paddingTop: 0,
	paddingBottom: 5
});

const totalUpFrontCost = (phones, plans, cart) => {
	let cost = 0;
	if (!cart) {
		return cost;
	}
	phones.forEach(phone => {
		const cartItem = cart.phones[phone.slug];
		cost += phone.cost[`${cartItem.color}${cartItem.storage}`] * cartItem.quantity;
	});
	plans.forEach(plan => {
		const cartItem = cart.plans[plan.slug];
		cost +=
			(plan.upfrontCost + plan.activationFee + plan.simCardFee) * cartItem.quantity;
	});
	return cost;
};

const simCardFees = (plans, cart) => {
	let cost = 0;
	if (!cart) {
		return cost;
	}
	plans.forEach(plan => {
		const cartItem = cart.plans[plan.slug];
		cost += plan.simCardFee * cartItem.quantity;
	});
	return cost;
};

const totalMonthlyCost = (plans, cart) => {
	let cost = 0;
	if (!cart) {
		return cost;
	}
	plans.forEach(plan => {
		const cartItem = cart.plans[plan.slug];
		cost += plan.monthlyCost * cartItem.quantity;
	});
	return cost;
};

class reviewCheckout extends React.Component {
	render() {
		const {
			phones,
			plans,
			cart,
			handleNext,
			handleBack,
			firstName,
			lastName,
			email,
			phoneNumber,
			address,
			city,
			province,
			postalCode,
			billingFirstName,
			billingLastName,
			billingAddress,
			billingCity,
			billingProvince,
			billingPostalCode,
			cardNumber,
			expirationMonth,
			expirationYear,
			deliveryCost,
			deliveryType
		} = this.props;

		// financial calculations
		const totalActivationFee = () => {
			let cost = 0;
			for (let i = 0; i < plans.length; i++) {
				cost += plans[i].activationFee * cart[plans[i].id].quantity;
			}
			return cost;
		};

		// output
		return (
			<div align="center">
				<StyledPaper>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<Typography align="center" style={{ fontWeight: 'bold' }}>
							Your Order
						</Typography>
						{phones.map(function (phone) {
							return <CartItemPhone phone={phone} key={phone.id} review />;
						})}
						{plans.map(function (plan) {
							return <CartItemPlan plan={plan} key={plan.id} review />;
						})}

						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									textAlign: 'center',
									minWidth: '50%'
								}}
							>
								<Typography
									style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 80 }}
								>
									Contact information
								</Typography>
								<Table>
									<TableBody>
										<TableRow>
											<StyleTableCell>
												{firstName} {lastName}
											</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell>Email: {email}</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell>Phone: {phoneNumber}</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell>{address}</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell>
												{city}, {province}, {postalCode}
											</StyleTableCell>
										</TableRow>
									</TableBody>
								</Table>

								<Typography
									style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 80 }}
								>
									Shipping Information
								</Typography>
								<Table>
									<TableBody>
										<TableRow>
											<StyleTableCell>
												{billingFirstName} {billingLastName}
											</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell>{billingAddress}</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell>
												{billingCity}, {billingProvince}, {billingPostalCode}
											</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell>{deliveryType}</StyleTableCell>
										</TableRow>
									</TableBody>
								</Table>

								<Typography
									style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 80 }}
								>
									Payment Information
								</Typography>
								<Table>
									<TableBody>
										<TableRow>
											<StyleTableCell>
												Credit Card: {cardNumber.replace(/.(?=.{4,}$)/g, '*')}
											</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell>
												Expiry Date: {expirationMonth}/{expirationYear}
											</StyleTableCell>
										</TableRow>
									</TableBody>
								</Table>

								<Typography
									style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 80 }}
								>
									Subtotal
								</Typography>
								<Table>
									<TableBody>
										<TableRow>
											<StyleTableCell>Monthly Rate</StyleTableCell>
											<StyleTableCell align="right">
												${totalMonthlyCost(plans, cart).toFixed(2)}
											</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell>Tax</StyleTableCell>
											<StyleTableCell align="right">
												${(0.13 * totalMonthlyCost(plans, cart)).toFixed(2)}
											</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell style={{ fontWeight: 'bold' }}>
												Total Monthly Rate
											</StyleTableCell>
											<StyleTableCell style={{ fontWeight: 'bold' }} align="right">
												${(1.13 * totalMonthlyCost(plans, cart)).toFixed(2)}
											</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell>Sim Card fee</StyleTableCell>
											<StyleTableCell align="right">
												${simCardFees(plans, cart).toFixed(2)}
											</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell>Subtotal</StyleTableCell>
											<StyleTableCell align="right">
												${totalUpFrontCost(phones, plans, cart).toFixed(2)}
											</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell>Tax</StyleTableCell>
											<StyleTableCell align="right">
												$
												{(0.13 * totalUpFrontCost(phones, plans, cart || {})).toFixed(2)}
											</StyleTableCell>
										</TableRow>
										<TableRow>
											<StyleTableCell style={{ fontWeight: 'bold' }}>
												Total
											</StyleTableCell>
											<StyleTableCell style={{ fontWeight: 'bold' }} align="right">
												$
												{(1.13 * totalUpFrontCost(phones, plans, cart || {})).toFixed(2)}
											</StyleTableCell>
										</TableRow>
									</TableBody>
								</Table>
							</div>
						</div>

						<Button
							style={{
								// color: 'white',
								marginTop: 30,
								marginBottom: 30,
								alignSelf: 'center'
								// backgroundColor: '#49c5b6'
							}}
							component={Link}
							to="/OrderConfirmed"
						>
							Place Order
						</Button>
						<Button
							style={{
								backgroundColor: 'grey',
								color: 'white',
								alignSelf: 'center'
							}}
							onClick={handleBack}
						>
							Back
						</Button>
					</div>
				</StyledPaper>
			</div>
		);
	}
}

// actions
const mapDispatchToProperties = dispatch => bindActionCreators({}, dispatch);

// redux variables
const mapStateToProps = state => {
	return {
		phones: state.cart.phones,
		plans: state.cart.plans,
		cart: state.cart.cart,
		deliveryCost: state.checkout.deliveryCost,
		deliveryType: state.checkout.deliveryType,
		firstName: state.checkout.firstName,
		lastName: state.checkout.lastName,
		email: state.checkout.email,
		phoneNumber: state.checkout.phoneNumber,
		address: state.checkout.address,
		city: state.checkout.city,
		province: state.checkout.province,
		postalCode: state.checkout.postalCode,
		billingFirstName: state.checkout.billingFirstName,
		billingLastName: state.checkout.billingLastName,
		billingAddress: state.checkout.billingAddress,
		billingCity: state.checkout.billingCity,
		billingProvince: state.checkout.billingProvince,
		billingPostalCode: state.checkout.billingPostalCode,
		cardNumber: state.checkout.cardNumber,
		securityCode: state.checkout.securityCode,
		expirationMonth: state.checkout.expirationMonth,
		expirationYear: state.checkout.expirationYear
	};
};

export default connect(mapStateToProps, mapDispatchToProperties)(reviewCheckout);
