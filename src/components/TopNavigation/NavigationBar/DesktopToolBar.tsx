import React from 'react';
import { Link } from 'react-router-dom';
import { Button, fade } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LoginButton from '../../Login/loginButton';
import CartIcon from './CartIcon';
import TestID from '../../../Test/TestId';

const useStyles = makeStyles(theme => ({
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
	}
}));

interface DesktopToolBarProps {
	handleDialog: (dialogVisible: boolean) => void;
	navigateOnSearch: () => void;
}

export default function DesktopToolBar({
	handleDialog,
	navigateOnSearch
}: DesktopToolBarProps): JSX.Element {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<>
			<Button
				id={TestID.navBar.search}
				onClick={(): void => {
					navigateOnSearch();
				}}
				classes={{ root: classes.searchButtonRoot }}
			>
				<Search
					style={{
						color: '#eeeeee'
					}}
				/>
			</Button>
			<Button
				id={TestID.navBar.phones}
				classes={{ root: classes.buttonRoot }}
				component={Link}
				to="/Phones"
			>
				PHONES
			</Button>
			<Button
				id={TestID.navBar.plans}
				classes={{ root: classes.buttonRoot }}
				component={Link}
				to="/Plans"
			>
				PLANS
			</Button>
			{/* <Button classes={{ root: classes.buttonRoot }} component={Link} to="/Compare">
				MYCOMPARE
			</Button> */}
			<Button
				id={TestID.navBar.feedback}
				classes={{ root: classes.buttonRoot }}
				onClick={(): void => handleDialog(true)}
			>
				FEEDBACK
			</Button>
			<Button
				id={TestID.navBar.news}
				classes={{ root: classes.buttonRoot }}
				style={{ marginRight: 10 }}
				component={Link}
				to="/News"
			>
				News
			</Button>
			<LoginButton />
			<CartIcon />
		</>
	);
}
