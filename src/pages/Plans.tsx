import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet';
import { useTheme, createStyles, makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from 'react-responsive';

import { GridList } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import PlansCard from '../components/Plans/AllPlansCard';

import { useSelector } from '../reducers';
import { getPlans } from '../actions/individualPlanActions/individualPlanActions';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';
import FilterCard from '../components/Plans/FilterCard';
import PlansCompareButton from '../components/Plans/PlansCompareButton';

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
		title: {
			color: '#49c5b6',
			fontSize: 35,
			padding: 5,
			paddingBottom: 0,
			paddingLeft: 20,
			fontWeight: 400
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
		text: {
			color: 'grey',
			fontSize: 'medium',
			fontWeight: 380,
			padding: 5
		},
		gridList: {
			flexWrap: 'nowrap',
			transform: 'translateZ(0)',
			'&::-webkit-scrollbar': {
				display: 'none'
			}
		}
	})
);

export default function Plans(): JSX.Element {
	const plans = useSelector(state => state.individualPlans.filteredPlans);
	const compareList = useSelector(state => state.compare.comparePlansList);
	const dispatch = useDispatch();

	const theme = useTheme();
	const classes = useStyles(theme);
	const plansUnder20 = plans?.filter(plans => plans.monthlyCost < 20);
	const plansUnder35 = plans?.filter(
		plans => plans.monthlyCost >= 20 && plans.monthlyCost < 35
	);
	const plansUnder45 = plans?.filter(
		plans => plans.monthlyCost >= 35 && plans.monthlyCost < 45
	);
	const plansUnder60 = plans?.filter(
		plans => plans.monthlyCost >= 45 && plans.monthlyCost < 60
	);
	const plansOver60 = plans?.filter(plans => plans.monthlyCost >= 60);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!plans) {
			dispatch(getPlans());
		}
	}, []);

	return (
		<div style={{ overflow: 'hidden' }}>
			<Helmet>
				<title>Compare and Shop Canada's best phone plans online</title>
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${process.env.API_URL}/Plans`} />
				<meta
					name="description"
					content="Cheap plans to fully loaded plans we have them all. Easily find and compare cell phone plans across all Canadian Telecoms. Skip the line and shop online."
				/>
				<meta
					property="og:title"
					content="Compare and Shop Canada's best phone plans online"
				/>
				<meta
					property="og:description"
					content="Cheap plans to fully loaded plans we have them all. Easily find and compare cell phone plans across all Canadian Telecoms. Skip the line and shop online."
				/>
				<meta name="twitter:image" content={TwitterLink} />
				<meta property="og:image" content={FaceBookLink} />
				<meta property="fb:app_id" content="794534664367050" />
			</Helmet>
			<br />
			<div className={classes.root}>
				<div className={classes.container}>
					<Typography
						component="h2"
						className={classes.title}
						align="left"
						style={{ fontSize: 40, paddingBottom: 10 }}
					>
						All Prepaid Plans
					</Typography>
					<Typography className={classes.text} align="left">
						Choose a plan from a wide variety of carriers that is customized for your
						needs. Simply add it to cart, and have it setup and ready to go in no time!
						You may bring your own phone or select a new one to go along with your
						amazing new plan.
					</Typography>
					<br />
					<br />
					<FilterCard />
					<br />
					<br />
				</div>
			</div>

			<br />
			{compareList.length > 0 && <PlansCompareButton />}

			<br />
			<div>
				{/* ****************** Plans Under $20 ********************** */}

				{plansUnder20?.length !== 0 && (
					<div>
						<Typography component="h2" className={classes.title} align="left">
							Plans under $20
						</Typography>
						<div className={classes.root}>
							<GridList
								className={classes.gridList}
								cols={2.5}
								spacing={16}
								cellHeight="auto"
								component="div"
							>
								{plansUnder20?.map(function generateCard(plans) {
									return <PlansCard plan={plans} />;
								})}
							</GridList>
						</div>

						<br />
						<br />
					</div>
				)}

				{/* ****************** Plans Under $35 ********************** */}

				{plansUnder35?.length !== 0 && (
					<div>
						<Typography component="h2" className={classes.title} align="left">
							Plans under $35
						</Typography>
						<div className={classes.root}>
							<GridList
								className={classes.gridList}
								cols={2.5}
								spacing={16}
								cellHeight="auto"
								component="div"
							>
								{plansUnder35?.map(function generateCard(plans) {
									return <PlansCard plan={plans} />;
								})}
							</GridList>
						</div>

						<br />
						<br />
					</div>
				)}

				{/* ****************** Plans Under $45 ********************** */}

				{plansUnder45?.length !== 0 && (
					<div>
						<Typography component="h2" className={classes.title} align="left">
							Plans under $45
						</Typography>
						<div className={classes.root}>
							<GridList
								className={classes.gridList}
								cols={2.5}
								spacing={16}
								cellHeight="auto"
								component="div"
							>
								{plansUnder45?.map(function generateCard(plans) {
									return <PlansCard plan={plans} />;
								})}
							</GridList>
						</div>

						<br />
						<br />
					</div>
				)}

				{/* ****************** Plans Under $60 ********************** */}

				{plansUnder60?.length !== 0 && (
					<div>
						<Typography component="h2" className={classes.title} align="left">
							Plans under $60
						</Typography>
						<div className={classes.root}>
							<GridList
								className={classes.gridList}
								cols={2.5}
								spacing={16}
								cellHeight="auto"
								component="div"
							>
								{plansUnder60?.map(function generateCard(plans) {
									return <PlansCard plan={plans} />;
								})}
							</GridList>
						</div>

						<br />
						<br />
					</div>
				)}

				{/* ****************** Plans over $60 ********************** */}

				{plansOver60?.length !== 0 && (
					<div>
						<Typography component="h2" className={classes.title} align="left">
							Ultimate Plans
						</Typography>
						<div className={classes.root}>
							<GridList
								className={classes.gridList}
								cols={2.5}
								spacing={16}
								cellHeight="auto"
								component="div"
							>
								{plansOver60?.map(function generateCard(plans) {
									return <PlansCard plan={plans} />;
								})}
							</GridList>
						</div>

						<br />
						<br />
					</div>
				)}
			</div>

			<div style={{ paddingBottom: 40 }} />
		</div>
	);
}
