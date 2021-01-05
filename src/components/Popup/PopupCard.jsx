import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import popupCardPic from '../../data/images/popupCardPic.png';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import { useMediaQuery } from 'react-responsive';
import PopupSubcscribe from './PopupSubcscribe';

const useStyles = makeStyles({
	root: {
		width: '100%',
		backgroundColor: '#00CCBB'
	}
});

export default function PopupCard(props) {
	const classes = useStyles();
	const isMobile = useMediaQuery({ query: '(max-width:1000px)' });

	return (
		<Card className={classes.root}>
			<Box style={{ display: 'flex', flexDirection: 'row' }}>
				{!isMobile && (
					<Box style={{ width: 220 }}>
						<CardMedia
							component="img"
							image={popupCardPic}
							style={{
								objectFit: 'cover',
								height: '100%',
								width: 220
							}}
						/>
					</Box>
				)}
				<CloseIcon
					onClick={props.closeDialog}
					style={{
						color: '#212121',
						cursor: 'pointer',
						position: 'absolute',
						right: 8,
						top: 8
					}}
				/>
				<Box style={{ textAlign: 'center', paddingTop: 15 }}>
					<CardContent>
						<Typography
							gutterBottom
							style={{ color: 'white', fontWeight: 500, fontSize: 24 }}
						>
							{props.heading}
						</Typography>
						<Typography style={{ color: 'black', fontWeight: 400, fontSize: 14 }}>
							{props.text}
						</Typography>
						<br />
						<Typography style={{ color: 'black', fontWeight: 450, fontSize: 15 }}>
							{props.otherText}
						</Typography>
					</CardContent>

					<PopupSubcscribe closeDialog={props.closeDialog} />
				</Box>
			</Box>
		</Card>
	);
}
