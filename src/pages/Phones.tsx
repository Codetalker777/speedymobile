import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import { useTheme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import { useSelector } from '../reducers';
import { getPhones } from '../actions/individualPhoneActions/individualPhoneActions';
import DetailedPhoneCard from '../components/Phones/DetailedPhoneCard';
import Filter from '../components/Phones/filter';
import { trackPageView } from '../utils/GoogleAnalytics';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';
import PhonesCompareButton from '../components/Phones/PhonesCompareButton';

const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			overflow: 'hidden',
			justifySelf: 'center',
			justifyItems: 'center',
			justifyContent: 'center'
		},
		container: {
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
		title: {
			color: '#49c5b6',
			fontSize: 30,
			padding: 5,
			fontWeight: 500
		},
		text: {
			color: 'grey',
			fontSize: 'medium',
			fontWeight: 400,
			padding: 5
		}
	})
);

export default function Phones(): JSX.Element {
	const phones = useSelector(state => state.individualPhones.filteredPhones);

	const dispatch = useDispatch();

	const theme = useTheme();
	const classes = useStyles(theme);

	useEffect(() => {
		trackPageView(window.location);
		if (!phones) {
			dispatch(getPhones());
		}
	}, []);
	return (
		<div
			style={{ paddingTop: 50, paddingBottom: 50, overflow: 'hidden' }}
			className={classes.root}
		>
			<Helmet>
				<title>Compare all of Canada's best phone deals from each carrier</title>
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${process.env.API_URL}/Phones`} />
				<meta
					name="description"
					content="Discover awesome deals on new phones from every carrier. Compare what each carrier has to offer and skip the line by ordering online."
				/>
				<meta
					property="og:title"
					content="Compare all of Canada's best phone deals from each carrier"
				/>
				<meta
					property="og:description"
					content="Discover awesome deals on new phones from every carrier. Compare what each carrier has to offer and skip the line by ordering online."
				/>
				<meta name="twitter:image" content={TwitterLink} />
				<meta property="og:image" content={FaceBookLink} />
				<meta property="fb:app_id" content="794534664367050" />
			</Helmet>
			<div className={classes.container}>
				<Typography component="h1" className={classes.title} align="left">
					Compare and Shop phones across all Carriers
				</Typography>
				<Typography component="h2" className={classes.text} align="left">
					Shop for the latest and greatest phones. Sometimes the tech you have just isn't
					enough. Pick your favourite phone and plan and order online to skip-the-line.
				</Typography>
				<PhonesCompareButton />
				<br />
				<br />
				<Filter />
				<br />
				<br />
				<Grid spacing={2} justify="center" container>
					{phones && phones.length > 0 ? (
						phones.map(function generateCard(phone) {
							return <DetailedPhoneCard key={phone.name} phone={phone} />;
						})
					) : (
						<div />
					)}
				</Grid>
			</div>
		</div>
	);
}
