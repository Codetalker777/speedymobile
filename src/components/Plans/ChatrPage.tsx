import React from 'react';
import { useTheme, createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ChatrTalkTextData, ChatrTalkText, ChatrData } from './MockData';
import { useMediaQuery } from 'react-responsive';

import PlansCard from './PlansCard';

const useStyles = makeStyles(theme =>
	createStyles({
		title: {
			color: '#6e48a4',
			fontSize: 45,
			padding: 5,
			paddingBottom: 20,
			paddingLeft: 20,
			fontWeight: 500
		},
		header: {
			color: '#6e48a4',
			fontSize: 22,
			fontWeight: 550,
			padding: 5,
			paddingBottom: 30,
			paddingTop: 20,
			margin: 20,
			fontFamily: 'lobster',
			paddingLeft: 20
		}
	})
);

export default function ChatrPage(): JSX.Element {
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
				{'Talk, Text and Data'}
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
					{ChatrTalkTextData.map(function generateCard(plan) {
						return <PlansCard plan={plan} ButtonColor={'#4d2a88'} />;
					})}
				</Grid>
			</Grid>
			<br />
			<Typography
				component="h2"
				style={{ fontSize: isMobile && 35 }}
				className={classes.title}
				align="left"
			>
				{'Talk and Text'}
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
					{ChatrTalkText.map(function generateCard(plan) {
						return <PlansCard plan={plan} ButtonColor={'#4d2a88'} />;
					})}
				</Grid>
			</Grid>
			<br />
			<Typography
				component="h2"
				style={{ fontSize: isMobile && 35 }}
				className={classes.title}
				align="left"
			>
				{'Data Only'}
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
					{ChatrData.map(function generateCard(plan) {
						return <PlansCard plan={plan} ButtonColor={'#4d2a88'} />;
					})}
				</Grid>
			</Grid>
		</div>
	);
}
