import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { Typography, Button } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet';
import { trackPageView } from '../utils/GoogleAnalytics';
import { getPhone, setPhone } from '../actions/phoneActions/phoneActions';
import { useSelector } from '../reducers';
import Color from '../components/PhonePage/Color';
import Storage from '../components/PhonePage/Storage';
import { CartType } from '../utils/dataTypes';

interface PhonePageRouteProps {
	phoneSlug: string;
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		paddingTop: '5%',
		paddingBottom: '10%',
		width: '90%'
	},
	container: {
		width: '100%',
		backgroundColor: '#fafafa'
	},
	grid: {
		backgroundColor: 'red',
		width: '300px'
	},
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary
		// marginLeft: 50,
		// marginRight: 50,
		// paddingBottom: 70
	},
	paper2: {
		padding: theme.spacing(2),
		textAlign: 'left',
		color: theme.palette.text.secondary,
		paddingLeft: '5%',
		paddingRight: '5%'
		// marginLeft: 50,
		// marginRight: 50,
	},
	phoneBrand: {
		fontFamily: 'roboto',
		fontWeight: 300,
		fontSize: 35,
		color: '#313131',
		marginBottom: '-20px'
	},
	phoneModel: {
		fontFamily: 'roboto',
		fontWeight: 600,
		fontSize: 65,
		color: '#313131'
	},
	summary: {
		fontFamily: 'roboto',
		fontWeight: 300,
		fontSize: 15,
		color: '#313131',
		textAlign: 'justify'
	},
	cost: {
		fontFamily: 'roboto',
		fontWeight: 600,
		fontSize: 30,
		color: '#313131',
		textAlign: 'center'
	},
	costDetails: {
		fontFamily: 'roboto',
		fontWeight: 300,
		fontSize: 15,
		color: '#313131',
		textAlign: 'center'
	},
	storageTitle: {
		fontWeight: 500,
		fontSize: 20,
		color: '#313131'
	},
	storage: {
		textAlign: 'center'
	},
	colorTitle: {
		fontWeight: 500,
		fontSize: 20,
		color: '#313131'
	},
	color: {
		textAlign: 'center'
	},
	line: {
		height: 1,
		borderWidth: 0,
		color: '#ededed',
		backgroundColor: '#ededed',
		marginTop: 25,
		marginBottom: 25
	},

	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	},
	moreDetails: {
		backgroundColor: '#fafafa'
	},
	accordionDetails: {
		flexDirection: 'column'
	}
}));

export default function PhonePage({
	match
}: RouteComponentProps<PhonePageRouteProps>): JSX.Element {
	const phone = useSelector(state => state.phones.data);
	const [cookies, setCookie] = useCookies(['cart']);
	function addtoCart(): void {
		const newCookie: CartType = cookies.cart || { phones: {}, plans: {} };
		newCookie.phones[phone?.slug || 'error'] = {
			phone: phone?.slug,
			color: phone?.color[0],
			storage: phone?.storage[0],
			quantity: 1
		};
		setCookie('cart', JSON.stringify(newCookie), { path: '/' });
	}
	const dispatch = useDispatch();
	useEffect(() => {
		if (!phone) {
			dispatch(getPhone(match.params.phoneSlug));
		}
		trackPageView(window.location);
		return (): void => {
			dispatch(setPhone(null));
		};
	}, []);
	const theme = useTheme();
	const classes = useStyles(theme);

	return (
		<div className={classes.container} align="center">
			{phone && (
				<Helmet>
					<title>
						{phone?.manufacturer} {phone?.name}
					</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={process.env.API_URL} />
					<meta name="description" content={phone?.summary} />
					<meta property="og:title" content={`${phone?.manufacturer} ${phone?.name}`} />
					<meta property="og:description" content={phone?.summary} />
					<meta name="twitter:image" content={phone?.images[0]} />
					<meta property="og:image" content={phone?.images[0]} />
					<meta property="fb:app_id" content="794534664367050" />
				</Helmet>
			)}
			<div className={classes.root}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={7}>
						<Paper className={classes.paper}>
							{phone && (
								<Carousel
									showStatus={false}
									showArrows
									showThumbs
									showIndicators={false}
									dynamicHeight
								>
									{phone?.images.map((image, index) => {
										return (
											<img
												style={{ maxHeight: '50vh', objectFit: 'scale-down' }}
												key={image}
												src={image}
												alt={`${phone.manufacturer} ${phone.name} ${index}`}
											/>
										);
									})}
								</Carousel>
							)}
						</Paper>
					</Grid>

					<Grid item xs={12} sm={5}>
						<Paper className={classes.paper2}>
							<Typography className={classes.phoneBrand}>
								{phone?.manufacturer}
							</Typography>
							<Typography className={classes.phoneModel}>{phone?.name}</Typography>
							<Typography className={classes.summary}>{phone?.summary}</Typography>

							<hr className={classes.line} />

							{/* ****************************** Storage ****************************** */}
							<Typography className={classes.storageTitle}>Storage:</Typography>
							<Typography className={classes.storage}>
								{phone?.storage.map(storage => {
									return <Storage key={storage} storage={storage} />;
								})}
							</Typography>
							<hr className={classes.line} />
							{/* ****************************** Storage ****************************** */}

							{/* ****************************** Color ****************************** */}
							<Typography className={classes.colorTitle}>Color:</Typography>
							<Typography className={classes.color}>
								{phone?.color.map(color => {
									return <Color key={color} color={color} />;
								})}
							</Typography>
							<hr className={classes.line} />
							{/* ****************************** Color ****************************** */}

							{/* ****************************** Price ****************************** */}
							<Typography className={classes.cost}>
								<sup>$</sup>
								{phone?.cost[Object.keys(phone?.cost)[0]]}.00
							</Typography>
							<Typography className={classes.costDetails}>No term contract.</Typography>
							<hr className={classes.line} />
							{/* ****************************** Price ****************************** */}

							{/* ****************************** More Info Here ****************************** */}
							<div>
								<Accordion className={classes.moreDetails}>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography className={classes.heading}>More Details</Typography>
									</AccordionSummary>
									<AccordionDetails className={classes.accordionDetails}>
										{phone?.phoneSpecs.map(function (item) {
											return (
												<Typography gutterBottom key={item}>
													{item}
												</Typography>
											);
										})}
									</AccordionDetails>
								</Accordion>
								<br />
							</div>
							{/* ****************************** More Info Here ****************************** */}

							{/* ****************************** Button ****************************** */}
							<div align="center">
								<Button
									component={Link}
									onClick={addtoCart}
									to="/Cart"
									style={{
										height: 50,
										width: '100%'
									}}
								>
									<AddShoppingCartIcon style={{ marginRight: 10 }} />
									Add to Cart
								</Button>
							</div>
							{/* ****************************** Button ****************************** */}
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
