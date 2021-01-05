import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { verifyEmailActions } from '../actions/verifyEmailActions/verifyEmailActions';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

export default function VerifyEmail() {
	const query = new URLSearchParams(useLocation().search);
	const dispatch = useDispatch();
	const { loading, success } = useSelector(state => state.verifyEmail);
	useEffect(() => {
		if (loading) {
			const id = query.get('bit');
			dispatch(verifyEmailActions.verfiyEmail(id));
		}
	}, []);
	if (loading) {
		return (
			<>
				<Helmet>
					<title>Verify Email | SpeedyMobile</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`${process.env.API_URL}/verify`} />
					<meta name="description" content="Verify your SpeedyMobile Account Here" />
					<meta property="og:title" content="Verify Email" />
					<meta
						property="og:description"
						content="Verify your SpeedyMobile Account Here"
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
						justifyContent: 'center',
						flexDirection: 'column',
						minHeight: 500
					}}
				>
					<CircularProgress color="primary" style={{ top: -60 }} />
				</div>
			</>
		);
	}
	if (success) {
		return (
			<>
				<Helmet>
					<title>Verify Email | SpeedyMobile</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`${process.env.API_URL}/verify`} />
					<meta name="description" content="Verify your SpeedyMobile Account Here" />
					<meta property="og:title" content="Verify Email" />
					<meta
						property="og:description"
						content="Verify your SpeedyMobile Account Here"
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
						justifyContent: 'center',
						minHeight: 500
					}}
				>
					<Typography>Email Successfully Verified!</Typography>
				</div>
			</>
		);
	}

	return (
		<>
			<Helmet>
				<title>Verify Email | SpeedyMobile</title>
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${process.env.API_URL}/verify`} />
				<meta name="description" content="Verify your SpeedyMobile Account Here" />
				<meta property="og:title" content="Verify Email" />
				<meta
					property="og:description"
					content="Verify your SpeedyMobile Account Here"
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
					justifyContent: 'center',
					minHeight: 500
				}}
			>
				<Typography>Unable to Verify Email</Typography>
			</div>
		</>
	);
}
