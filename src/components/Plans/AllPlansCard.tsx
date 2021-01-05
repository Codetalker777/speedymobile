import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
	Box,
	Typography,
	Card,
	Grid,
	Button,
	CardContent,
	CardActions,
	CardActionArea
} from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import PhoneIcon from '@material-ui/icons/Phone';
import TextsmsIcon from '@material-ui/icons/Textsms';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import CompareIcon from '@material-ui/icons/Compare';

import { useMediaQuery } from 'react-responsive';
import GridListTile from '@material-ui/core/GridListTile';
import { Plan } from '../../utils/dataTypes';
import { useDispatch } from 'react-redux';
import { addToCompareList } from '../../actions/comparePlansActions/comparePlansActions';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		paddingTop: '5%',
		paddingBottom: '10%',
		width: '90%',
		backgroundColor: '#fafafa'
	},
	Card: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		paddingLeft: '5%',
		paddingRight: '5%',
		height: '100%'
	},
	CompareButton: {
		background: 'transparent',
		backgroundColor: 'transparent',
		color: '#9e9e9e',
		borderRadius: 8,
		textTransform: 'none'
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
		fontWeight: 500,
		fontSize: 35,
		textAlign: 'center',
		color: '#49c5b6',
		marginBottom: '-20px'
	},
	PlanPrice: {
		fontFamily: 'roboto',
		fontWeight: 350,
		fontSize: 60,
		paddingTop: 15,
		color: '#313131'
	},
	icon: {
		color: '#49c5b6',
		paddingRight: 10,
		fontSize: 35
	},

	firstWord: {
		fontSize: 20,
		fontFamily: 'roboto',
		fontWeight: 450,
		color: '#424242'
	},
	secondWord: {
		fontSize: 20,
		fontWeight: 350,
		fontFamily: 'roboto',
		color: '#616161'
	},
	Details: {
		textAlign: 'left'
	},
	DetailsTitle: {
		textAlign: 'left',
		fontWeight: 550,
		fontSize: 22
	}
}));

const StyledGridListTile = withStyles(theme => ({
	root: {
		padding: 20,
		'& .MuiGridListTile-tile': {
			backgroundColor: 'trasnparent',
			borderRadius: 8,
			boxShadow: '0px 0px 1px 0px #888'
		}
	}
}))(GridListTile);

interface PlanCardProps {
	plan: Plan;
}

export default function PlansCard({ plan }: PlanCardProps): JSX.Element {
	const isMobile = useMediaQuery({ query: '(max-width:766px)' });
	const theme = useTheme();
	const classes = useStyles(theme);
	const dispatch = useDispatch();

	const dataSuffix = data => {
		if (data < 1000) {
			return `${data}MB`;
		}
		return `${data / 1000}GB`;
	};

	const addtoCompareList = () => {
		dispatch(addToCompareList(plan));
	};
	return (
		<StyledGridListTile style={{ width: isMobile ? 280 : 320, height: '100%' }}>
			<Card className={classes.Card}>
				{/* ********************* Compare Button ********************** */}

				<CardActions>
					<img
						style={{ width: '40%', objectFit: 'scale-down' }}
						src={plan.logo}
						alt={plan.providerName}
					/>
					<div style={{ paddingLeft: 10 }}>
						<Button className={classes.CompareButton} onClick={addtoCompareList}>
							<CompareIcon />
							{'Compare'}
						</Button>
					</div>
				</CardActions>
				<br />

				<CardActionArea
					component={Link}
					to={`/Plans/${plan.slug}`}
					style={{
						display: 'flex',
						flexDirection: 'column',
						padding: 0,
						margin: 0,
						minHeight: 0,
						minWidth: 0
					}}
				>
					<Box
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center'
						}}
						align="center"
					>
						<Typography style={{ marginTop: 20, fontSize: 45, color: '#9e9e9e' }}>
							$
							</Typography>{' '}
						<Typography className={classes.PlanPrice}>{plan.monthlyCost}</Typography>{' '}
						<Typography
							style={{
								fontSize: 15,
								fontWeight: 900,
								paddingTop: 30,
								color: '#9e9e9e'
							}}
						>
							&nbsp;&nbsp;PER MONTH
							</Typography>
					</Box>

					<br />

					<Grid
						container
						alignContent="center"
						alignItems="center"
						direction="column"
						justify="center"
					>
						{/* ********************* Talk ********************** */}

						<Grid item xs style={{ textAlign: 'center' }}>
							<Box
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center'
								}}
								align="center"
							>
								<PhoneIcon className={classes.icon} />
								<Typography className={classes.firstWord}>
									{plan.minutes}
								</Typography>{' '}
									&nbsp;
									<Typography className={classes.secondWord}>Talk</Typography>
							</Box>
						</Grid>

						{/* ********************* Text ********************** */}

						<Grid item style={{ textAlign: 'center' }}>
							<Box
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center'
								}}
								align="center"
							>
								<TextsmsIcon className={classes.icon} />
								<Typography className={classes.firstWord}>
									{plan.messages}
								</Typography>{' '}
									&nbsp;
									<Typography className={classes.secondWord}>Text</Typography>
							</Box>
						</Grid>

						{/* ********************* Data ********************** */}
						<Grid item style={{ textAlign: 'center' }}>
							<Box
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center'
								}}
								align="center"
							>
								<DataUsageIcon className={classes.icon} />
								<Typography className={classes.firstWord}>
									{dataSuffix(plan.data)}
								</Typography>{' '}
									&nbsp;
									<Typography className={classes.secondWord}>Data</Typography>
							</Box>
						</Grid>

						{/* ********************* Autopay Bonus ********************** */}

						<Grid item style={{ textAlign: 'center' }}>
							<Box
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center'
								}}
								align="center"
							>
								<Typography className={classes.secondWord} style={{ fontSize: 18 }}>
									{`+ ${dataSuffix(plan?.planBonus?.bonusData)} with auto-pay`}
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</CardActionArea>

			</Card>
		</StyledGridListTile>
	);
}
