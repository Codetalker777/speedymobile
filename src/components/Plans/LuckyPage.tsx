import React from 'react';
import { useTheme, createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { LuckyData } from './MockData';
import { useMediaQuery } from 'react-responsive';

import PlansCard from './PlansCard';

const useStyles = makeStyles(theme =>
	createStyles({
		title: {
			color: '#41b6e6',
			fontSize: 45,
			padding: 5,
			paddingLeft: 20,
			fontWeight: 450
		},
		header: {
			color: '#41b6e6',
			fontSize: 22,
			fontWeight: 550,
			padding: 5,
			paddingBottom: 30,
			paddingTop: 20,
			margin: 20,
			paddingLeft: 20,
			fontFamily: 'lobster'
		}
	})
);

export default function LuckyPage(): JSX.Element {
	const theme = useTheme();
	const classes = useStyles(theme);
	const isMobile = useMediaQuery({ query: '(max-width:766px)' });
	return (
		<div>
			<Typography
				component="h2"
				style={{ fontSize: isMobile && 35 }}
				className={classes.title}
				align="left"
			>
				{'Lucky Mobile Plans'}
			</Typography>

			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ width: '100%' }}
			>
				<Grid item lg={'auto'}>
					{LuckyData.map(function generateCard(plan) {
						return <PlansCard plan={plan} ButtonColor={'#41b6e6'} />;
					})}
				</Grid>
			</Grid>
		</div>
	);
}
