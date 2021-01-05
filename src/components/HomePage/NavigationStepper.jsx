import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SearchIcon from '@material-ui/icons/Search';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import StepConnector from '@material-ui/core/StepConnector';
import { useMediaQuery } from 'react-responsive';
import Typography from '@material-ui/core/Typography';

const ColorlibConnector = withStyles({
	alternativeLabel: {
		top: 22
	},
	active: {
		'& $line': {
			backgroundColor: '#999999'
		}
	},
	completed: {
		'& $line': {
			backgroundColor: '#999999'
		}
	},
	line: {
		height: 3,
		border: 0,
		backgroundColor: '#ededed',
		borderRadius: 1
	}
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
	root: {
		backgroundColor: '#fafafa',
		zIndex: 1,
		color: '#ededed',

		width: 35,
		height: 35,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	active: {
		backgroundColor: '#999999',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
	},
	completed: {
		backgroundColor: '#999999'
	}
});

function ColorlibStepIcon(props) {
	const classes = useColorlibStepIconStyles();
	const { active, completed } = props;

	const icons = {
		1: <SearchIcon />,
		2: <PhoneIphoneIcon />,
		3: <CreditCardIcon />
	};

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed
			})}
		>
			{icons[String(props.icon)]}
		</div>
	);
}

function getSteps() {
	return ['SEARCH', 'SELECT', 'BUY'];
}

export default function NavigationStepper() {
	const steps = getSteps();
	const matches = useMediaQuery({ query: '(max-width: 425px)' });
	if (matches) {
		return (
			<>
				<Typography
					style={{
						fontWeight: '700',
						fontSize: '17px',
						marginBottom: 10,
						fontFamily: 'Roboto',
						color: '#999999'
					}}
					align="center"
				>
					FIND YOUR PERFECT PLAN
				</Typography>
				<Stepper
					style={{ padding: '0px 0px 20px 0px', backgroundColor: '#fafafa' }}
					alternativeLabel
					activeStep={3}
					connector={<ColorlibConnector />}
				>
					{steps.map(label => (
						<Step key={label}>
							<StepLabel StepIconComponent={ColorlibStepIcon} />
							<Typography
								align="center"
								style={{
									fontWeight: '600',
									fontSize: '13px',
									fontFamily: 'Roboto',
									color: '#999999'
								}}
							>
								{label}
							</Typography>
						</Step>
					))}
				</Stepper>
			</>
		);
	}

	return null;
}
