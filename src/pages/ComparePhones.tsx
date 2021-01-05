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
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import StorageIcon from '@material-ui/icons/Storage';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BatteryCharging60Icon from '@material-ui/icons/BatteryCharging60';
import AndroidIcon from '@material-ui/icons/Android';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';
import FeedbackPrompt from '../components/Feedback/feedbackPrompt';
import { removeFromPhonesCompareList } from '../actions/comparePhonesActions/comparePhonesActions';
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
	phoneBrand: {
		fontFamily: 'roboto',
		fontWeight: 400,
		fontSize: 40,
		color: '#313131'
	},
	phoneModel: {
		fontFamily: 'roboto',
		fontWeight: 600,
		fontSize: 35,
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

export default function ComparePhones(): JSX.Element {
	const data = useSelector(state => state.comparePhones.comparePhonesList);
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

	const addtoCart = event => {
		console.log(event);

		const newCookie: CartType = cookies.cart || {
			phones: {},
			plans: {}
		};
		newCookie.plans[plan?.slug || 'error'] = {
			plan: plan?.slug,
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
							style={{ fontSize: 40, paddingBottom: 10 }}
						>
							Compare Phones
						</Typography>
						<Typography className={classes.titleDetails} align="left">
							Choose a plan from a wide variety of carriers that is customized for your
							needs. Simply add it to cart, and have it setup and ready to go in no time!
							You may bring your own phone or select a new one to go along with your
							amazing new plan.
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
															<HighlightOffIcon
																onClick={() =>
																	dispatch(removeFromPhonesCompareList(index))
																}
																style={{
																	marginRight: 20,
																	marginTop: -40,
																	cursor: 'pointer',
																	color: 'red'
																}}
															/>
															<br />
															<img
																style={{
																	height: 300,
																	objectFit: 'scale-down',
																	width: 'auto'
																}}
																src={entry?.images[0]}
																alt={entry?.providerName}
															/>
															<br />
															<br />
															<Typography className={classes.phoneBrand} component="h1">
																{entry.manufacturer}
															</Typography>

															<Typography className={classes.phoneModel} component="h1">
																{entry.name}
															</Typography>
														</Box>
													</CardContent>
												</TableCell>
											);
										})}
									</TableRow>

									<br />

									{/*   ************************************        Screen Size       ************************************   */}
									<TableRow>
										<TableCell colSpan={data.length + 1}>
											<Box className={classes.Header} align="left">
												<Avatar>
													<AspectRatioIcon className={classes.HeaderText} />
												</Avatar>
												&nbsp;
												<Typography className={classes.HeaderText}>
													Screen Size
												</Typography>{' '}
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
														<Typography
															className={isMobile ? classes.textMobile : classes.text}
														>
															{entry.phoneSpecs[0]}
														</Typography>{' '}
													</Box>
												</TableCell>
											);
										})}
									</TableRow>

									<br />

									{/*   ****************************************   Memory       ****************************************            */}

									<TableRow>
										<TableCell colSpan={data.length + 1}>
											<Box className={classes.Header} align="center">
												<Avatar>
													<StorageIcon className={classes.HeaderText} />
												</Avatar>
												&nbsp;
												<Typography className={classes.HeaderText}>
													Storage
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
														{entry?.storage}
													</Typography>
												</TableCell>
											);
										})}
									</TableRow>

									<br />

									{/*   ****************************************   Camera       ****************************************            */}

									<TableRow>
										<TableCell colSpan={data.length + 1}>
											<Box className={classes.Header} align="center">
												<Avatar>
													<CameraAltIcon className={classes.HeaderText} />
												</Avatar>
												&nbsp;
												<Typography className={classes.HeaderText}>
													Camera
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
														{entry?.phoneSpecs[1]}
													</Typography>
													<br />
												</TableCell>
											);
										})}
									</TableRow>

									<br />

									{/*   ****************************************   Battery       ****************************************            */}

									<TableRow>
										<TableCell colSpan={data.length + 1}>
											<Box className={classes.Header} align="center">
												<Avatar>
													<BatteryCharging60Icon className={classes.HeaderText} />
												</Avatar>
												&nbsp;
												<Typography className={classes.HeaderText}>
													Battery
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
														{entry?.phoneSpecs[2]}
													</Typography>
													<br />
													<br />
													<Typography
														className={isMobile ? classes.textMobile : classes.text}
														component="span"
													>
														{entry?.phoneSpecs[3]}
													</Typography>
													<br />
													<br />
													<Typography
														className={isMobile ? classes.textMobile : classes.text}
														component="span"
													>
														{entry?.phoneSpecs[4]}
													</Typography>
												</TableCell>
											);
										})}
									</TableRow>

									<br />
									{/*   ****************************************   OS       ****************************************            */}

									<TableRow>
										<TableCell colSpan={data.length + 1}>
											<Box className={classes.Header} align="center">
												<Avatar>
													<AndroidIcon className={classes.HeaderText} />
												</Avatar>
												&nbsp;
												<Typography className={classes.HeaderText}>
													Operating Sysytem
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
														{entry?.operatingSystem}
													</Typography>
												</TableCell>
											);
										})}
									</TableRow>

									<br />

									{/*   ************************************       Add to cart Button    ************************************   */}
									<TableRow>
										{data.map(function result() {
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
														onClick={addtoCart}
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
