import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { verifyPasswordActions } from '../actions/resetPasswordActions/resetPasswordActions';
import { messageActions } from '../actions/messageActions/messageActions';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

export default function VerifyEmail() {
	const query = new URLSearchParams(useLocation().search);
	const [passwordCheck, setPasswordCheck] = useState(false);
	const dispatch = useDispatch();
	const { loading, success, password, confirmPassword } = useSelector(
		state => state.resetPassword
	);
	useEffect(() => {
		if (loading) {
			const id = query.get('bit');
			dispatch(verifyPasswordActions.verifyPassword(id));
		}
	}, []);

	const setError = value => {
		if (passwordCheck === false) {
			return false;
		}
		if (value === '') {
			return true;
		}
		return false;
	};
	const passwordChecker = () => {
		if (password === confirmPassword) return false;
		return true;
	};
	const submitPasswordChange = () => {
		if (password.length === 0 || confirmPassword.length === 0) {
			dispatch(
				messageActions.setPopup('Please fill in all fields before submitting', 'warning')
			);
		} else if (passwordChecker()) {
			setPasswordCheck(true);
			dispatch(
				messageActions.setPopup(
					'Passwords do not match, please correct the passwords',
					'warning'
				)
			);
		} else {
			dispatch(verifyPasswordActions.submitNewPassword());
		}
	};
	if (loading) {
		return (
			<div>
				<Helmet>
					<title>Password Reset Verification | SpeedyMobile</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta
						property="og:url"
						content={`${process.env.API_URL}/verifyPasswordReset`}
					/>
					<meta
						name="description"
						content="Verify your SpeedyMobile Password Reset Here"
					/>
					<meta property="og:title" content="Password Reset Verification" />
					<meta
						property="og:description"
						content="Verify your SpeedyMobile Password Reset Here"
					/>
					<meta name="twitter:image" content={TwitterLink} />
					<meta property="og:image" content={FaceBookLink} />
					<meta property="fb:app_id" content="794534664367050" />
				</Helmet>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						backgroundColor: '#eff2f7',
						minHeight: 500,
						justifyContent: 'center'
					}}
				>
					<CircularProgress color="secondary" style={{ top: -60 }} />
				</div>
			</div>
		);
	}
	if (success) {
		return (
			<div>
				<Helmet>
					<title>Password Reset Verification | SpeedyMobile</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta
						property="og:url"
						content={`${process.env.API_URL}/verifyPasswordReset`}
					/>
					<meta
						name="description"
						content="Verify your SpeedyMobile Password Reset Here"
					/>
					<meta property="og:title" content="Password Reset Verification" />
					<meta
						property="og:description"
						content="Verify your SpeedyMobile Password Reset Here"
					/>
					<meta name="twitter:image" content={TwitterLink} />
					<meta property="og:image" content={FaceBookLink} />
					<meta property="fb:app_id" content="794534664367050" />
				</Helmet>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						marginTop: 60,
						minHeight: 500,
						justifyContent: 'center'
					}}
				>
					<div style={{ margin: 10, display: 'flex' }}>
						<TextField
							style={{ paddingRight: 15 }}
							label="New Password"
							type="password"
							error={setError(password)}
							onChange={e => dispatch(verifyPasswordActions.setPassword(e.target.value))}
							value={password}
						/>
						<TextField
							label="Confirm Password"
							type="password"
							error={setError(confirmPassword)}
							onChange={e =>
								dispatch(verifyPasswordActions.setConfirmPassword(e.target.value))
							}
							value={confirmPassword}
						/>
					</div>
					<Button onClick={submitPasswordChange}>Submit</Button>
				</div>
			</div>
		);
	}

	return (
		<div>
			<Helmet>
				<title>Password Reset Verification | SpeedyMobile</title>
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${process.env.API_URL}/verifyPasswordReset`} />
				<meta
					name="description"
					content="Verify your SpeedyMobile Password Reset Here"
				/>
				<meta property="og:title" content="Password Reset Verification" />
				<meta
					property="og:description"
					content="Verify your SpeedyMobile Password Reset Here"
				/>
				<meta name="twitter:image" content={TwitterLink} />
				<meta property="og:image" content={FaceBookLink} />
				<meta property="fb:app_id" content="794534664367050" />
			</Helmet>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					marginTop: 60,
					minHeight: 500,
					justifyContent: 'center'
				}}
			>
				<Typography>Unable to Verify Password Reset</Typography>
			</div>
		</div>
	);
}
