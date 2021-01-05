import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Link } from 'react-router-dom';
import { PersonAdd, Person, ExitToApp } from '@material-ui/icons';
import LoginDialog from './loginDialog';
import { callLogout } from '../../actions/authActions/auth';
import LoginWithGoogle from './googleLogin';
import LoginWithFacebook from './facebookLogin';

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5'
	}
})(props => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center'
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center'
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles(theme => ({
	root: {
		'&:focus': {
			backgroundColor: theme.palette.primary.navBar,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white
			}
		}
	}
}))(MenuItem);

export default function CustomizedMenus() {
	const auth = useSelector(state => state.auth);
	const { token, firstName, lastName } = auth;
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [showLoginDialog, setLoginDialog] = React.useState(false);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}
	function handleLogin() {
		setLoginDialog(!showLoginDialog);
		setAnchorEl(null);
	}
	function handleLogout() {
		dispatch(callLogout());
		setAnchorEl(null);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	return (
		<div
			style={{
				height: '48px',
				// marginLeft: '2%',
				// marginRight: '2%',
				display: 'flex',
				width: token ? 50 : 'auto',
				alignItems: 'center'
			}}
		>
			<LoginDialog setLoginDialog={setLoginDialog} showLoginDialog={showLoginDialog} />
			{token ? (
				<IconButton style={{ padding: 0 }} onClick={handleClick}>
					<Avatar style={{ backgroundColor: 'green' }}>
						{firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()}
					</Avatar>
				</IconButton>
			) : (
				<Button
					style={{
						backgroundColor: '#585858',
						fontFamily: 'Roboto',
						fontWeight: '400',
						fontSize: 'medium',
						color: 'white'
					}}
					aria-controls="customized-menu"
					aria-haspopup="true"
					variant="contained"
					color="primary"
					onClick={handleClick}
				>
					Sign In
				</Button>
			)}
			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{token ? (
					<StyledMenuItem component={Link} to="/AccountSettings">
						<ListItemAvatar>
							<Avatar style={{ backgroundColor: 'green' }}>
								{firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()}
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={`${firstName} ${lastName}`}
							secondary="Account Settings"
						/>
					</StyledMenuItem>
				) : null}

				{token ? null : (
					<StyledMenuItem component={Link} to="/CreateAccount">
						<ListItemIcon>
							<PersonAdd />
						</ListItemIcon>
						<ListItemText primary="Create Account" />
					</StyledMenuItem>
				)}
				{token ? null : (
					<StyledMenuItem onClick={() => handleLogin()}>
						<ListItemIcon>
							<Person />
						</ListItemIcon>
						<ListItemText primary="Login" />
					</StyledMenuItem>
				)}
				{token ? null : <LoginWithGoogle />}
				{token ? null : <LoginWithFacebook />}
				{token ? (
					<StyledMenuItem onClick={() => handleLogout()}>
						<ListItemIcon>
							<ExitToApp />
						</ListItemIcon>
						<ListItemText primary="Sign out" />
					</StyledMenuItem>
				) : null}
			</StyledMenu>
		</div>
	);
}
