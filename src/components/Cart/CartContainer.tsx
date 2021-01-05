import React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CartItemPhone from './CartItemPhone';
import CartItemPlan from './CartItemPlan';
import { useSelector } from '../../reducers';
import { IndividualPhone, CartType, Plan } from '../../utils/dataTypes';

const useStyles = makeStyles(theme => ({
	root: {
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	title: {
		marginTop: 60,
		color: '#313131',
		fontSize: '50px',
		fontFamily: 'Roboto',
		fontWeight: 800,
		paddingBottom: 50
	},
	innerTitle: {
		width: '160px',
		borderBottom: '8px solid #49c5b6'
	},
	subTitle: {
		fontSize: 20,
		paddingTop: 30,
		fontWeight: 'bold'
	},
	paper: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'column',
		width: '100%',
		marginBottom: '5%',
		paddingBottom: 100,
		[theme.breakpoints.up('sm')]: {
			width: '50%'
		}
	},
	tableCell: {
		paddingTop: 0,
		paddingBottom: 5
	},
	tableCellBold: {
		paddingTop: 0,
		paddingBottom: 5,
		fontWeight: 'bold'
	},
	button: {
		width: '25%',
		marginTop: 30,
		marginBottom: 30
	},
	tableOuterContainer: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%'
	},
	tableInnerContainer: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		minWidth: '50%'
	}
}));

const totalActivationFee = () => {
	let cost = 0;
	for (let i = 0; i < plans.length; i++) {
		cost += plans[i].activationFee * cart[plans[i].id].quantity;
	}
	return cost;
};

const totalUpFrontCost = (
	phones: IndividualPhone[],
	plans: Plan[],
	cart: CartType | null
): number => {
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

const simCardFees = (plans: Plan[], cart: CartType | null): number => {
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

const totalMonthlyCost = (plans: Plan[], cart: CartType | null): number => {
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

export default function CartContainer(): JSX.Element {
	const { phones, plans, cart } = useSelector(state => state.cart);
	const theme = useTheme();
	const classes = useStyles(theme);
	if (phones?.length === 0 && plans.length === 0) {
		return (
			<div className={classes.root}>
				<Typography component="h1" align="center" className={classes.title}>
					<span className={classes.innerTitle}>Cart</span>
				</Typography>
				<Paper className={classes.paper}>
					<Typography className={classes.subTitle}>Shopping Cart</Typography>
					<Typography>No Items in Cart!</Typography>
				</Paper>
			</div>
		);
	}
	return (
		<div className={classes.root}>
			<br />
			<Typography component="h1" align="center" className={classes.title}>
				<span className={classes.innerTitle}>Cart</span>
			</Typography>
			<Paper className={classes.paper}>
				{phones.map(function (phone) {
					return <CartItemPhone phone={phone} key={phone.slug} review={false} />;
				})}
				{plans.map(function (plan) {
					return <CartItemPlan plan={plan} key={plan.slug} review={false} />;
				})}
				<div className={classes.tableOuterContainer}>
					<div className={classes.tableInnerContainer}>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell className={classes.tableCell}>Monthly Rate</TableCell>
									<TableCell className={classes.tableCell} align="right">
										${totalMonthlyCost(plans, cart).toFixed(2)}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className={classes.tableCell}>Tax</TableCell>
									<TableCell className={classes.tableCell} align="right">
										${(0.13 * totalMonthlyCost(plans, cart)).toFixed(2)}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className={classes.tableCellBold}>
										Total Monthly Rate
									</TableCell>
									<TableCell className={classes.tableCellBold} align="right">
										${(1.13 * totalMonthlyCost(plans, cart)).toFixed(2)}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className={classes.tableCell}>Sim Card fee</TableCell>
									<TableCell className={classes.tableCell} align="right">
										${simCardFees(plans, cart).toFixed(2)}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className={classes.tableCell}>Subtotal</TableCell>
									<TableCell className={classes.tableCell} align="right">
										${totalUpFrontCost(phones, plans, cart).toFixed(2)}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className={classes.tableCell}>Tax</TableCell>
									<TableCell className={classes.tableCell} align="right">
										${(0.13 * totalUpFrontCost(phones, plans, cart)).toFixed(2)}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className={classes.tableCellBold}>Total</TableCell>
									<TableCell className={classes.tableCellBold} align="right">
										${(1.13 * totalUpFrontCost(phones, plans, cart)).toFixed(2)}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</div>
				<Button component={Link} to="/Checkout" className={classes.button}>
					Checkout
				</Button>
			</Paper>
		</div>
	);
}
