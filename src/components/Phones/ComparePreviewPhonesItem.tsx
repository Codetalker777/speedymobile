import React from 'react';
import { useDispatch } from 'react-redux';
import { MuiThemeProvider, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { removeFromPhonesCompareList } from '../../actions/comparePhonesActions/comparePhonesActions';

import Rating from '@material-ui/lab/Rating';
import CheckCircle from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
	container: {
		borderRadius: 5,
		boxShadow: '0px 0px 5px 0px #888',
		marginBottom: 10
	},
	image: {
		objectFit: 'scale-down',
		alignContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
		paddingTop: 24,
		height: 200
	},
	content: {
		display: 'flex',
		flexDirection: 'column'
	},
	phoneBrand: {
		fontFamily: 'roboto',
		fontWeight: 400,
		fontSize: 15,
		color: '#313131'
	},
	phoneModel: {
		fontFamily: 'roboto',
		fontWeight: 600,
		fontSize: 25,
		color: '#313131'
	},
	cost: {
		fontFamily: 'roboto',
		fontWeight: 600,
		fontSize: 20,
		color: '#313131'
	},

	star: {
		color: '#49c5b6',
		fontSize: 15
	},

	stock: {
		fontFamily: 'roboto',
		fontWeight: 300,
		fontSize: 13,
		color: '#313131'
	},
	CompareButton: {
		background: 'transparent',
		backgroundColor: 'transparent',
		color: '#9e9e9e',
		borderRadius: 8,
		textTransform: 'none'
	}
}));

export default function CompareItem(input): JSX.Element {
	const [] = React.useState(false);
	const dispatch = useDispatch();
	const theme = useTheme();
	const classes = useStyles(theme);
	const { index } = input;
	const { item } = input;

	return (
		<MuiThemeProvider theme={theme}>
			<ListItem style={{ justifyContent: 'center' }}>
				<Card
					style={{
						margin: 15,
						display: 'flex',
						flexDirection: 'column',
						width: 200,
						alignSelf: 'center',
						borderRadius: 8
					}}
				>
					<CardContent>
						<HighlightOffIcon
							style={{
								position: 'absolute',
								right: 40,
								top: 40,
								color: 'red',
								cursor: 'pointer'
							}}
							onClick={() => dispatch(removeFromPhonesCompareList(index))}
						/>
						<Typography className={classes.phoneBrand} component="h1">
							{item.manufacturer}
						</Typography>

						<Typography className={classes.phoneModel} component="h1">
							{item.name}
						</Typography>
						<CardMedia
							className={classes.image}
							component="img"
							image={item.images[0]}
							align="center"
						/>

						<Typography className={classes.cost} component="p">
							<sup>$</sup>
							{item.cost[Object.keys(item.cost)[0]]}
						</Typography>

						<Box mb={3} borderColor="transparent">
							<Rating readOnly value={5} className={classes.star} />
						</Box>

						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<CheckCircle
								style={{ color: '#49c5b6', marginRight: 5, fontSize: 15, marginTop: 2 }}
							/>
							<Typography className={classes.stock}>In Stock</Typography>
						</div>
					</CardContent>
				</Card>
			</ListItem>
		</MuiThemeProvider>
	);
}
