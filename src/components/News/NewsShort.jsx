import React, { useState } from 'react';
import { format } from 'date-fns';

import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';

import { Link } from 'react-router-dom';
import parse, { domToReact } from 'html-react-parser';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
	CardActionArea,
	Grid,
	Menu,
	Grow,
	Button,
	CardActions,
	Card,
	CardContent,
	Avatar,
	Typography,
	useMediaQuery
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ShareMenu from '../SocialMedia/ShareMenu';
import TestID from '../../Test/TestId';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		// flexDirection: 'column',
		backgroundColor: 'white'
	},
	card: {
		marginBottom: 0,
		width: '100%',
		alignSelf: 'center',
		backgroundColor: 'white',
		paddingBottom: 30,
		paddingTop: 10,
		borderRadius: 0,
		boxShadow: `0px 0px 0px`,
		borderBottom: '1px solid #ededed'
	},
	cardContent: {
		paddingBottom: 15,
		width: '100%',
		backgroundColor: 'white'
	},
	title: {
		fontSize: 36,
		marginBottom: 15,
		color: '#313131'
	},
	authorBar: {
		flexDirection: 'row',
		display: 'flex',
		alignItems: 'center',
		marginBottom: 30
	},
	avatar: {
		marginRight: 10,
		width: 45,
		height: 'auto'
	},
	authorBarText: {
		marginLeft: 15,
		color: '#313131'
	},
	image: {
		objectFit: 'cover',
		width: '100%'
	},
	paragraph: {
		fontFamily: 'Roboto',
		fontSize: 16,
		lineHeight: 1.5,
		color: '#313131'
	},
	ellipsis: {
		overflow: 'hidden',
		display: '-webkit-box',
		WebkitLineClamp: 3,
		WebkitBoxOrient: 'vertical'
	},
	actionBar: {
		marginLeft: 'auto'
	},
	button: {
		color: 'black'
	},
	skeletonContainer: {
		display: 'flex',
		minHeight: 500,
		justifyContent: 'center'
	},
	skeleton: {
		width: '100%',
		borderRadius: 10,
		height: 450,
		[theme.breakpoints.between('sm', 'md')]: {
			width: '75%'
		},
		[theme.breakpoints.up('md')]: {
			width: '50%'
		}
	}
}));

export default function RenderNewsShort({ data }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const tablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
	const desktop = useMediaQuery(theme.breakpoints.up('md'));
	const [url, setUrl] = useState('');
	const [title, setTitle] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (article, event) => {
		setUrl(`https://www.speedymobile.ca/Article/${data.slug}`);
		setTitle(`${article.title.rendered}`);
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const options = {
		replace: node => {
			if (node.name !== 'p') return;

			return <p className={classes.ellipsis}>{domToReact(node.children, options)}</p>;
		}
	};
	function gridLayout() {
		if (desktop) return 7;
		if (tablet) return 9;
		return 12;
	}
	return (
		<div className={classes.container}>
			<Grid container justify="center" alignItems="stretch">
				{data ? (
					data.map(function singleArticle(article, index) {
						const date = format(new Date(article.date), 'MMMM do, yyyy');
						return (
							<Grid item xs={gridLayout()}>
								<Grow key={article.id} in {...{ timeout: 1000 * (index + 1) }}>
									<Card className={classes.card}>
										<CardActionArea
											id={TestID.news.articleLink}
											component={Link}
											to={`/Article/${article.slug}`}
										>
											<CardContent className={classes.cardContent}>
												<Typography align="left" className={classes.title} variant="h1">
													{article.title.rendered}
												</Typography>
												<div className={classes.authorBar}>
													<Avatar
														className={classes.avatar}
														src={
															article._embedded.author[0].avatar_urls
																? article._embedded.author[0].avatar_urls['96']
																: unknownAvatar
														}
													/>

													<Typography className={classes.authorBarText}>
														{article._embedded.author[0].name}
													</Typography>
													<Typography className={classes.authorBarText}>
														{date}
													</Typography>
												</div>

												<img
													src={
														article._embedded['wp:featuredmedia'] &&
														article._embedded['wp:featuredmedia'][0].source_url
													}
													height={article._embedded['wp:featuredmedia'] && '230'}
													className={classes.image}
												/>
												<br />

												<div className={classes.paragraph}>
													{parse(article.excerpt.rendered, options)}
												</div>
											</CardContent>
										</CardActionArea>

										<CardActions>
											<div className={classes.actionBar}>
												<Button size="small" className={classes.button}>
													<FavoriteIcon /> &nbsp; Save for later
												</Button>
												&nbsp; &nbsp;
												<Button
													size="small"
													className={classes.button}
													onClick={event => {
														handleClick && handleClick(article, event);
													}}
												>
													<ShareIcon /> &nbsp; Share
												</Button>
											</div>
										</CardActions>
									</Card>
								</Grow>
							</Grid>
						);
					})
				) : (
					<div className={classes.skeletonContainer}>
						<Skeleton variant="rect" className={classes.skeleton} />
					</div>
				)}
			</Grid>
			<Menu
				id={TestID.news.newsShareMenu}
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<ShareMenu url={url} title={title} />
			</Menu>
		</div>
	);
}
