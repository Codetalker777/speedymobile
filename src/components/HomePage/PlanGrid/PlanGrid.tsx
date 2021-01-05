import React, { useEffect } from 'react';
import { useTheme, createStyles, makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import {
	Typography,
	IconButton,
	GridList,
	GridListTile,
	GridListTileBar,
	useMediaQuery
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import image0 from '../../../data/images/plan1.png';
import image1 from '../../../data/images/plan2.png';
import image2 from '../../../data/images/plan3.png';
import image3 from '../../../data/images/plan4.png';
import image4 from '../../../data/images/plan5.png';
import image5 from '../../../data/images/plan6.png';
import image6 from '../../../data/images/plan7.png';
import image7 from '../../../data/images/plan8.png';
import image8 from '../../../data/images/plan9.png';
import image9 from '../../../data/images/plan0.png';
import { useSelector } from '../../../reducers';
import { getPlans } from '../../../actions/individualPlanActions/individualPlanActions';
import TestID from '../../../Test/TestId';

const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			overflow: 'hidden',
			backgroundColor: theme.palette.background.paper,
			paddingTop: 80,
			paddingBottom: 80,
			height: 'auto',
			justifySelf: 'center',
			justifyItems: 'center',
			justifyContent: 'center',
			
		},
		gridList: {
			maxWidth: '1000px',
			height: 'auto',
			justifySelf: 'center',
			justifyItems: 'center',
			justifyContent: 'center'
		},
		icon: {
			color: 'rgba(255, 255, 255, 0.54)'
		},
		tilestyle: {
			margin: 0
		},
		title: {
			color: '#313131',
			fontSize: 30,
			padding: 5
		},
		text: {
			color: 'grey',
			fontSize: 'medium',
			fontWeight: 100,
			padding: 5
		}
	})
);

const images = [
	image0,
	image1,
	image2,
	image3,
	image4,
	image5,
	image6,
	image7,
	image8,
	image9
];

/**
 * Renders the text to be displayed of how much Data a plan has
 * @param value
 */
function displayDataSize(value: number | string): string {
	if (typeof value === 'string') return 'Unlimited Data';
	if (value < 1000) return `${value}MB`;
	return `${value / 1000}GB`;
}

export default function Plans(): JSX.Element {
	const theme = useTheme();
	const classes = useStyles();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));
	const plans = useSelector(state => state.individualPlans.plans);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!plans) {
			dispatch(getPlans());
		}
	}, []);
	return (
		<div className={classes.root}>
			<div>
				<Typography component="h2" className={classes.title}>
					Top Plans
				</Typography>
				<Typography className={classes.text}>
					Contract free prepaid plans include talk, text, data, or a combination that
					suits your needs. <br />
					Choose a plan, add to cart, and have the sim card delivered to your door.
				</Typography>
				<br />
				<br />
			</div>
			<GridList
				component="div"
				cellHeight={180}
				className={classes.gridList}
				cols={matches ? 5 : 2}
			>
				{plans ? (
					plans.map((plan, index) => (
						<GridListTile
							key={plan.id}
							component={Link}
							to={`/Plans/${plan.slug}`}
							className={classes.tilestyle}
							cols={1}
							rows={1}
							id={TestID.planCard}
						>
							<img
								src={images[index % 10]}
								alt={`${plan.providerName} $${plan.monthlyCost}`}
							/>
							<GridListTileBar
								title={`${plan.providerName} $${plan.monthlyCost}`}
								subtitle={<span> {`${displayDataSize(plan.data)} | ${plan.name}`}</span>}
								actionIcon={
									<IconButton
										aria-label={`info about ${plan.providerName} $${plan.monthlyCost}`}
										className={classes.icon}
									>
										<InfoIcon />
									</IconButton>
								}
							/>
						</GridListTile>
					))
				) : (
					<div />
				)}
			</GridList>
		</div>
	);
}
