import React from 'react';
import {
	Typography,
	Card,
	CardMedia,
	CardActionArea,
	CardContent,
	Grid
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { IndividualPhone } from '../../../utils/dataTypes';
import TestID from '../../../Test/TestId';

const useStyles = makeStyles(theme => ({
	container: {
		width: 155,
		borderRadius: 7
	},
	image: {
		objectFit: 'scale-down',
		height: 200,
		paddingTop: 50
	},
	gridItem: {
		padding: 5,
		marginLeft: 2,
		marginRight: 2
	},
	phoneName: {
		whiteSpace: 'nowrap',
		fontFamily: 'roboto',
		fontWeight: 200
	},
	price: {
		color: '#49c5b6',
		fontWeight: 'bold'
	}
}));

interface PhoneCardProps {
	phone: IndividualPhone;
}

export default function PhoneCard({ phone }: PhoneCardProps): JSX.Element {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<Grid item className={classes.gridItem}>
			<Card className={classes.container}>
				<CardActionArea
					id={TestID.phoneCard}
					component={Link}
					to={`/Phones/${phone.slug}`}
				>
					<CardMedia className={classes.image} component="img" image={phone.images[0]} />
					<CardContent>
						<Typography className={classes.phoneName} align="center" component="h3">
							{phone.manufacturer} {phone.name}
						</Typography>
						<Typography align="center" component="h4" className={classes.price}>
							<sup>$</sup>
							{phone.cost[Object.keys(phone.cost)[0]]}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
}
