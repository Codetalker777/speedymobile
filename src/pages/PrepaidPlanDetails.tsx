import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, Grid } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { RouteComponentProps, StaticContext } from 'react-router';

import PhoneIcon from '@material-ui/icons/Phone';
import TextsmsIcon from '@material-ui/icons/Textsms';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import VoicemailIcon from '@material-ui/icons/Voicemail';

import Divider from '@material-ui/core/Divider';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Helmet } from 'react-helmet';
import { getPlan, reset } from '../actions/planActions/planActions';
import { useSelector } from '../reducers';
import { Plan, CartType } from '../utils/dataTypes';

interface LocationProps {
	plan?: Plan;
}
interface PrepaidPlanPageRouteProps {
	planSlug: string;
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		paddingTop: '5%',
		paddingBottom: '10%',
		width: '90%',
		backgroundColor: '#fafafa'
	},
	CardLeft: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		paddingLeft: '9%',
		paddingRight: '9%',
		borderRadius: 8,
		align: 'left'
	},
	Card: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		paddingLeft: '9%',
		paddingRight: '9%',
		borderRadius: 8,
		align: 'left'
	},
	Divider: {
		height: 1,
		borderWidth: 0,
		color: '#ededed',
		backgroundColor: '#ededed',
		marginTop: 25,
		marginBottom: 25
	},
	Header: {
		fontFamily: 'roboto',
		fontWeight: 350,
		fontSize: 35,
		textAlign: 'center',
		// color: '#49c5b6',
		marginBottom: '-20px'
	},
	PlanPrice: {
		fontFamily: 'roboto',
		fontWeight: 350,
		fontSize: 85,
		color: '#49c5b6'
	},
	PlanPrice2: {
		fontFamily: 'roboto',
		fontWeight: 350,
		fontSize: 60,
		color: '#49c5b6',
		paddingTop: 15
	},
	firstWord: {
		fontWeight: 550,
		fontSize: 20
	},
	secondWord: {
		fontSize: 20,
		fontFamily: 'roboto',
		fontWeight: 350
	},
	Details: {
		textAlign: 'left',
		fontWeight: 300,
		fontSize: 15,
		textAlign: 'justify'
	},
	DetailsTitle: {
		textAlign: 'left',
		fontWeight: 300,
		fontSize: 15,
		fontFamily: 'roboto',
		align: 'justify',
		color: '#49c5b6',
		paddingBottom: 5
	},
	Avatar: {
		marginLeft: -15
		// fontSize: 4,
		// height: 4,
		// fill: '#49c5b6',
	},
	moreDetails: {
		backgroundColor: '#fafafa'
	},
	accordionDetails: {
		flexDirection: 'column'
	},
	heading: {
		fontSize: 15,
		fontWeight: 350,
		color: '#313131'
	},
	planName: {
		fontSize: 30,
		fontWeight: 350,
		color: '#49c5b6',
		fontFamily: 'roboto'
	}
}));

export default function PrepaidPlanDetails({
	location,
	match
}: RouteComponentProps<
	PrepaidPlanPageRouteProps,
	StaticContext,
	LocationProps
>): JSX.Element {
	const reducerPlan = useSelector(state => state.plan.plan);
	const plan = (location.state && location.state.plan) || reducerPlan;
	const [cookies, setCookie, removeCookie] = useCookies(['cart']);
	const dispatch = useDispatch();

	function addtoCart(): void {
		const newCookie: CartType = cookies.cart || {
			phones: {},
			plans: {}
		};
		newCookie.plans[plan?.slug || 'error'] = {
			plan: plan?.slug,
			quantity: 1
		};
		setCookie('cart', JSON.stringify(newCookie), { path: '/' });
	}

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!plan) {
			dispatch(getPlan(match.params.planSlug));
		}
		return (): void => {
			dispatch(reset());
		};
	}, []);

	const theme = useTheme();
	const classes = useStyles(theme);

	return (
		<div style={{ backgroundColor: '#fafafa' }} align="center">
			{plan && (
				<Helmet>
					<title>
						{plan.providerName} {plan.planName}
					</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={process.env.API_URL} />
					<meta name="description" content={plan.summary} />
					<meta property="og:title" content={plan.planName} />
					<meta property="og:description" content={plan.summary} />
					<meta name="twitter:image" content={plan.logo} />
					<meta property="og:image" content={plan.logo} />
					<meta property="fb:app_id" content="794534664367050" />
				</Helmet>
			)}
			<div className={classes.root}>
				<br />

				<Grid container spacing={3}>
					<Grid item xs={12} sm={5}>
						<Card className={classes.Card}>
							<img
								style={{ width: '20%', objectFit: 'scale-down' }}
								src={plan?.logo}
								alt={plan?.providerName}
								align="left"
							/>
							<br />
							<br />
							<br />

							<Typography className={classes.planName}>{plan?.planName}</Typography>

							<Box
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center'
								}}
								align="center"
							>
								<Typography className={classes.PlanPrice}>
									${`${plan?.monthlyCost}`}
								</Typography>
								<Typography style={{ fontSize: 15, fontWeight: 900, paddingTop: 30 }}>
									&nbsp;&nbsp;PER MONTH
								</Typography>
							</Box>

							<br />
							<br />

							<Grid
								container
								alignContent="left"
								alignItems="left"
								direction="column"
								justify="left"
							>
								{plan?.minutes !== 0 && (
									<Grid item xs style={{ textAlign: 'left' }}>
										<Box
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'left'
											}}
											align="left"
										>
											<PhoneIcon
												style={{ color: '#49c5b6', paddingRight: 10, fontSize: 30 }}
											/>
											&nbsp;
											<Typography className={classes.secondWord}>
												{plan?.minutes} Minutes
											</Typography>
										</Box>
									</Grid>
								)}
								{plan?.messages !== 0 && (
									<Grid item style={{ textAlign: 'left' }}>
										<Box
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'left'
											}}
											align="left"
										>
											<TextsmsIcon
												style={{ color: '#49c5b6', paddingRight: 10, fontSize: 30 }}
											/>
											&nbsp;
											<Typography className={classes.secondWord}>
												{plan?.messages} Text Messages
											</Typography>
										</Box>
									</Grid>
								)}
								{plan?.data !== 0 && (
									<Grid
										item
										style={
											{
												// textAlign: 'center'
											}
										}
									>
										<Box
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'left'
											}}
											align="left"
										>
											<DataUsageIcon
												style={{ color: '#49c5b6', paddingRight: 10, fontSize: 30 }}
											/>
											<Typography className={classes.secondWord}>
												{plan?.data / 1000}GB
											</Typography>
										</Box>
									</Grid>
								)}
							</Grid>
						</Card>
					</Grid>

					<Grid item xs={12} sm={7}>
						<Card className={classes.Card}>
							<Typography className={classes.Header}>PLAN INCLUDES</Typography>
							<Divider className={classes.Divider} />
							<br />
							{/* ****************************** Minutes ****************************** */}
							{plan?.minutes !== 0 && (
								<>
									<div align="center">
										<Avatar>
											<PhoneIcon />
										</Avatar>
									</div>
									<br />
									<Typography className={classes.DetailsTitle}>
										<b>{plan?.minutes} Minutes</b>
									</Typography>
									{!!plan?.additionalMinuteInformation.length &&
										plan?.additionalMinuteInformation?.map(mintueInfo => {
											return (
												<>
													<Typography className={classes.Details}>
														<b>{mintueInfo.title}</b>
													</Typography>
													{mintueInfo.text && (
														<Typography className={classes.Details}>
															{mintueInfo.text}
														</Typography>
													)}
													<br />
												</>
											);
										})}
									<Divider className={classes.Divider} />
									<br />
								</>
							)}
							{/* ****************************** Minutes ****************************** */}
							{/* ****************************** Text ****************************** */}
							{plan?.messages !== 0 && (
								<>
									<div align="center">
										<Avatar>
											<TextsmsIcon />
										</Avatar>
									</div>
									<br />
									<Typography className={classes.DetailsTitle}>
										<b>{plan?.messages} Text Messages</b>
									</Typography>
									{!!plan?.additionalMessageInformation.length &&
										plan?.additionalMessageInformation?.map(messageInfo => {
											return (
												<>
													<Typography className={classes.Details}>
														<b>{messageInfo.title}</b>
													</Typography>
													{messageInfo.text && (
														<Typography className={classes.Details}>
															{messageInfo.text}
														</Typography>
													)}
													<br />
												</>
											);
										})}
									<Divider className={classes.Divider} />
									<br />
								</>
							)}
							{/* ****************************** Text s ****************************** */}
							{/* ****************************** Data ****************************** */}
							{plan?.data !== 0 && (
								<>
									<div align="center">
										<Avatar>
											<DataUsageIcon />
										</Avatar>
									</div>
									<br />
									<Typography className={classes.DetailsTitle}>
										<b> {plan?.data / 1000}GB of Data</b>
									</Typography>
									{plan?.additionalDataInformation.length &&
										plan?.additionalDataInformation?.map(dataInfo => {
											return (
												<>
													<Typography className={classes.Details}>
														<b>{dataInfo.title}</b>
													</Typography>
													{dataInfo.text && (
														<Typography className={classes.Details}>
															{dataInfo.text}
														</Typography>
													)}
													<br />
												</>
											);
										})}
									<Divider className={classes.Divider} /> <br />
								</>
							)}
							{/* ****************************** Data ****************************** */}
							{/* ****************************** More Info Here ****************************** */}
							{!!plan?.additionalFeatures.length && (
								<>
									<Accordion className={classes.moreDetails}>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1a-content"
											id="panel1a-header"
										>
											<Typography className={classes.heading}>More Details</Typography>
										</AccordionSummary>
										<AccordionDetails className={classes.accordionDetails}>
											{plan.additionalFeatures.map(feature => {
												return (
													<>
														<ListItem>
															<ListItemAvatar className={classes.Avatar}>
																<Avatar>
																	<VoicemailIcon />
																</Avatar>
															</ListItemAvatar>
															<ListItemText
																primary={
																	<Typography className={classes.Details}>
																		<b>{feature.title}</b>
																	</Typography>
																}
															/>
														</ListItem>
														{feature.text && (
															<Typography className={classes.Details}>
																{feature.text}
															</Typography>
														)}
													</>
												);
											})}
										</AccordionDetails>
									</Accordion>
								</>
							)}
							{/* ****************************** More Info Here ****************************** */}
							<br />
							<Divider className={classes.Divider} />
							<div align="center">
								<Button
									style={{
										height: 50,
										width: '100%'
									}}
									component={Link}
									onClick={addtoCart}
									to="/Cart"
								>
									<AddShoppingCartIcon style={{ marginRight: 10 }} />
									Get this Plan
								</Button>
							</div>
							<br />
						</Card>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
