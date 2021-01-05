import React from 'react';

import { Typography } from '@material-ui/core';

import GoogleLogin from 'react-google-login';
import { GoogleLoginButton } from 'react-social-login-buttons';

import { useDispatch, useSelector } from 'react-redux';

import { getSocialLogin } from '../../actions/authActions/auth';

export default function LoginWithGoogle() {
	const dispatch = useDispatch();

	const token = useSelector(state => state.auth.token);

	const responseFailure = response => {
		console.log('Login Failed -- ' + response.error);
	};
	const responseSuccess = response => {
		dispatch(
			getSocialLogin(
				response.profileObj.email,
				response.profileObj.givenName,
				response.profileObj.familyName
			)
		);
	};

	return (
		//
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<GoogleLogin
				clientId="648977359725-ruk1v4hdh9m9gbo3k8pf3j334ucehr29.apps.googleusercontent.com"
				buttonText=""
				onSuccess={responseSuccess}
				onFailure={responseFailure}
				render={renderProps => (
					<GoogleLoginButton
						style={{ width: '97%', borderRadius: '7px' }}
						text={
							<Typography style={{ color: 'white', fontSize: 18 }}>
								Continue with Google
							</Typography>
						}
						align="center"
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
					/>
				)}
			/>
		</div>
	);
}
