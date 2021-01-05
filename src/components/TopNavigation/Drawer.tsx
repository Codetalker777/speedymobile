// Drawer of Nav Bar Mobile

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
	IconButton,
	SwipeableDrawer,
	List,
	Divider,
	ListItem,
	ListItemText,
	Badge,
	ListItemIcon,
	Avatar
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
	PersonAdd,
	ExitToApp,
	FolderOpen,
	Person,
	CheckBox,
	PhoneIphone,
	ShoppingCart,
	Menu,
	Compare,
	ChromeReaderMode
} from '@material-ui/icons';
import { useSelector } from '../../reducers';
import LoginDialog from '../Login/loginDialog';
import { callLogout } from '../../actions/authActions/auth';

import LoginWithGoogle from '../Login/googleLogin';
import LoginWithFacebook from '../Login/facebookLogin';
import TestID from '../../Test/TestId';
import { CartType } from '../../utils/dataTypes';

const useStyles = makeStyles(theme => ({
	iconColor: { color: '#eae0c8' },
	menuIconColor: { color: 'white' },
	dividerColor: { backgroundColor: '#eae0c8' },
	avatarColor: { backgroundColor: 'green' },
	DrawerPaper: { backgroundColor: '#009688', color: 'white' },
	ListItemTextSecondary: { color: 'lightgrey' }
}));

const Quantity = (object?: CartType): number => {
	let sum = 0;
	if (!object) return 0;
	const values = Object.values(object.phones).concat(Object.values(object.plans));
	for (let i = 0; i < values.length; i++) {
		sum += values[i].quantity;
	}

	return sum;
};

interface SwipeableTemporaryDrawerProps {
	handleOpenDialog: () => void;
}

export default function SwipeableTemporaryDrawer({
	handleOpenDialog
}: SwipeableTemporaryDrawerProps): JSX.Element {
	const { token, firstName, lastName } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const [openDrawer, handleDrawer] = useState(false);
	const [showLoginDialog, setLoginDialog] = React.useState(false);
	const [cookies] = useCookies(['cart']);
	const theme = useTheme();
	const classes = useStyles(theme);
	const handleFeedback = (): void => {
		handleDrawer(false);
		handleOpenDialog();
	};
	function handleLogout(): void {
		handleDrawer(false);
		dispatch(callLogout());
	}
	return (
		<div>
			<IconButton onClick={(): void => handleDrawer(true)}>
				<Badge badgeContent={Quantity(cookies.cart)} color="primary">
					<Menu className={classes.menuIconColor} />
				</Badge>
			</IconButton>
			<LoginDialog setLoginDialog={setLoginDialog} showLoginDialog={showLoginDialog} />
			<SwipeableDrawer
				classes={{ paper: classes.DrawerPaper }}
				anchor="top"
				open={openDrawer}
				onClose={(): void => handleDrawer(false)}
				onOpen={(): void => handleDrawer(true)}
			>
				<List>
					{token && firstName && lastName ? (
						<ListItem
							button
							component={Link}
							to="/AccountSettings"
							onClick={(): void => handleDrawer(false)}
						>
							<ListItemIcon>
								<Avatar className={classes.avatarColor}>
									{firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()}
								</Avatar>
							</ListItemIcon>
							<ListItemText
								classes={{ secondary: classes.ListItemTextSecondary }}
								primary={`${firstName} ${lastName}`}
								secondary="Account Settings"
							/>
						</ListItem>
					) : (
						<>
							<LoginWithGoogle />

							<LoginWithFacebook />

							<ListItem button onClick={(): void => setLoginDialog(true)}>
								<ListItemIcon>
									<Person className={classes.iconColor} />
								</ListItemIcon>
								<ListItemText primary="Sign In" />
							</ListItem>
							<ListItem
								button
								component={Link}
								to="/CreateAccount"
								onClick={(): void => handleDrawer(false)}
							>
								<ListItemIcon>
									<PersonAdd className={classes.iconColor} />
								</ListItemIcon>
								<ListItemText primary="Create Account" />
							</ListItem>
						</>
					)}
					<Divider className={classes.dividerColor} />
					<ListItem
						id={TestID.navBar.news}
						button
						component={Link}
						to="/News"
						onClick={(): void => handleDrawer(false)}
					>
						<ListItemIcon>
							<ChromeReaderMode className={classes.iconColor} />
						</ListItemIcon>
						<ListItemText primary="News" />
					</ListItem>
					<ListItem
						id={TestID.navBar.phones}
						button
						component={Link}
						to="/Phones"
						onClick={(): void => handleDrawer(false)}
					>
						<ListItemIcon>
							<PhoneIphone className={classes.iconColor} />
						</ListItemIcon>
						<ListItemText primary="Phones" />
					</ListItem>
					<ListItem id={TestID.navBar.plans} button component={Link} to="/Plans">
						<ListItemIcon>
							<FolderOpen className={classes.iconColor} />
						</ListItemIcon>
						<ListItemText primary="Plans" />
					</ListItem>
					{/* <ListItem
						button
						component={Link}
						to="/Compare"
						onClick={() => handleDrawer(false)}
					>
						<ListItemIcon>
							<Compare className={classes.iconColor} />
						</ListItemIcon>
						<ListItemText primary="MyCompare" />
					</ListItem> */}
					<ListItem
						id={TestID.navBar.feedback}
						button
						onClick={(): void => handleFeedback()}
					>
						<ListItemIcon>
							<CheckBox className={classes.iconColor} />
						</ListItemIcon>
						<ListItemText primary="Feedback" />
					</ListItem>
					<ListItem
						id={TestID.navBar.cart}
						button
						component={Link}
						to="/Cart"
						onClick={(): void => handleDrawer(false)}
					>
						<ListItemIcon>
							<Badge badgeContent={Quantity(cookies.cart)} color="primary">
								<ShoppingCart className={classes.iconColor} />
							</Badge>
						</ListItemIcon>
						<ListItemText primary="Cart" />
					</ListItem>
					{token ? (
						<>
							<Divider className={classes.dividerColor} />
							<ListItem onClick={(): void => handleLogout()}>
								<ListItemIcon>
									<ExitToApp className={classes.iconColor} />
								</ListItemIcon>
								<ListItemText primary="Sign out" />
							</ListItem>
						</>
					) : null}
				</List>
			</SwipeableDrawer>
		</div>
	);
}
