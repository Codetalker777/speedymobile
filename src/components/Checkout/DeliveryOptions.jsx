import React from 'react';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
	firstDeliveryOption,
	secondDeliveryOption,
	thirdDeliveryOption,
	setDelivery
} from '../../actions/checkoutActions/checkoutActions';
import { addGAEvent } from '../../utils/GoogleAnalytics';

/* This file contains the page in the checkout flow that lists all of the delievry options */

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

class deliveryOptions extends React.Component {
	render() {
		const {
			handleNext,
			handleBack,
			check1,
			check2,
			check3,
			firstDeliveryOption,
			secondDeliveryOption,
			thirdDeliveryOption,
			setDelivery
		} = this.props;

		// moves the the next page setting the delivery option chosen
		const handleNextButton = () => {
			if (check1) {
				addGAEvent('Checkout', 'Selected Same Day Home Delivery', 'Delivery', 5);
				setDelivery(4.99, 'Same Day Home Delivery');
				handleNext();
			} else if (check2) {
				addGAEvent('Checkout', 'Selected Standard Shipping', 'Delivery', 0);
				setDelivery(0, 'Standard Shipping');
				handleNext();
			} else {
				addGAEvent('Checkout', 'Selected In-Store Pickup', 'Delivery', 0);
				setDelivery(0, 'In-Store Pickup');
				handleNext();
			}
		};
		return (
			<div align="center">
				<StyledPaper>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								paddingRight: 15,
								paddingLeft: 15
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'flex-start'
								}}
							>
								<FormControlLabel
									style={{ flex: 6, justifySelf: 'flex-start' }}
									control={<Radio checked={check1} onChange={firstDeliveryOption} />}
									label="Same Day Home Delivery"
								/>
								<Typography
									align="right"
									style={{ flex: 1, fontWeight: 'bold', alignSelf: 'center' }}
								>
									$4.99
								</Typography>
							</div>
							<Typography style={{ paddingLeft: 10, paddingRight: 10 }}>
								A carrier from our delivery team will deliver your phone within 24 hours
								at your door-step
								<br />
								<br />
							</Typography>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'flex-start'
								}}
							>
								<FormControlLabel
									style={{ flex: 6, justifySelf: 'flex-start' }}
									control={<Radio checked={check2} onChange={secondDeliveryOption} />}
									label="Shipping"
								/>
								<Typography
									align="right"
									style={{ flex: 1, fontWeight: 'bold', alignSelf: 'center' }}
								>
									Free
								</Typography>
							</div>
							<Typography style={{ paddingLeft: 10, paddingRight: 10 }}>
								Standard Shipping: Delivery within 3-5 business days
								<br />
								<br />
							</Typography>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'flex-start'
								}}
							>
								<FormControlLabel
									style={{ flex: 6, alignSelf: 'flex-start' }}
									control={<Radio checked={check3} onChange={thirdDeliveryOption} />}
									label="In-Store Pickup"
								/>
								<Typography
									align="right"
									style={{ flex: 1, fontWeight: 'bold', alignSelf: 'center' }}
								>
									Free
								</Typography>
							</div>
							<Typography style={{ paddingLeft: 10, paddingRight: 10 }}>
								You will recieve an email when your phone is ready to pickup at the
								nearest provider location. Processing time 1-3 days
							</Typography>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									marginTop: 30
								}}
							>
								<Button style={{ marginRight: 15 }} onClick={handleBack}>
									Back
								</Button>
								<Button onClick={handleNextButton}>Next</Button>
							</div>
						</div>
					</div>
				</StyledPaper>
			</div>
		);
	}
}

// actions
const mapDispatchToProperties = dispatch =>
	bindActionCreators(
		{
			firstDeliveryOption,
			secondDeliveryOption,
			thirdDeliveryOption,
			setDelivery
		},
		dispatch
	);

// redux store
const mapStateToProps = state => {
	return {
		check1: state.checkout.check1,
		check2: state.checkout.check2,
		check3: state.checkout.check3
	};
};

export default connect(mapStateToProps, mapDispatchToProperties)(deliveryOptions);
