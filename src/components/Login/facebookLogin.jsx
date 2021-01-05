import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '@material-ui/core';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FacebookLoginButton } from 'react-social-login-buttons';

import { getSocialLogin } from '../../actions/authActions/auth';

export default function LoginWithFacebook() {
	const dispatch = useDispatch();

	const token = useSelector(state => state.auth.token);

	const responseFacebook = response => {
		response.email &&
			dispatch(getSocialLogin(response.email, response.first_name, response.last_name));
	};
	return (
		//
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<FacebookLogin
				appId="794534664367050"
				disableMobileRedirect={true}
				fields="first_name,last_name, email,picture"
				callback={responseFacebook}
				render={renderProps => (
					<FacebookLoginButton
						style={{
							width: '97%',
							paddingLeft: '10px',
							borderRadius: '7px'
						}}
						text={
							<Typography style={{ color: 'white', fontSize: 18 }}>
								Continue with Facebook
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
