import React from 'react';
import {
	Typography,
	Card,
	CardMedia,
	CardActionArea,
	CardContent,
	Grid,
	Box,
	Button,
	CardActions
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { Link } from 'react-router-dom';
import { IndividualPhone } from '../../utils/dataTypes';
import CompareIcon from '@material-ui/icons/Compare';
import { useDispatch } from 'react-redux';
import { addToPhonesCompareList } from '../../actions/comparePhonesActions/comparePhonesActions';

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

interface PhoneCardProps {
	phone: IndividualPhone;
}

export default function DetailedPhoneCard({ phone }: PhoneCardProps): JSX.Element {
	const theme = useTheme();
	const classes = useStyles(theme);
	const dispatch = useDispatch();

	const addtoCompareList = () => {
		dispatch(addToPhonesCompareList(phone));
	};

	return (
		<Grid xs={6} sm={4} item>
			<Card className={classes.container}>

				
				<CardActionArea component={Link} to={`/Phones/${phone.slug}`}>
					<CardContent>
						<Typography className={classes.phoneBrand} component="h1">
							{phone.manufacturer}
						</Typography>

						<Typography className={classes.phoneModel} component="h1">
							{phone.name}
						</Typography>
						<CardMedia
							className={classes.image}
							component="img"
							image={phone.images[0]}
							align="center"
						/>

						<Typography className={classes.cost} component="p">
							<sup>$</sup>
							{phone.cost[Object.keys(phone.cost)[0]]}
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
				</CardActionArea>
				<CardActions>
					<div style={{ paddingLeft: 10 }}>
						<Button className={classes.CompareButton} onClick={addtoCompareList}>
							<CompareIcon />
							{'Compare'}
						</Button>
					</div>
				</CardActions>
			</Card>
		</Grid>
	);
}
