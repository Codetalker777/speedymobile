import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/styles';
import { NewsActions } from '../actions/newsActions/newsActions';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';
import RenderNewsShort from '../components/News/NewsShort';

const divStyling = {
	justifyContent: 'center',
	display: 'flex'
};

const typographyStyling = {
	fontSize: 16,
	flex: 1,
	maxWidth: 100,
	textAlign: 'center',
	padding: 10,
	alignSelf: 'center'
};

const arrowStyling = {
	width: 60,
	height: 60,
	marginLeft: 5,
	marginRight: 5
};

const useStyles = makeStyles(theme => ({
	buttonRoot: {
		maxWidth: 300,
		padding: 10,
		marginLeft: 10,
		marginRight: 10,
		flex: 1,
		backgroundColor: 'inherit',
		color: '#49c5b6',
		'&:hover': {
			backgroundColor: 'transparent'
		}
	}
}));

export default function News(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [pageNumber, setPageNumber] = React.useState();

	const data = useSelector(state => state.news.newsMainData);
	const pageLimit = useSelector(state => state.news.totalPages);
	useEffect(() => {
		const number =
			Number.parseInt(new URLSearchParams(props.location.search).get('page'), 10) || 1;
		setPageNumber(number);
		if (!data) {
			dispatch(NewsActions.downloadMainNews(number));
		}
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		const number =
			Number.parseInt(new URLSearchParams(props.location.search).get('page'), 10) || 1;
		if (pageNumber !== number && pageNumber !== undefined) {
			setPageNumber(number);
			dispatch(NewsActions.downloadMainNews(number));
			window.scrollTo(0, 0);
		}
	});
	return (
		<div>
			<Helmet>
				<title>News | SpeedyMobile</title>
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${process.env.API_URL}/News`} />
				<meta
					name="description"
					content="Find all the latest News on Cellphones and Plans here"
				/>
				<meta property="og:title" content="News" />
				<meta
					property="og:description"
					content="Find all the latest News on Cellphones and Plans here"
				/>
				<meta name="twitter:image" content={TwitterLink} />
				<meta property="og:image" content={FaceBookLink} />
				<meta property="fb:app_id" content="794534664367050" />
			</Helmet>
			<div
				style={{
					display: 'flex',
					width: '100%',
					paddingTop: 90,
					flexDirection: 'column',
					backgroundColor: 'white'
				}}
			/>
			<RenderNewsShort data={data} />
			<div style={divStyling}>
				<Button
					component={Link}
					to={`/News?page=${pageNumber - 1}`}
					disabled={pageNumber === 1}
					classes={{ root: classes.buttonRoot }}
					onClick={() => {
						if (window) {
							window.scrollTo(0, 0);
						}
					}}
				>
					<ArrowBack style={arrowStyling} />
				</Button>
				<Typography style={typographyStyling}>Page {pageNumber}</Typography>
				<Button
					component={Link}
					to={`/News?page=${pageNumber + 1}`}
					disabled={pageNumber === pageLimit}
					classes={{ root: classes.buttonRoot }}
					onClick={() => {
						if (window) {
							window.scrollTo(0, 0);
						}
					}}
				>
					<ArrowForward style={arrowStyling} />
				</Button>
			</div>
		</div>
	);
}
