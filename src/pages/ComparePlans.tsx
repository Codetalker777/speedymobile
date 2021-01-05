import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useCookies } from 'react-cookie';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import { useMediaQuery } from 'react-responsive';
import Avatar from '@material-ui/core/Avatar';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom';

import PhoneIcon from '@material-ui/icons/Phone';
import TextsmsIcon from '@material-ui/icons/Textsms';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';
import FeedbackPrompt from '../components/Feedback/feedbackPrompt';
import { removeFromCompareList } from '../actions/comparePlansActions/comparePlansActions';
import { trackPageView } from '../utils/GoogleAnalytics';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		overflow: 'hidden',
		justifySelf: 'center',
		justifyItems: 'center',
		justifyContent: 'center'
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		overflow: 'hidden',
		justifySelf: 'center',
		justifyItems: 'center',
		justifyContent: 'center',
		width: '100%',
		marginLeft: 10,
		marginRight: 10,
		[theme.breakpoints.between('sm', 'md')]: {
			width: '75%',
			marginLeft: 0,
			marginRight: 0
		},
		[theme.breakpoints.up('md')]: {
			width: '50%',
			marginLeft: 0,
			marginRight: 0
		}
	},
	Header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'left',
		borderTop: 'none',
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 40,
		margin: 0,
		borderBottom: '2px solid #6dd0c4'
	},
	HeaderText: {
		borderTop: 'none',
		paddingTop: 0,
		paddingBottom: 0,
		textAlign: 'left',
		fontWeight: 450,
		fontFamily: 'Roboto',
		color: '#545454',
		fontSize: 30,
		margin: 0
	},
	text: {
		fontFamily: 'roboto',
		fontWeight: 350,
		fontSize: 40,
		paddingTop: 15,
		color: '#313131'
	},
	textMobile: {
		fontFamily: 'roboto',
		fontWeight: 450,
		fontSize: 20,
		paddingTop: 10,
		color: '#313131'
	},
	title: {
		color: '#49c5b6',
		fontSize: 35,
		padding: 5,
		paddingBottom: 0,
		paddingLeft: 20,
		fontWeight: 400
	},
	icon: {
		color: '#49c5b6',
		paddingRight: 10,
		fontSize: 35
	},
	titleDetails: {
		color: 'grey',
		fontSize: 'medium',
		fontWeight: 380,
		padding: 5
	},
	Details: {
		textAlign: 'left',
		fontWeight: 400,
		fontSize: 20
	},
	DetailsTitle: {
		textAlign: 'left',
		fontWeight: 550,
		fontSize: 22
	},
	Card: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		paddingLeft: '5%',
		paddingRight: '5%',
		height: '100%'
	},
	PlanName: {
		fontWeight: 420,
		fontSize: 24,
		color: 'grey'
	},
	RemoveButton: {
		fontFamily: 'roboto',
		fontWeight: 300,
		fontSize: 13,
		color: '#313131'
	}
}));

const styles = () =>
	createStyles({
		scrollBar: {
			'&::-webkit-scrollbar': {
				width: '4px'
			},
			'&::-webkit-scrollbar-thumb': {
				background: '#49c5b6',
				borderRadius: '10px'
			},
			'&::-webkit-scrollbar-thumb:hover': {
				background: '#000000'
			}
		}
	});

export default function ComparePlans(): JSX.Element {
	const data = useSelector(state => state.compare.comparePlansList);
	const theme = useTheme();
	const classes = useStyles(theme);
	const dispatch = useDispatch();
	const [cookies, setCookie] = useCookies(['cart']);
	const isMobile = useMediaQuery({ query: '(max-width: 766px)' });

	const dataLabel = data => {
		if (data < 1000) {
			return `${data} MB`;
		}
		return `${data / 1000} GB`;
	};

	const addtoCart = entry => {
		console.log(entry);

		const newCookie: CartType = cookies.cart || {
			phones: {},
			plans: {}
		};
		newCookie.plans[entry?.slug || 'error'] = {
			plan: entry?.slug,
			quantity: 1
		};
		setCookie('cart', JSON.stringify(newCookie), { path: '/' });
	};

	useEffect(() => {
		trackPageView(window.location);
	}, []);

	if (data.length > 0) {
		return (
			<>
				<Helmet>
					<title>MyCompare | SpeedyMobile</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`${process.env.API_URL}Compare`} />
					<meta
						name="description"
						content="Compare the latest phones and plan quickly and easily"
					/>
					<meta property="og:title" content="MyCompare" />
					<meta
						property="og:description"
						content="Compare the latest phones and plan quickly and easily"
					/>
					<meta name="twitter:image" content={TwitterLink} />
					<meta property="og:image" content={FaceBookLink} />
					<meta property="fb:app_id" content="794534664367050" />
				</Helmet>
				<br />
				<FeedbackPrompt hidden={false} />
				<div className={classes.root}>
					<div className={classes.container}>
						<Typography
							component="h2"
							className={classes.title}
							align="left"
							style={{ fontSize: 50, paddingBottom: 10 }}
						>
							Which Plan is the right for you?
						</Typography>
						<Typography className={classes.titleDetails} align="left">
							Compare plans from a wide variety of carriers and pick the one that is
							customized for your needs. Simply add it to cart, and have it setup and
							ready to go in no time!
						</Typography>
					</div>
				</div>
				<div align="center">
					<div
						className={styles.scrollBar}
						style={{
							marginTop: 50,
							marginBottom: 60,
							width: isMobile ? '95%' : '90%',
							display: 'flex',
							overflowX: 'scroll'
						}}
					>
						<div align="center">
							<Table
								style={{
									alignItems: 'center',
									justifyContent: 'center',
									tableLayout: 'fixed',
									overflow: 'hidden'
								}}
							>
								<TableBody style={{ overflowX: 'hidden', overflowY: 'auto' }}>
									<TableRow>
										{data.map(function result(entry, index) {
											return (
												<TableCell
													align="center"
													style={{
														borderTop: 'none',
														width: `${100 / data.length}%`
													}}
												>
													<CardContent>
														<Box>
															<img
																style={{ width: '60%', objectFit: 'scale-down' }}
																src={entry?.logo}
																alt={entry?.providerName}
															/>
															<br />
															<br />
															<Typography
																className={classes.PlanName}
																style={{ fontSize: isMobile && 18 }}
															>
																{entry?.planName}
															</Typography>

															<Box
																style={{
																	display: 'flex',
																	flexDirection: 'row',
																	justifyContent: 'space-between'
																}}
															>
																<Box
																	onClick={() => dispatch(removeFromCompareList(index))}
																>
																	<HighlightOffIcon
																		style={{
																			color: 'red',
																			marginRight: 5,
																			fontSize: 15,
																			marginTop: 2
																		}}
																	/>
																	<Typography className={classes.RemoveButton}>
																		Remove
																	</Typography>
																</Box>

																<Box
																	onClick={() => dispatch(removeFromCompareList(index))}
																>
																	<AddShoppingCartIcon
																		style={{
																			color: 'green',
																			marginRight: 5,
																			fontSize: 15,
																			marginTop: 2
																		}}
																	/>
																	<Typography className={classes.RemoveButton}>
																		Add to Cart
																	</Typography>
																</Box>
															</Box>
														</Box>
													</CardContent>
												</TableCell>
											);
										})}
									</TableRow>

									<br />

									{/*   ************************************        Price       ************************************   */}
									<TableRow>
										<TableCell colSpan={data.length + 1}>
											<Box className={classes.Header} align="left">
												<Avatar>
													<AttachMoneyIcon className={classes.HeaderText} />
												</Avatar>
												&nbsp;
												<Typography className={classes.HeaderText}>Cost</Typography>{' '}
											</Box>
										</TableCell>
									</TableRow>

									<TableRow>
										{data.map(function result(entry) {
											return (
												<TableCell align="center" style={{ fontSize: isMobile && 14 }}>
													<Box
														style={{
															display: 'flex',
															flexDirection: 'row',
															justifyContent: 'center'
														}}
														align="center"
													>
														<Typography style={{ fontSize: isMobile ? 20 : 45 }}>
															$
														</Typography>{' '}
														<Typography
															className={isMobile ? classes.textMobile : classes.text}
														>
															{entry.monthlyCost}
														</Typography>{' '}
														{isMobile && <br />}
														<Typography
															className={isMobile ? classes.textMobile : classes.text}
															style={{
																fontSize: 15,
																fontWeight: 900,
																paddingTop: 30
															}}
														>
															&nbsp;&nbsp;PER MONTH
														</Typography>
													</Box>
												</TableCell>
											);
										})}
									</TableRow>

									<br />

									{/*   ****************************************   Minutes       ****************************************            */}

									<TableRow>
										<TableCell colSpan={data.length + 1}>
											<Box className={classes.Header} align="center">
												<Avatar>
													<PhoneIcon className={classes.HeaderText} />
												</Avatar>
												&nbsp;
												<Typography className={classes.HeaderText}>
													Minutes
												</Typography>{' '}
											</Box>
										</TableCell>
									</TableRow>

									<TableRow>
										{data.map(function result(entry) {
											return (
												<TableCell align="center">
													<Typography
														className={isMobile ? classes.textMobile : classes.text}
														component="span"
													>
														{entry?.minutes} Minutes
													</Typography>

													<br />
													<br />
													{entry.additionalMinuteInfo &&
														entry.additionalMinuteInfo.map(function next(datafield) {
															return (
																<Typography
																	component="span"
																	style={{ fontSize: isMobile && 14 }}
																>
																	{datafield}
																</Typography>
															);
														})}
												</TableCell>
											);
										})}
									</TableRow>

									<br />

									{/*   ************************************        Messages       ************************************   */}
									<TableRow>
										<TableCell colSpan={data.length + 1}>
											<Box className={classes.Header} align="left">
												<Avatar>
													<TextsmsIcon className={classes.HeaderText} />
												</Avatar>
												&nbsp;
												<Typography className={classes.HeaderText}>
													Messages
												</Typography>{' '}
											</Box>
										</TableCell>
									</TableRow>

									<TableRow>
										{data.map(function result(entry) {
											return (
												<TableCell align="center">
													<Typography
														className={isMobile ? classes.textMobile : classes.text}
													>
														{entry.messages}
													</Typography>

													<br />
													<br />
													{entry.additionalMessageInfo &&
														entry.additionalMessageInfo.map(function next(datafield) {
															return (
																<Typography
																	component="span"
																	style={{ fontSize: isMobile && 14 }}
																>
																	{datafield}
																</Typography>
															);
														})}
												</TableCell>
											);
										})}
									</TableRow>

									<br />

									{/*   ************************************        Data       ************************************   */}
									<TableRow>
										<TableCell colSpan={data.length + 1}>
											<Box className={classes.Header} align="center">
												<Avatar>
													<DataUsageIcon className={classes.HeaderText} />
												</Avatar>
												&nbsp;
												<Typography className={classes.HeaderText}>Data</Typography>{' '}
											</Box>
										</TableCell>
									</TableRow>

									<TableRow>
										{data.map(function result(entry) {
											return (
												<TableCell align="center" style={{ fontSize: isMobile && 14 }}>
													<Typography
														className={isMobile ? classes.textMobile : classes.text}
													>
														{dataLabel(entry.data)}
													</Typography>

													<br />
													<br />
													<Typography className={classes.Details} component="span">
														Bonus Data: <b>{dataLabel(entry?.planBonus?.bonusData)}</b>*
													</Typography>
													<br />
													<br />
													<Typography style={{ fontSize: 12 }} component="span">
														{`* ${entry?.planBonus?.disclaimer}`}
													</Typography>
												</TableCell>
											);
										})}
									</TableRow>

									<br />
									{/*   ****************************************   Additional Fees       ****************************************            */}

									<TableRow>
										<TableCell colSpan={data.length + 1}>
											<Box className={classes.Header} align="center">
												<Avatar>
													<LocalAtmIcon className={classes.HeaderText} />
												</Avatar>
												&nbsp;
												<Typography className={classes.HeaderText}>
													Additional Fees and Credits
												</Typography>{' '}
											</Box>
										</TableCell>
									</TableRow>

									<TableRow>
										{data.map(function result(entry) {
											return (
												<TableCell align="center">
													<Typography className={classes.Details} component="span">
														<b>Sim Card: </b> ${entry?.simCardFee}
													</Typography>

													<br />
													<br />
													<br />
													<Typography className={classes.Details} component="span">
														<b> Activation Fees: </b> ${entry?.activationFee}
													</Typography>

													<br />
													<br />
													<br />
													<Typography className={classes.Details} component="span">
														<b>Store Credit: </b>${entry?.storeCredit}
													</Typography>

													<br />
													<br />
												</TableCell>
											);
										})}
									</TableRow>

									<br />

									{/*   ************************************       Add to cart Button    ************************************   */}
									<TableRow>
										{data.map(function result(entry) {
											return (
												<TableCell
													style={{
														fontFamily: 'Roboto',
														color: '#545454',
														paddingTop: 20,
														paddingBottom: 8,
														borderTop: 'none'
													}}
													align="center"
												>
													<Button
														style={{
															height: 50,
															width: '100%'
														}}
														component={Link}
														onClick={() => addtoCart(entry)}
														to="/Cart"
													>
														<AddShoppingCartIcon style={{ marginRight: 10 }} />
														Add to Cart
													</Button>
												</TableCell>
											);
										})}
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<div>
			<Helmet>
				<title>MyCompare | SpeedyMobile</title>
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${process.env.API_URL}Compare`} />
				<meta
					name="description"
					content="Compare the latest phones and plan quickly and easily"
				/>
				<meta property="og:title" content="MyCompare" />
				<meta
					property="og:description"
					content="Compare the latest phones and plan quickly and easily"
				/>
				<meta name="twitter:image" content={TwitterLink} />
				<meta property="og:image" content={FaceBookLink} />
				<meta property="fb:app_id" content="794534664367050" />
			</Helmet>
			<br />
			<Typography
				align="center"
				style={{
					marginTop: 60,
					color: '#313131',
					fontSize: '50px',
					fontFamily: 'Roboto',
					fontWeight: '800'
				}}
			>
				<span
					style={{
						width: '160px',
						borderBottom: '8px solid #49c5b6'
					}}
				>
					MyCompare
				</span>
			</Typography>
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
						marginTop: '2em',
						marginBottom: '5%',
						paddingTop: '5em',
						paddingLeft: '20px',
						paddingRight: '20px'
					}}
				>
					<Typography
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							marginTop: 100,
							marginBottom: 30
						}}
					>
						Please add Phones or Plans to compare
					</Typography>
				</div>
			</div>
		</div>
	);
}
