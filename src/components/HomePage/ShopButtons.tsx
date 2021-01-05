import React from 'react';
import {
	Typography,
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import bgi from '../../data/images/bgi.jpg';
import bgi2 from '../../data/images/bgi2.jpg';
import shopPhone from '../../data/images/shopphone.png';
import shopPlans from '../../data/images/shopPlans.png';
import TestID from '../../Test/TestId';

const useStyles = makeStyles(theme => ({
	container: {
		backgroundImage: `url(${bgi})`,
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		backgroundSize: 'cover',
		width: '100%',
		paddingBottom: 25,
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	title: {
		color: '#bbbbbb',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 15,
		fontSize: 22,
		fontWeight: 600,
		backgroundColor: 'transparent',
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginBottom: 10,
		borderRadius: 5,
		fontFamily: 'lobster',

		[theme.breakpoints.down('sm')]: {
			backgroundImage: `url(${bgi2})`,
			backgroundRepeat: 'no-repeat',
			backgroundAttachment: 'fixed',
			backgroundSize: 'cover'
		},
		[theme.breakpoints.between('sm', 'md')]: {
			backgroundImage: `url(${bgi2})`,
			backgroundRepeat: 'no-repeat',
			backgroundAttachment: 'fixed',
			backgroundSize: 'cover'
		}
	},
	gridSpacer: {
		marginLeft: '20vw',
		marginRight: '20vw',
		overflowY: 'hidden',
		overflowX: 'hidden',
		[theme.breakpoints.down('sm')]: {
			marginLeft: 'unset',
			marginRight: 'unset'
		},
		[theme.breakpoints.between('sm', 'md')]: {
			marginLeft: '10vw',
			marginRight: '10vw'
		}
	},
	icon: {
		color: 'white'
	},
	gridListTile: {
		borderRadius: 20
	}
}));

export default function ShopButtons(): JSX.Element {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div className={classes.container}>
			<br />
			<Typography component="h1" align="center" className={classes.title}>
				Shop the best prepaid cell phone plans in Canada. Period.
			</Typography>
			<div className={classes.gridSpacer}>
				<GridList component="div" cellHeight={300} cols={2} spacing={20}>
					<GridListTile
						id={TestID.shopbuttons.phone}
						component={Link}
						to="/Phones"
						classes={{ tile: classes.gridListTile }}
					>
						<img src={shopPhone} alt="Shop Phones" />
						<GridListTileBar
							title="Shop Phones"
							titlePosition="bottom"
							actionIcon={
								<IconButton>
									<Search className={classes.icon} />
								</IconButton>
							}
						/>
					</GridListTile>
					<GridListTile
						id={TestID.shopbuttons.plan}
						component={Link}
						to="/Plans"
						classes={{ tile: classes.gridListTile }}
					>
						<img src={shopPlans} alt="Shop Plans" />
						<GridListTileBar
							title="Shop Plans"
							titlePosition="bottom"
							actionIcon={
								<IconButton>
									<Search className={classes.icon} />
								</IconButton>
							}
						/>
					</GridListTile>
				</GridList>
			</div>
		</div>
	);
}
