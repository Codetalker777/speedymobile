import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import MySnackbarContentWrapper from './Messages';
import { messageActions } from '../../actions/messageActions/messageActions';

export default function AppMessages() {
	const dispatch = useDispatch();
	const { open, messageType, message } = useSelector(state => state.messages);
	const [cookies, setCookie] = useCookies(['name']);

	if (message === 'By using this website you agree to the terms and services') {
		const year = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
		setCookie('tocCookie', true, { path: '/', expires: year });
	}

	function handleClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		dispatch(messageActions.clearPopup());
		if (typeof window !== 'undefined') {
			window?.zE('webWidget', 'show');
		}
	}
	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
		>
			<MySnackbarContentWrapper
				onClose={handleClose}
				variant={messageType}
				message={message}
			/>
		</Snackbar>
	);
}
