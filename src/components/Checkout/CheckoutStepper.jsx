import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Payment from '@material-ui/icons/Payment';
import LocalShipping from '@material-ui/icons/LocalShipping';
import List from '@material-ui/icons/List';

import PaymentDetails from './PaymentDetails';
import DeliveryOptions from './DeliveryOptions';
import ReviewCheckout from './ReviewCheckout';

// this file determines which page to display on the checkout flow depending on value in active step

class HorizontalLinearStepper extends React.Component {
	constructor(props) {
		super(props);
		this.state = { activeStep: 0 };
	}

	render() {
		const { activeStep } = this.state;

		// move to next page
		const handleNext = () => {
			const next = activeStep + 1;
			this.setState({ activeStep: next });
		};
		// go back
		const handleBack = () => {
			if (activeStep === 0) {
				return;
			}
			const back = activeStep - 1;
			this.setState({ activeStep: back });
		};

		// determines which page to display
		const returnOption = () => {
			if (activeStep === 0) {
				return <PaymentDetails handleBack={handleBack} handleNext={handleNext} />;
			}
			if (activeStep === 1) {
				return <DeliveryOptions handleBack={handleBack} handleNext={handleNext} />;
			}
			if (activeStep === 2) {
				return <ReviewCheckout handleBack={handleBack} handleNext={handleNext} />;
			}
			return null;
		};

		return (
			<div style={{ width: '100%' }}>
				{/* Header indicating what page you are on */}
				<Stepper activeStep={activeStep}>
					<Step>
						<StepLabel>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyItems: 'center'
								}}
							>
								<Typography style={{ paddingRight: 5 }}>Payment Details</Typography>
								<Payment />
							</div>
						</StepLabel>
					</Step>

					<Step>
						<StepLabel>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyItems: 'center'
								}}
							>
								<Typography style={{ paddingRight: 5 }}>Delivery Options</Typography>
								<LocalShipping />
							</div>
						</StepLabel>
					</Step>

					<Step>
						<StepLabel>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyItems: 'center'
								}}
							>
								<Typography style={{ paddingRight: 5 }}>Review</Typography>
								<List />
							</div>
						</StepLabel>
					</Step>
				</Stepper>
				{/* Page */}
				{returnOption()}
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center'
					}}
				/>
			</div>
		);
	}
}

export default HorizontalLinearStepper;
