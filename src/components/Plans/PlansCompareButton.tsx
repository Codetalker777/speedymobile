import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import Fab from '@material-ui/core/Fab';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import ComparePreviewItem from './ComparePreviewPlansItem';
import Compare from '@material-ui/icons/Compare';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper
	},
	title: {
		color: theme.palette.primary.light
	},
	titleBar: {
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
	},
	menuButton: {
		zIndex: '1',
		position: 'fixed',
		// bottom: theme.spacing(7),
		top: theme.spacing(18),
		right: theme.spacing(-4.5),
		backgroundColor: '#49c5b6',
		color: 'white',
		transform: 'rotate(-90deg)',
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: 13,
		borderTopRightRadius: 13,
		height: 40,
		width: 110
	},
	parent: {
		'&::-webkit-scrollbar': {
			width: '4px'
		},
		'&::-webkit-scrollbar-thumb': {
			background: '#49c5b6',
			borderRadius: '10px'
		},
		'&::-webkit-scrollbar-thumb:hover': {
			background: '#000000'
		},
		position: 'sticky',
		padding: `0px 30px 60px 30px`,
		height: '100%',
		top: 71,
		overflowY: 'scroll',
		maxWidth: 300,
		marginRight: 5
	},
	searchNumberCSS: {
		fontWeight: 'bold',
		fontSize: 15,
		marginTop: 10,
		textAlign: 'center'
	},
	subHeader: {
		fontWeight: 'bold',
		fontSize: 18,
		textAlign: 'center'
	},
	ListItemTitle: { justifyContent: 'center', whiteSpace: 'noWrap' },
	ListItemPadding: { padding: `0px 5px 0px 5px` },
	ListItemPaddingAndFlex: { padding: `0px 5px 0px 5px`, flexDirection: 'column' },
	SearchButton: { height: 50, width: '70%' }
}));

export default function PlansCompareButton(): JSX.Element {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = useState(false);
	const isMobile = useMediaQuery({ query: '(max-width:450px)' });

	const data = useSelector(state => state.compare.comparePlansList);

	function handleMobile(state) {
		if (state) {
			if (typeof window !== 'undefined') {
				window?.zE('webWidget', 'hide');
			}
		} else if (typeof window !== 'undefined') {
			window?.zE('webWidget', 'show');
		}
		setMobileOpen(state);
	}

	return (
		<>
			<Fab
				variant="extended"
				color="inherit"
				aria-label="Open drawer"
				onClick={() => handleMobile(true)}
				className={classes.menuButton}
			>
				<Compare />
				Compare List
			</Fab>

			<Drawer
				PaperProps={{ style: { width: isMobile ? '100%' : 'auto' } }}
				variant="temporary"
				anchor="right"
				open={mobileOpen}
				onClose={() => handleMobile(false)}
			>
				<div style={{ overflowX: 'hidden' }}>
					<div align="right">
						<IconButton onClick={() => handleMobile(false)}>
							<Close
								style={{
									color: '#49c5b6'
								}}
							/>
						</IconButton>
					</div>

					<div
						style={{
							width: '100%',
							marginLeft: 10,
							marginRight: 10,
							justifyContent: 'center',
							display: 'flex'
						}}
					>
						<Typography
							component="h2"
							component={Link}
							to="/ComparePlans"
							align="center"
							style={{
								fontSize: 40,
								paddingBottom: 10,
								color: '#49c5b6',
								fontSize: 35,
								padding: 5,
								paddingBottom: 0,
								paddingLeft: 20,
								fontWeight: 400,
								cursor: 'pointer'
							}}
						>
							Go to MyCompare
						</Typography>
					</div>

					<List
						style={{
							padding: `0 50px 50px 50px`,
							overflowX: 'hidden',
							maxWidth: '500px'
						}}
					>
						{data.map(function returnItem(item, index) {
							return <ComparePreviewItem item={item} index={index} />;
						})}
					</List>
				</div>
			</Drawer>
		</>
	);
}
