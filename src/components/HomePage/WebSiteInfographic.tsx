import React from 'react';

import { Typography, Card, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Phone from '../../data/images/phone.png';
import Plan from '../../data/images/plan.png';
import Buy from '../../data/images/buy.png';
import Price from '../../data/images/price.png';

/* The banner on the main page that describes what the website is about */

const useStyles = makeStyles(theme => ({
	outerContainer: {
		width: 'auto',
		//boxShadow: `.5px .25px 3px`,
		boxShadow: '0px 0px 5px 0px #888',
		marginBottom: 5,
		padding: '50px 10vw 50px 10vw',
		zIndex: 2,
		overflow: 'hidden',
		[theme.breakpoints.between('sm', 'md')]: {
			padding: '20px 5vw 20px 5vw'
		},
		[theme.breakpoints.down('sm')]: {
			padding: '20px 10px 20px 10px'
		}
	},
	gridItem: {
		color: '#49c5b6',
		fontFamily: 'Roboto',
		textAlign: 'center'
	},
	title: {
		fontWeight:400,
		fontSize: 20,
		paddingBottom: 5
	},
	text: {
		fontFamily: 'Roboto',
		fontWeight: 200,
		fontSize: 20,
		paddingBottom: 5
	}

}));

export default function WebSiteInfographic(): JSX.Element {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<Card className={classes.outerContainer}>
			<Grid container spacing={5}>
				<Grid item xs={12} sm={3} className={classes.gridItem}>
					<div>
						<img src={Phone} alt="logo" width="50" />
						<Typography component="h2" className={classes.title}>
							Compare plans and deals
						</Typography>
						<Typography component="h3" className={classes.text}>
							Cellphone plans from Rogers Wireless to Fido to Freedom, we show you the best deals for
							your preferences.
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12} sm={3} className={classes.gridItem}>
					<div>
						<img src={Plan} alt="logo" width="50" />
						<Typography component="h2" className={classes.title}>
							Detailed mobile plans
						</Typography>
						<Typography component="h3" className={classes.text}>
							Never miss another detail in your plan. No hidden fees, overages, if's or
							butts. We make sure you get the right plan.
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12} sm={3} className={classes.gridItem}>
					<div>
						<img src={Buy} alt="logo" width="50" />
						<Typography component="h2" className={classes.title}>
							Conveniently Shop Online
						</Typography>
						<Typography component="h3" className={classes.text}>
							Skip the line by ordering online. Choose to have it delivered same-day, or
							pick it up in store.
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12} sm={3} className={classes.gridItem}>
					<div>
						<img src={Price} alt="logo" width="50" />
						<Typography component="h2" className={classes.title}>
							Save
						</Typography>
						<Typography component="h3" className={classes.text}>
							We calculate the savings for you and compare all other options to ensure
							you get the best deal.
						</Typography>
					</div>
				</Grid>
			</Grid>
		</Card>
	);
}
