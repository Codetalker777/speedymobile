import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import bgi from '../../data/images/bgi.png';
import TestID from '../../Test/TestId';

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		boxShadow: 'inset 0px 0px 5px 0px #888',
		backgroundImage: `url(${bgi})`,
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		backgroundSize: 'cover',
		justifyContent: 'center',
		display: 'flex'
	},
	youtubeVideo: {
		width: '50vw',
		height: '28vw',
		display: 'flex',
		marginTop: '5%',
		marginBottom: '5%',

		[theme.breakpoints.down('sm')]: {
			width: '100vw',
			height: '56vw'
		},
		[theme.breakpoints.between('sm', 'md')]: {
			width: '75vw',
			height: '42vw'
		}
	}
}));

export default function PhoneCarousel(): JSX.Element {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div className={classes.container}>
			<iframe
				className={classes.youtubeVideo}
				src="https://www.youtube.com/embed/ogvDsd8sdf7cZmY"
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen="allowfullscreen"
				title="Site Tutorial Video"
				id={TestID.youtubeVideo}
			/>
		</div>
	);
}
