import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import ChatrLogo from '../../data/images/ChatrLogo.png';
import LuckyLogo from '../../data/images/LuckyLogo.png';

import {
	Box,
	Typography,
	Grid,
	Button,
	AppBar,
	Slider,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	AccordionActions,
	Card,
	Divider
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { Plan } from '../../utils/dataTypes';
import { useSelector } from '../../reducers';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PhoneIcon from '@material-ui/icons/Phone';
import TextsmsIcon from '@material-ui/icons/Textsms';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import SimCardIcon from '@material-ui/icons/SimCard';
import FilterIcon from '@material-ui/icons/FilterList';
import { setFilter } from '../../actions/individualPlanActions/individualPlanActions';

const useStyles = makeStyles(theme => ({
	textField: {
		width: '100%'
	},
	mainText: {
		color: 'black',
		fontSize: 18,
		fontWeight: 450
	},
	buttonText: {
		color: '#49c5b6'
	},
	button: {
		background: 'transparent',
		'&:hover': {
			backgroundColor: 'transparent',
			'@media (hover: none)': {
				backgroundColor: 'transparent'
			}
		},
		backgroundColor: '',
		'&:active': {
			boxShadow: 'none',
			backgroundColor: ''
		},
		color: 'white',
		borderRadius: 8
	},
	iconExpanded: {
		transform: 'rotate(0deg) !important'
	},
	carrierImage: {
		width: '50%',
		objectFit: 'scale-down'
	},
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	},
	icon: {
		// color: '#009688'
	},
	AppBarText: {
		fontSize: 21,
		fontWeight: 350,
		paddingLeft: 10
	}
}));

const dataDisplay = data => {
	if (data < 1000) {
		return `${data}MB`;
	}
	return `${data / 1000}GB`;
};

const dataValue = (value: number) => {
	switch (value) {
		case 1:
			return 100;
		case 2:
			return 200;
		case 3:
			return 500;
		case 4:
			return 1000;
		case 5:
			return 2000;
		case 6:
			return 3000;
		case 7:
			return 4000;
		case 8:
			return 5000;
		case 9:
			return 7000;
		case 10:
			return 8000;

		default:
			return 0;
	}
};

const minuteValue = value => {
	switch (value) {
		case 1:
			return 50;
		case 2:
			return 75;
		case 3:
			return 100;
		case 4:
			return 200;
		case 5:
			return 'Unlimited';
		default:
			return 0;
	}
};

const minuteDisplay = value => {
	if (value !== 'Unlimited') {
		return `${value} mins`;
	}
	return value;
};

const messageValue = value => {
	switch (value) {
		case 1:
			return 50;
		case 2:
			return 75;
		case 3:
			return 100;
		case 4:
			return 200;
		case 5:
			return 'Unlimited';
		default:
			return 0;
	}
};

const messageDisplay = value => {
	if (value !== 'Unlimited') {
		return `${value} msgs`;
	}
	return value;
};

export default function FilterCard(): JSX.Element {
	const theme = useTheme();
	const classes = useStyles(theme);

	const plans = useSelector(state => state.individualPlans.plans);
	const dispatch = useDispatch();

	const [data, setData] = React.useState(0);
	const [talkMinutes, setTalkMinutes] = React.useState(0);
	const [textMessages, setTextMessages] = React.useState(0);

	const handleData = (event, newValue) => {
		setData(newValue);
	};
	const handleTalkMinutes = (event, newValue) => {
		setTalkMinutes(newValue);
	};
	const handleTextMessages = (event, newValue) => {
		setTextMessages(newValue);
	};

	const applyFilters = (): void => {
		const filteredResults = plans?.filter(plan => {
			return (
				plan?.data >= dataValue(data) &&
				(plan?.minutes >= minuteValue(talkMinutes) || plan?.minutes === 'Unlimited') &&
				(plan?.messages >= messageValue(textMessages) || plan?.messages === 'Unlimited')
			);
		});

		dispatch(setFilter(filteredResults || []));
	};

	const clearFilters = () => {
		setData(0);
		setTalkMinutes(0);
		setTextMessages(0);

		dispatch(setFilter(plans || []));
	};
	return (
		<div className={classes.root}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ArrowDownwardIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Box
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center'
						}}
						align="center"
					>
						<FilterIcon className={classes.icon} />
						<Typography style={{ color: '#49c5b6' }} className={classes.AppBarText}>
							Filters
						</Typography>
					</Box>
				</AccordionSummary>
				<AccordionDetails>
					<Grid spacing={3} container justify="center">
						{/* ***************** Carrier ********************* */}

						<Grid item xs={11} sm={12}>
							<Card style={{ padding: 10, paddingTop: 20, paddingBottom: 20 }}>
								<Box
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'center'
									}}
									align="center"
								>
									<SimCardIcon className={classes.icon} />
									<Typography className={classes.AppBarText}>Carrier</Typography>
								</Box>

								<br />
								<Grid item xs style={{ textAlign: 'center' }}>
									<Box
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'center'
										}}
										align="center"
									>
										<Button
											component={Link}
											to="/Carrier/Chatr"
											style={{ backgroundColor: 'transparent' }}
										>
											<img
												className={classes.carrierImage}
												src={ChatrLogo}
												alt={'Chatr Mobile'}
											></img>
										</Button>

										<Button
											component={Link}
											to="/Carrier/Lucky-Mobile"
											style={{ backgroundColor: 'transparent' }}
										>
											<img
												className={classes.carrierImage}
												src={LuckyLogo}
												alt={'Lucky Mobile'}
											></img>
										</Button>
									</Box>
								</Grid>
							</Card>
						</Grid>

						<br />
						<br />
						<br />

						<br />

						{/* ***************** Data ********************* */}
						<Grid item xs={11} sm={6}>
							<div>
								<Box
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'center'
									}}
									align="center"
								>
									<DataUsageIcon className={classes.icon} />
									<Typography className={classes.AppBarText}>Data</Typography>
								</Box>

								<Grid item xs style={{ textAlign: 'center' }}>
									<Slider
										min={0}
										max={10}
										step={1}
										value={data}
										onChange={handleData}
										valueLabelFormat={dataDisplay(dataValue(data))}
										valueLabelDisplay="auto"
										aria-labelledby="data-slider"
									/>
								</Grid>
							</div>
						</Grid>

						<br />
						<br />

						{/* ***************** Text ********************* */}

						<Grid item xs={11} sm={6}>
							<div>
								<Box
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'center'
									}}
									align="center"
								>
									<TextsmsIcon className={classes.icon} />
									<Typography className={classes.AppBarText}>Text</Typography>
								</Box>

								<Grid item xs style={{ textAlign: 'center' }}>
									<Slider
										value={textMessages}
										onChange={handleTextMessages}
										valueLabelDisplay="auto"
										step={1}
										aria-labelledby="text-slider"
										valueLabelFormat={messageDisplay(messageValue(textMessages))}
										max={5}
										min={0}
									/>
								</Grid>
							</div>
						</Grid>

						<br />
						<br />
						{/* ***************** Minutes ********************* */}

						<Grid item xs={11} sm={6}>
							<div>
								<Box
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'center'
									}}
									align="center"
								>
									<PhoneIcon className={classes.icon} />
									<Typography className={classes.AppBarText}>Minutes</Typography>
								</Box>

								<Grid item xs style={{ textAlign: 'center' }}>
									<Slider
										value={talkMinutes}
										onChange={handleTalkMinutes}
										valueLabelDisplay="auto"
										step={1}
										aria-labelledby="talk-slider"
										valueLabelFormat={minuteDisplay(minuteValue(talkMinutes))}
										max={5}
										min={0}
									/>
								</Grid>
							</div>
						</Grid>
					</Grid>
				</AccordionDetails>

				<br />
				<Divider
					style={{
						width: '100%',
						backgroundColor: '#e0e0e0'
					}}
				/>

				<AccordionActions>
					<Button
						onClick={clearFilters}
						size="small"
						color="primary"
						variant="text"
						className={classes.button}
					>
						<Typography className={classes.buttonText}>Clear Filters</Typography>
					</Button>

					<Button
						onClick={applyFilters}
						size="small"
						color="primary"
						variant="text"
						className={classes.button}
					>
						<Typography className={classes.buttonText}>Apply</Typography>
					</Button>
				</AccordionActions>
			</Accordion>
		</div>
	);
}
