import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { resetPassword } from '../actions/authActions/auth';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

export default function VerifyEmail() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [initial, setInitial] = useState(false);
	const sendEmailCheck = () => {
		const re = /^(([^\s"(),.:;<>@[\]]+(\.[^\s"(),.:;<>@[\]]+)*)|(".+"))@(([^\s"(),.:;<>@[\]]+\.)+[^\s"(),.:;<>@[\]]{2,})$/i;
		if (re.test(email)) {
			return true;
		}
		return false;
	};
	const checkEmail = () => {
		if (initial === false) {
			return true;
		}
		const re = /^(([^\s"(),.:;<>@[\]]+(\.[^\s"(),.:;<>@[\]]+)*)|(".+"))@(([^\s"(),.:;<>@[\]]+\.)+[^\s"(),.:;<>@[\]]{2,})$/i;
		if (re.test(email)) {
			return true;
		}
		return false;
	};
	const handleSubscribe = () => {
		setInitial(true);

		if (sendEmailCheck()) {
			dispatch(resetPassword(email));
		}
	};
	return (
		<div>
			<Helmet>
				<title>Reset Password | SpeedyMobile</title>
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${process.env.API_URL}/ResetPassword`} />
				<meta
					name="description"
					content="Reset your SpeedyMobile account password here"
				/>
				<meta property="og:title" content="Reset Password" />
				<meta
					property="og:description"
					content="Reset your SpeedyMobile account password here"
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
					minHeight: 500,
					justifyContent: 'center'
				}}
			>
				<Typography style={{ marginBottom: 20 }}>
					Please enter your email to reset your password
				</Typography>
				<div>
					<FormControl error={!checkEmail()}>
						<Input
							htmlFor="Email"
							placeholder="Email"
							style={{ background: 'white' }}
							onChange={e => setEmail(e.target.value)}
							value={email}
						/>
					</FormControl>
					<Button
						style={{
							backgroundColor: '#49c5b6',
							marginLeft: 10,
							height: '33px'
						}}
						onClick={handleSubscribe}
					>
						Submit
					</Button>
				</div>
			</div>
		</div>
	);
}
