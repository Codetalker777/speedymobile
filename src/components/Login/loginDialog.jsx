import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLogin, loginSucess } from '../../actions/authActions/auth';

const styles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	closeButton: {
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)(props => {
	const { children, classes } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root}>
			<Typography style={{ flex: 1 }} variant="h6">
				{children}
			</Typography>
			<IconButton
				aria-label="Close"
				onClick={() => props.value()}
				className={classes.closeButton}
			>
				<CloseIcon />
			</IconButton>
		</MuiDialogTitle>
	);
});

export default function ScrollDialog({ setLoginDialog, showLoginDialog }) {
	const dispatch = useDispatch();
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const token = useSelector(state => state.auth.token);

	if (token !== null) {
		setLoginDialog();
	}

	function loginCall() {
		dispatch(getLogin(email, password));
		setPassword('');
		setEmail('');
	}
	function handleEnterKey(key) {
		if (key === 'Enter') {
			loginCall();
		}
	}
	if (showLoginDialog) {
		return (
			<Dialog
				open
				fullScreen={false}
				onClose={setLoginDialog}
				scroll="paper"
				aria-labelledby="scroll-dialog-title"
			>
				<DialogTitle value={setLoginDialog} id="scroll-dialog-title">
					Login
				</DialogTitle>
				<DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
					<TextField
						style={{ margin: 10 }}
						label="Email"
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						style={{ margin: 10 }}
						type="password"
						label="Password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
						onKeyPress={e => handleEnterKey(e.key)}
					/>
					<Button onClick={loginCall} style={{ marginTop: 10, marginBottom: 30 }}>
						Sign In
					</Button>
					<Typography
						component={Link}
						to="/ResetPassword"
						style={{ fontSize: 12, fontFamily: 'Roboto' }}
					>
						Forgot your Password? Click here to reset it
					</Typography>
				</DialogContent>
			</Dialog>
		);
	}

	return null;
}
