import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { format } from 'date-fns';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SubdirectoryArrowLeft from '@material-ui/icons/SubdirectoryArrowLeft';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Slide from '@material-ui/core/Slide';
import { Link, useLocation } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import Menu from '@material-ui/core/Menu';

import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import Switch from '@material-ui/core/Switch';
import { useMediaQuery } from 'react-responsive';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import parse from 'html-react-parser';
import ShareMenu from '../components/SocialMedia/ShareMenu';
import unknownAvatar from '../data/images/unknownAvatar.jpg';
import { NewsActions } from '../actions/newsActions/newsActions';
import { trackPageView } from '../utils/GoogleAnalytics';

import PopupDialog from '../components/Popup/PopupDialog';
import TestID from '../Test/TestId';

export default function NewsArticle(props) {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [nightReading, setNightReading] = useState(false);
	const data = useSelector(state => state.news.newsArticle);
	const isMobile = useMediaQuery({ query: '(max-width:766px)' });
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleCloseDialog = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (!data) {
			dispatch(NewsActions.downloadArticle(props.match.params.slug));
		}
		window.scrollTo(0, 0);
		trackPageView(window.location);
		handleClickOpen();
		return () => {
			dispatch(NewsActions.resetArticle());
		};
	}, []);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleNightSwitch = () => {
		setNightReading(!nightReading);
	};

	return (
		<div
			style={{
				background: nightReading ? 'black' : 'white',
				overflowX: 'hidden',
				maxWidth: '100%'
			}}
		>
			{data && (
				<Helmet>
					<title>{data.title.rendered}</title>
					<meta property="og:type" content="article" />
					<meta property="og:title" content={data.title.rendered} />
					<meta
						property="og:url"
						content={useLocation().pathname + useLocation().search}
					/>
					<meta
						property="og:image"
						content={
							data._embedded['wp:featuredmedia'] &&
							data._embedded['wp:featuredmedia'][0]?.source_url
						}
					/>
					<meta property="og:description" content={data.content.description} />
					<meta property="fb:app_id" content="794534664367050" />
				</Helmet>
			)}

			<div
				style={{
					display: 'flex',
					width: '100%',
					marginTop: 10,
					flexDirection: 'column'
				}}
			>
				<div
					style={{
						padding: 20
					}}
				>
					<Box
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'row',
							flexGrow: '1',
							width: '100%',
							justifyContent: 'space-between'
						}}
					>
						<Box>
							<Button
								variant="filled"
								component={Link}
								to="/News"
								style={{
									width: 130,
									height: 50,
									alignSelf: 'left',
									marginLeft: 'auto',
									background: nightReading && '#424242'
								}}
							>
								{' '}
								<SubdirectoryArrowLeft
									style={{ alignSelf: 'center', textAlign: 'center' }}
								/>
								&nbsp; &nbsp;
								<Typography
									style={{
										fontSize: 12,
										textTransform: 'none',
										textAlign: 'center'
									}}
								>
									Back to all articles
								</Typography>
							</Button>
							<PopupDialog
								open={open}
								handleClose={handleCloseDialog}
								heading="We go to store-to-store so you dont have to."
								text={
									"Finding the best plan for the phone you love is hard work. Let's make it as easy as signing up."
								}
								otherText="Sign up now to receive all the hottest deals and news!"
							/>
						</Box>

						<Box>
							<Button
								variant="filled"
								onClick={handleNightSwitch}
								style={{
									width: 130,
									height: 50,
									marginRight: 'auto',
									background: 'transparent'
								}}
							>
								&nbsp;
								<Brightness4Icon
									style={{
										color: nightReading ? '#e0e0e0' : '#424242'
									}}
								/>
								&nbsp;
								<Typography
									style={{
										fontSize: 12,
										textTransform: 'none',
										color: nightReading ? '#f5f5f5' : '#424242'
									}}
								>
									Night Reading
								</Typography>
								<Switch
									checked={nightReading}
									onChange={handleNightSwitch}
									value="nightReading"
								/>
							</Button>
						</Box>
					</Box>
				</div>
				<br />
				<Slide direction="up" in mountOnEnter unmountOnExit timeout={350}>
					<Card
						style={{
							marginBottom: 40,
							width: isMobile ? '100%' : '60%',
							alignSelf: 'center',
							background: nightReading ? '#424242' : '#fafafa',
							borderRadius: 8
						}}
					>
						{data ? (
							<div>
								{data._embedded['wp:featuredmedia'] && (
									<img
										src={
											data._embedded['wp:featuredmedia'] &&
											data._embedded['wp:featuredmedia'][0]?.source_url
										}
										width="100%"
										style={{ objectFit: 'cover' }}
									/>
								)}

								<CardContent style={{ padding: 30 }}>
									<Typography
										align="center"
										style={{
											fontSize: isMobile ? 36 : 44,
											marginBottom: isMobile ? 10 : 30,
											fontWeight: 400,
											color: nightReading ? 'white' : 'black'
										}}
										variant="h1"
									>
										{parse(data.title.rendered)}
									</Typography>

									<CardActions>
										<Avatar
											style={{ marginRight: 10 }}
											src={
												data._embedded.author[0].avatar_urls
													? data._embedded.author[0].avatar_urls['96']
													: unknownAvatar
											}
										/>
										<Typography
											style={{
												fontWeight: 300,
												color: nightReading ? 'white' : 'black',
												fontSize: isMobile && 14,
												paddingRight: 20
											}}
										>
											{data._embedded.author[0].name}
										</Typography>
										<Typography
											style={{
												fontWeight: 300,
												fontSize: isMobile && 14,
												color: nightReading ? 'white' : 'black'
											}}
										>
											{format(new Date(data.date), 'MMMM dd, yyyy')}
										</Typography>
										{!isMobile && (
											<IconButton style={{ marginLeft: 'auto' }}>
												<FavoriteIcon
													style={{
														color: nightReading ? '#e0e0e0' : '#424242'
													}}
												/>{' '}
											</IconButton>
										)}
										{!isMobile && (
											<IconButton onClick={event => handleClick(event)}>
												{' '}
												<ShareIcon
													style={{
														color: nightReading ? '#e0e0e0' : '#424242'
													}}
												/>{' '}
											</IconButton>
										)}
									</CardActions>
									<CardActions style={{ marginRight: -20, marginBottom: -20 }}>
										{isMobile && (
											<IconButton style={{ marginLeft: 'auto' }}>
												<FavoriteIcon
													style={{
														color: nightReading ? '#e0e0e0' : '#424242'
													}}
												/>{' '}
											</IconButton>
										)}
										{isMobile && (
											<IconButton onClick={event => handleClick(event)}>
												{' '}
												<ShareIcon
													style={{
														color: nightReading ? '#e0e0e0' : '#424242'
													}}
												/>{' '}
											</IconButton>
										)}
									</CardActions>

									<div
										style={{
											fontFamily: 'Roboto',
											textAlign: 'left',
											fontSize: 18,
											color: nightReading ? 'white' : 'black',
											lineHeight: 1.3
										}}
									>
										{parse(data.content.rendered)}
									</div>
								</CardContent>
								<Menu
									id={TestID.news.newsShareMenu}
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<ShareMenu
										url={`https://www.speedymobile.ca/Article/${data.slug}`}
										title={data.title.rendered}
									/>
								</Menu>
							</div>
						) : (
							<Skeleton
								variant="rect"
								width="100%"
								height={300}
								style={{ borderRadius: 10 }}
							/>
						)}
					</Card>
				</Slide>
			</div>
		</div>
	);
}
