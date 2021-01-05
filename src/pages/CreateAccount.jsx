import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Prompt } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MaskedInput from 'react-text-mask';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Helmet } from 'react-helmet';
import { createAccountActions } from '../actions/createAccountActions/createAccountActions';
import { createAccount } from '../actions/authActions/auth';
import { messageActions } from '../actions/messageActions/messageActions';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

function upperCasePipe(conformedValue) {
	return conformedValue.toUpperCase();
}

function TextMaskPostalCode(props) {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null);
			}}
			pipe={upperCasePipe}
			guide={false}
			mask={[/[a-z]/i, /\d/, /[a-z]/i, ' ', /\d/, /[a-z]/i, /\d/]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

function renderBirthDate(date) {
	return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export default function AccountSettings() {
	const token = useSelector(state => state.auth.token);
	const {
		address,
		birthDate,
		city,
		email,
		firstName,
		gender,
		lastName,
		postalCode,
		province,
		modified,
		password,
		confirmPassword
	} = useSelector(state => state.createAccount);
	const [missingInfo, setMissingInfo] = useState(false);

	const dispatch = useDispatch();

	const checkEmail = () => {
		if (missingInfo === false) {
			return false;
		}
		const re = /^(([^\s"(),.:;<>@[\]]+(\.[^\s"(),.:;<>@[\]]+)*)|(".+"))@(([^\s"(),.:;<>@[\]]+\.)+[^\s"(),.:;<>@[\]]{2,})$/i;
		if (re.test(email)) {
			return false;
		}
		return true;
	};
	const verifyEmail = () => {
		const re = /^(([^\s"(),.:;<>@[\]]+(\.[^\s"(),.:;<>@[\]]+)*)|(".+"))@(([^\s"(),.:;<>@[\]]+\.)+[^\s"(),.:;<>@[\]]{2,})$/i;
		if (re.test(email)) {
			return false;
		}
		return true;
	};
	const checkLengthError = (value, length) => {
		if (missingInfo === false) {
			return false;
		}
		if (value.length === length) {
			return false;
		}
		return true;
	};
	const setError = value => {
		if (missingInfo === false) {
			return false;
		}
		if (value === '') {
			return true;
		}
		return false;
	};

	const handleDateChange = date => {
		dispatch(createAccountActions.setBirthDate(date));
	};
	let minimumDate = new Date();
	minimumDate = minimumDate.setFullYear(minimumDate.getFullYear() - 18);

	const checkDate = () => {
		if (birthDate > minimumDate) {
			return true;
		}
		return false;
	};
	const passwordCheck = () => {
		if (password === confirmPassword) return false;
		return true;
	};
	const handleSaveButton = () => {
		if (
			firstName === '' ||
			lastName === '' ||
			verifyEmail() ||
			address === '' ||
			city === '' ||
			province === '' ||
			postalCode.length !== 7 ||
			gender === '' ||
			checkDate() ||
			passwordCheck()
		) {
			if (passwordCheck()) {
				dispatch(
					messageActions.setPopup(
						'Passwords do not match, please correct the passwords',
						'warning'
					)
				);
			}
			window.scrollTo(0, 0);
			setMissingInfo(true);
		} else {
			console.log('Success');
			dispatch(createAccount(birthDate));
		}
	};
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<div>
				<Helmet>
					<title>Create Account | SpeedyMobile</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`${process.env.API_URL}/CreateAccount`} />
					<meta
						name="description"
						content="Create your SpeedyMobile Account to quicky compare and purchase the latest plans"
					/>
					<meta property="og:title" content="Create Account" />
					<meta
						property="og:description"
						content="Create your SpeedyMobile Account to quicky compare and purchase the latest plans"
					/>
					<meta name="twitter:image" content={TwitterLink} />
					<meta property="og:image" content={FaceBookLink} />
					<meta property="fb:app_id" content="794534664367050" />
				</Helmet>
				<Prompt
					// put a variable to track when user has unsaved changed
					when={modified}
					message="You have unsaved changes, are you sure you want to leave?"
				/>
				<br />
				<Typography
					align="center"
					style={{
						color: '#313131',
						fontSize: '50px',
						fontFamily: 'Roboto',
						fontWeight: '800'
					}}
				>
					<span
						style={{
							width: '160px',
							borderBottom: '8px solid #49c5b6'
						}}
					>
						Create Account
					</span>
				</Typography>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						marginTop: 60,
						padding: 10
					}}
				>
					<div
						style={{
							paddingTop: 10,
							paddingBottom: 10,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							width: '100%'
						}}
					>
						<TextField
							style={{ paddingRight: 15 }}
							onChange={e => dispatch(createAccountActions.setFirstName(e.target.value))}
							label="First Name"
							error={setError(firstName)}
							value={firstName}
						/>
						<TextField
							label="Last Name"
							onChange={e => dispatch(createAccountActions.setLastName(e.target.value))}
							error={setError(lastName)}
							value={lastName}
						/>
					</div>
					<div
						style={{
							paddingTop: 10,
							paddingBottom: 10,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							width: '100%'
						}}
					>
						<TextField
							style={{ paddingRight: 15 }}
							error={checkEmail()}
							onChange={e => dispatch(createAccountActions.setEmail(e.target.value))}
							label="Email"
							value={email}
						/>
						<TextField
							label="Gender"
							select
							error={setError(gender)}
							SelectProps={{
								native: true
							}}
							onChange={e => dispatch(createAccountActions.setGender(e.target.value))}
							value={gender}
						>
							<option key="" value={null} />
							<option key="Male" value="Male">
								Male
							</option>
							<option key="Female" value="Female">
								Female
							</option>
							<option key="Other" value="Other">
								Other
							</option>
						</TextField>
					</div>
					<div
						style={{
							paddingTop: 10,
							paddingBottom: 10,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							width: '100%'
						}}
					>
						<KeyboardDatePicker
							style={{ marginRight: 10 }}
							autoOk
							clearable
							label="Date of birth"
							maxDateMessage="Must be 18 to make an account"
							value={birthDate}
							placeholder="mm/dd/yyyy"
							onChange={date => handleDateChange(date)}
							format="MM/dd/yyyy"
							maxDate={minimumDate}
						/>
						<TextField
							label="Address"
							error={setError(address)}
							onChange={e => dispatch(createAccountActions.setAddress(e.target.value))}
							value={address}
						/>
					</div>
					<div
						style={{
							paddingTop: 10,
							paddingBottom: 10,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							width: '100%'
						}}
					>
						<TextField
							style={{ paddingRight: 15 }}
							onChange={e => dispatch(createAccountActions.setCity(e.target.value))}
							error={setError(city)}
							label="City"
							value={city}
						/>
						<TextField
							select
							label="Province"
							error={setError(province)}
							SelectProps={{
								native: true
							}}
							onChange={e => dispatch(createAccountActions.setProvince(e.target.value))}
							value={province}
						>
							<option key="" value={null} />
							<option key="Alberta" value="Alberta">
								Alberta
							</option>
							<option key="British Columbia" value="British Columbia">
								British Columbia
							</option>
							<option key="Manitoba" value="Manitoba">
								Manitoba
							</option>
							<option key="New Brunswick" value="New Brunswick">
								New Brunswick
							</option>
							<option key="Newfoundland & Labrador" value="Newfoundland & Labrador">
								Newfoundland & Labrador
							</option>
							<option key="North West Territories" value="North West Territories">
								North West Territories
							</option>
							<option key="Nova Scotia" value="Nova Scotia">
								Nova Scotia
							</option>
							<option key="Nunavut" value="Nunavut">
								Nunavut
							</option>
							<option key="Ontario" value="Ontario">
								Ontario
							</option>
							<option key="Prince Edward Island" value="Prince Edward Island">
								Prince Edward Island
							</option>
							<option key="Quebec" value="Quebec">
								Quebec
							</option>
							<option key="Saskatchewan" value="Saskatchewan">
								Saskatchewan
							</option>
							<option key="Yukon" value="Yukon">
								Yukon
							</option>
						</TextField>
					</div>
					<div
						style={{
							paddingTop: 10,
							paddingBottom: 10,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							width: '100%'
						}}
					>
						<FormControl error={checkLengthError(postalCode, 7)}>
							<InputLabel htmlFor="Postal Code">Postal Code</InputLabel>
							<Input
								inputComponent={TextMaskPostalCode}
								onChange={e =>
									dispatch(createAccountActions.setPostalCode(e.target.value))
								}
								value={postalCode}
							/>
						</FormControl>
					</div>
					<div
						style={{
							paddingTop: 10,
							paddingBottom: 10,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							width: '100%'
						}}
					>
						<TextField
							style={{ paddingRight: 15 }}
							label="Password"
							type="password"
							error={setError(password)}
							onChange={e => dispatch(createAccountActions.setPassword(e.target.value))}
							value={password}
						/>
						<TextField
							label="Confirm Password"
							type="password"
							error={setError(confirmPassword)}
							onChange={e =>
								dispatch(createAccountActions.setConfirmPassword(e.target.value))
							}
							value={confirmPassword}
						/>
					</div>
					<Button onClick={handleSaveButton} style={{ margin: 30 }}>
						Create Account
					</Button>
				</div>
			</div>
		</MuiPickersUtilsProvider>
	);
}
