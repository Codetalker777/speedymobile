import React from 'react';
import { useTheme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, ButtonBase } from '@material-ui/core';
import { Link } from 'react-router-dom';
import image0 from '../../../data/images/carrier1.png';

const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			overflow: 'hidden',
			backgroundColor: theme.palette.background.paper,
			paddingTop: 80,
			justifySelf: 'center',
			justifyItems: 'center',
			justifyContent: 'center',
			boxShadow: '0px 0px 5px 0px #888'
		},

		icon: {
			color: 'rgba(255, 255, 255, 0.54)'
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
		},
		image: {
			position: 'relative',
			maxWidth: 800,
			height: 'auto',
			[theme.breakpoints.down('xs')]: {
				width: '100% !important' // Overrides inline-style
			},
			'&:hover, &$focusVisible': {
				zIndex: 1,
				'& $imageBackdrop': {
					opacity: 0.15
				},
				'& $imageMarked': {
					opacity: 0
				},
				'& $imageTitle': {
					border: '4px solid currentColor'
				}
			}
		},
		imageSrc: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			backgroundSize: 'contain',
			backgroundRepeat: 'no-repeat'
		}
	})
);

export default function Plans(): JSX.Element {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div className={classes.root}>
			<div align="center" style={{ maxWidth: 800 }}>
				<div style={{ textAlign: 'left' }}>
					<Typography component="h2" className={classes.title}>
						Carriers
					</Typography>
					<Typography className={classes.text}>
						We provide contract free prepaid plans from Chatr Wireless, with a
						combination of talk, text, data, and US/Canadian long distance. More Canadian
						wireless carriers coming soon! <br />
					</Typography>
				</div>
				<br />
				<br />
				<ButtonBase
					component={Link}
					to="/Carrier/Chatr"
					focusRipple
					className={classes.image}
				>
					<img src={image0} style={{ maxWidth: '100%', maxHeight: '100%' }} />
				</ButtonBase>
			</div>
		</div>
	);
}
