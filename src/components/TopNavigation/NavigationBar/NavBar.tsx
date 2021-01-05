import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Toolbar, AppBar, fade } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { findBestMatch } from 'string-similarity';
import classNames from 'classnames';
import { useSelector } from '../../../reducers';
import FeedbackDialog from '../../Feedback/feedbackDialog';
import Logo from '../../../data/images/logoinvert.png';
import SwipeableTemporaryDrawer from '../Drawer';
import { topNavSearchActions } from '../../../actions/topNavSearchActions/topNavSearchActions';
import { IndividualPhone } from '../../../utils/dataTypes';
import DesktopToolBar from './DesktopToolBar';
import SearchBar from './SearchBar';
import TestID from '../../../Test/TestId';

const useStyles = makeStyles(theme => ({
	desktop: {
		display: 'flex',
		[theme.breakpoints.down('md')]: {
			display: 'none'
		},
		alignItems: 'center'
	},
	mobile: {
		display: 'none',
		[theme.breakpoints.down('md')]: {
			display: 'flex'
		}
	},
	spacer: {
		flexGrow: 1,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5
	},
	buttonRoot: {
		fontSize: 'medium',
		background: '#009688',
		backgroundColor: '#009688',
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#009688'
		},
		'&:hover': {
			backgroundColor: fade(
				theme.palette.text.primary,
				theme.palette.action.hoverOpacity
			)
		}
	},
	searchButtonRoot: {
		fontSize: 'medium',
		background: '#585858',
		backgroundColor: '#585858',
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#585858'
		},
		'&:hover': {
			backgroundColor: fade('#585858', 0.7)
		}
	},
	searchButtonMobileRoot: {
		height: 48,
		alignSelf: 'center',
		marginRight: 5
	},
	searchButtonRemoveOnTablet: {
		display: 'none',
		[theme.breakpoints.between('sm', 'md')]: {
			display: 'inline-flex'
		}
	},
	colorPrimary: {
		backgroundColor: '#009688',
		borderRadius: 0
	},
	displayAutoComplete: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},
	toolbarRegular: {
		[theme.breakpoints.down('sm')]: {
			minHeight: 'auto'
		}
	},
	logoStyling: {
		objectFit: 'scale-down',
		width: 225,
		[theme.breakpoints.down('sm')]: {
			height: '20px',
			width: 'auto'
		}
	},
	displayMobileAutoComplete: {
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 5,
		display: 'block',
		[theme.breakpoints.up('sm')]: {
			display: 'none',
			padding: 0
		}
	},
	spaceMobile: {
		flexGrow: 1,
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	mobileNavContainer: {
		display: 'flex',
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	}
}));

function PrimarySearchAppBar(): JSX.Element {
	const theme = useTheme();
	const history = useHistory();
	const classes = useStyles(theme);
	const [showDialog, handleDialog] = useState(false);
	const [input, setInput] = useState('');
	const { data } = useSelector(state => state.topNavSearch);
	const searchTerms: string[] = data.map(function returnSearchTerms(
		searchItem: IndividualPhone
	) {
		return searchItem.slug;
	});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(topNavSearchActions.getSearchTerms());
	}, []);
	function handleCloseDialog(): void {
		handleDialog(false);
	}
	function handleOpenDialog(): void {
		handleDialog(true);
	}
	function navigateOnSearch(): void {
		const { bestMatchIndex } = findBestMatch(input, searchTerms);
		history.push(`/Phones/${encodeURIComponent(searchTerms[bestMatchIndex])}`);
	}

	return (
		<AppBar position="relative" classes={{ colorPrimary: classes.colorPrimary }}>
			<FeedbackDialog showDialog={showDialog} closeDialog={handleCloseDialog} />
			<Toolbar classes={{ regular: classes.toolbarRegular }}>
				<Button
					id={TestID.navBar.home}
					classes={{ root: classes.buttonRoot }}
					component={Link}
					to="/"
				>
					<img className={classes.logoStyling} src={Logo} alt="logo" />
				</Button>
				<div className={classes.spacer}>
					<div className={classes.displayAutoComplete}>
						<SearchBar onInputChanged={setInput} />
					</div>
				</div>
				<div className={classes.desktop}>
					<DesktopToolBar
						handleDialog={handleDialog}
						navigateOnSearch={navigateOnSearch}
					/>
				</div>
				<Button
					id={TestID.navBar.search}
					onClick={(): void => {
						navigateOnSearch();
					}}
					classes={{
						root: classNames(
							classes.searchButtonRoot,
							classes.searchButtonRemoveOnTablet
						)
					}}
				>
					<Search
						style={{
							color: '#eeeeee'
						}}
					/>
				</Button>
				<div className={classes.mobile}>
					<SwipeableTemporaryDrawer handleOpenDialog={handleOpenDialog} />
				</div>
			</Toolbar>
			<div className={classes.mobileNavContainer}>
				<div className={classes.spaceMobile}>
					<div className={classes.displayMobileAutoComplete}>
						<SearchBar onInputChanged={setInput} isMobile />
					</div>
				</div>
				<Button
					id={TestID.navBar.search}
					onClick={(): void => {
						navigateOnSearch();
					}}
					classes={{
						root: classNames(classes.searchButtonRoot, classes.searchButtonMobileRoot)
					}}
				>
					<Search
						style={{
							color: '#eeeeee'
						}}
					/>
				</Button>
			</div>
		</AppBar>
	);
}

export default PrimarySearchAppBar;
