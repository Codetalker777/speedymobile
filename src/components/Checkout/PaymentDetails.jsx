import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';

import MaskedInput from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import NativeSelect from '@material-ui/core/NativeSelect';
import valid from 'card-validator';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
import { addGAEvent } from '../../utils/GoogleAnalytics';
import {
	setPersonalName,
	setLastName,
	setEmail,
	setPhoneNumber,
	setAddress,
	setCity,
	setProvince,
	setPostalCode,
	setBillPersonalName,
	setBillLastName,
	setBillAddress,
	setBillCity,
	setBillProvince,
	setBillPostalCode,
	setCardNumber,
	setSecurityCode,
	setExpirationMonth,
	setExpirationYear,
	setSameAsAbove
} from '../../actions/checkoutActions/checkoutActions';

// import '../fonts.css';

/* First page of the checkout flow, presents a form that asks for all of the customer's information */

// limits credit card expiry to 19 years from current year
function getYears() {
	const year = new Date().getFullYear();

	const x = [];
	for (let i = year; i < year + 19; i++) {
		x.push(i);
	}
	return x;
}

// converts all input to uppercase
function upperCasePipe(conformedValue) {
	return conformedValue.toUpperCase();
}

// ensures correct formatting of security code
function TextMaskSecurityCode(props) {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null);
			}}
			guide={false}
			mask={[/\d/, /\d/, /\d/, /\d/]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

// ensures correct formatting of phone number
function TextMaskPhoneNumber(props) {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null);
			}}
			guide={false}
			mask={[
				'(',
				/[1-9]/,
				/\d/,
				/\d/,
				')',
				' ',
				/\d/,
				/\d/,
				/\d/,
				'-',
				/\d/,
				/\d/,
				/\d/,
				/\d/
			]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

// ensures correct formatting of email
function TextMaskEmail(props) {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null);
			}}
			guide={false}
			mask={emailMask}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

// ensures correct formatting of postal code
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

// ensures correct formatting of postal code
function TextMaskCardNumber(props) {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null);
			}}
			guide={false}
			mask={[
				/\d/,
				/\d/,
				/\d/,
				/\d/,
				' ',
				/\d/,
				/\d/,
				/\d/,
				/\d/,
				' ',
				/\d/,
				/\d/,
				/\d/,
				/\d/,
				' ',
				/\d/,
				/\d/,
				/\d/,
				/\d/
			]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

class PaymentDetails extends React.Component {
	// missingInfo is true if any info is missing, same makes billing and shipping the same
	constructor(props) {
		super(props);
		this.state = {
			missingInfo: false,
			same: false,
			years: []
		};
	}

	// sets same variable to opposite of what it currently is
	handleCheck = () => {
		this.setState({ same: !this.state.same });
	};

	// sets the years variable before rendering
	componentWillMount() {
		this.setState({ years: getYears() });
	}

	render() {
		const {
			firstName,
			lastName,
			email,
			phoneNumber,
			address,
			city,
			province,
			postalCode,
			billingFirstName,
			billingLastName,
			billingAddress,
			billingCity,
			billingProvince,
			billingPostalCode,
			cardNumber,
			securityCode,
			expirationMonth,
			expirationYear,
			setPersonalName,
			setLastName,
			setEmail,
			setPhoneNumber,
			setAddress,
			setCity,
			setProvince,
			setPostalCode,
			setBillPersonalName,
			setBillLastName,
			setBillAddress,
			setBillCity,
			setBillProvince,
			setBillPostalCode,
			setCardNumber,
			setSecurityCode,
			setExpirationMonth,
			setExpirationYear,
			setSameAsAbove,
			handleNext,
			handleBack
		} = this.props;
		const { missingInfo, same, years } = this.state;

		// move to next page, checks all fields to ensure they are valid
		const handleNextButton = () => {
			if (same) {
				if (
					firstName === '' ||
					lastName === '' ||
					checkEmail() ||
					phoneNumber.length !== 14 ||
					address === '' ||
					city === '' ||
					province === '' ||
					postalCode.length !== 7 ||
					!valid.number(cardNumber).isValid ||
					!valid.expirationDate(`${expirationMonth} ${expirationYear}`) ||
					checkForCVV()
				) {
					window.scrollTo(0, 0);
					this.setState({ missingInfo: true });
					// uncomment for debugging
					// handleNext();
				} else {
					this.setState({ missingInfo: false });
					setSameAsAbove(firstName, lastName, address, city, province, postalCode);
					addGAEvent('Checkout', 'Completed Payment Details', 'Payment Information');
					handleNext();
				}
			} else if (
				firstName === '' ||
				lastName === '' ||
				checkEmail() ||
				phoneNumber.length !== 14 ||
				address === '' ||
				city === '' ||
				province === '' ||
				postalCode.length !== 7 ||
				!valid.number(cardNumber).isValid ||
				!valid.expirationDate(`${expirationMonth} ${expirationYear}`) ||
				checkForCVV() ||
				billingFirstName === '' ||
				billingLastName === '' ||
				billingAddress === '' ||
				billingCity === '' ||
				billingProvince === '' ||
				billingPostalCode.length !== 7
			) {
				window.scrollTo(0, 0);
				this.setState({ missingInfo: true });

				// uncomment for debugging
				// handleNext();
			} else {
				this.setState({ missingInfo: false });
				addGAEvent('Checkout', 'Completed Payment Details', 'Payment Information');
				handleNext();
			}
		};

		// ensures security code is valid for card entered
		const checkForCVV = () => {
			const numberValidation = valid.number(cardNumber);
			if (numberValidation.card === null) {
				return true;
			}
			const validation = valid.cvv(securityCode, numberValidation.card.code.size);
			if (validation.isValid) {
				return false;
			}
			return true;
		};
		// checks to ensure field is not empty
		const setError = value => {
			if (missingInfo === false) {
				return false;
			}
			if (value === '') {
				return true;
			}
			return false;
		};

		// ensures the length is what it is supposed to be
		const checkLengthError = (value, length) => {
			if (missingInfo === false) {
				return false;
			}
			if (value.length === length) {
				return false;
			}
			return true;
		};

		// ensures the credit card entered is valid
		const checkCard = value => {
			if (missingInfo === false) {
				return false;
			}
			const numberValidation = valid.number(value);
			if (numberValidation.isValid) {
				return false;
			}
			return true;
		};

		// ensures that the expiration date entered is valid
		const checkExpiration = (month, year) => {
			if (missingInfo === false) {
				return false;
			}
			const validation = valid.expirationDate(`${month} ${year}`);
			if (validation.isValid) {
				return false;
			}
			return true;
		};

		// ensures the security code entered is valid
		const checkSecurityCode = value => {
			if (missingInfo === false) {
				return false;
			}
			const numberValidation = valid.number(cardNumber);
			if (numberValidation.card === null) {
				return true;
			}
			const validation = valid.cvv(value, numberValidation.card.code.size);
			if (validation.isValid) {
				return false;
			}
			return true;
		};

		// ensures that the email entered is valid
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
		// output
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					marginBottom: 30,
					justifyContent: 'center',
					flexWrap: 'wrap'
				}}
			>
				<Paper
					style={{
						width: '390px',
						paddingLeft: '20px',
						paddingRight: '20px',
						paddingBottom: '20px',
						paddingTop: '20px'
					}}
				>
					{missingInfo ? (
						<Typography
							style={{
								marginRight: 30,
								marginBottom: 30,
								fontWeight: 'bold',
								flex: 1,
								color: 'red'
							}}
							align="right"
						>
							Please Correct Fields in Red
						</Typography>
					) : null}

					<Typography style={{ marginBottom: 10 }} align="center">
						Your Details
					</Typography>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center'
						}}
					>
						<FormControl style={{ marginRight: 15 }} error={setError(firstName)}>
							<InputLabel htmlFor="First Name">First Name *</InputLabel>
							<Input onChange={e => setPersonalName(e.target.value)} value={firstName} />
						</FormControl>
						<FormControl error={setError(lastName)}>
							<InputLabel htmlFor="Last Name">Last Name *</InputLabel>
							<Input onChange={e => setLastName(e.target.value)} value={lastName} />
						</FormControl>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center'
						}}
					>
						<FormControl style={{ marginRight: 15 }} error={checkEmail()}>
							<InputLabel htmlFor="Email">Email *</InputLabel>
							<Input
								inputComponent={TextMaskEmail}
								onChange={e => setEmail(e.target.value)}
								value={email}
							/>
						</FormControl>
						<FormControl error={checkLengthError(phoneNumber, 14)}>
							<InputLabel htmlFor="Phone Number">Phone Number *</InputLabel>
							<Input
								inputComponent={TextMaskPhoneNumber}
								onChange={e => setPhoneNumber(e.target.value)}
								value={phoneNumber}
							/>
						</FormControl>
					</div>
					<Typography style={{ marginBottom: 10, marginTop: 30 }} align="center">
						Shipping Details
					</Typography>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center'
						}}
					>
						<TextField
							style={{ paddingRight: 15 }}
							label="Address"
							required
							error={setError(address)}
							onChange={e => setAddress(e.target.value)}
							value={address}
						/>
						<TextField
							label="City"
							required
							error={setError(city)}
							onChange={e => setCity(e.target.value)}
							value={city}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center'
						}}
					>
						{/* Currently this is hard coded, rewrite is needed to be able to dynamically change this
          based on country */}
						<TextField
							select
							required
							error={setError(province)}
							style={{ marginRight: 15 }}
							label="Province"
							onChange={e => setProvince(e.target.value)}
							value={province}
							SelectProps={{
								native: true
							}}
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
							))}
						</TextField>
						<FormControl error={checkLengthError(postalCode, 7)}>
							<InputLabel htmlFor="Postal Code">Postal Code *</InputLabel>
							<Input
								inputComponent={TextMaskPostalCode}
								onChange={e => setPostalCode(e.target.value)}
								value={postalCode}
							/>
						</FormControl>
					</div>
					<Typography style={{ marginBottom: 10, marginTop: 30 }} align="center">
						Billing Details
					</Typography>
					{same ? null : (
						<div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center'
								}}
							>
								<TextField
									style={{ paddingRight: 15 }}
									label="First Name"
									required
									error={setError(billingFirstName)}
									onChange={e => setBillPersonalName(e.target.value)}
									value={billingFirstName}
								/>
								<TextField
									label="Last Name"
									required
									error={setError(billingLastName)}
									onChange={e => setBillLastName(e.target.value)}
									value={billingLastName}
								/>
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center'
								}}
							>
								<TextField
									style={{ paddingRight: 15 }}
									label="Address"
									required
									error={setError(billingAddress)}
									onChange={e => setBillAddress(e.target.value)}
									value={billingAddress}
								/>
								<TextField
									label="City"
									required
									error={setError(billingCity)}
									onChange={e => setBillCity(e.target.value)}
									value={billingCity}
								/>
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center'
								}}
							>
								<TextField
									select
									required
									error={setError(billingProvince)}
									style={{ marginRight: 15 }}
									label="Province"
									onChange={e => setBillProvince(e.target.value)}
									value={billingProvince}
									SelectProps={{
										native: true
									}}
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
									))}
								</TextField>
								<FormControl error={checkLengthError(billingPostalCode, 7)}>
									<InputLabel htmlFor="Postal Code">Postal Code *</InputLabel>
									<Input
										inputComponent={TextMaskPostalCode}
										onChange={e => setBillPostalCode(e.target.value)}
										value={billingPostalCode}
									/>
								</FormControl>
							</div>
						</div>
					)}

					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center'
						}}
					>
						<FormControlLabel
							control={
								<Checkbox checked={same} onChange={this.handleCheck} color="primary" />
							}
							label="Same as Above"
						/>
					</div>
					<Typography style={{ marginBottom: 10, marginTop: 30 }} align="center">
						Card Details
					</Typography>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center'
						}}
					>
						<FormControl
							style={{ paddingRight: 15, width: '200px' }}
							error={checkCard(cardNumber)}
						>
							<InputLabel htmlFor="Card Number">Card Number *</InputLabel>
							<Input
								inputComponent={TextMaskCardNumber}
								onChange={e => setCardNumber(e.target.value)}
								value={cardNumber}
							/>
						</FormControl>

						<FormControl
							style={{ paddingRight: 15 }}
							error={checkExpiration(expirationMonth, expirationYear)}
						>
							<InputLabel htmlFor="Expiration Date">Expiration Date *</InputLabel>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									paddingTop: 15
								}}
							>
								<NativeSelect
									onChange={e => setExpirationMonth(e.target.value)}
									value={expirationMonth}
								>
									<option key="" value={null}>
										MM
									</option>
									<option key="01" value="01">
										01
									</option>
									<option key="02" value="02">
										02
									</option>
									<option key="03" value="03">
										03
									</option>
									<option key="04" value="04">
										04
									</option>
									<option key="05" value="05">
										05
									</option>
									<option key="06" value="06">
										06
									</option>
									<option key="07" value="07">
										07
									</option>
									<option key="08" value="08">
										08
									</option>
									<option key="09" value="09">
										09
									</option>
									<option key="10" value="10">
										10
									</option>
									<option key="11" value="11">
										11
									</option>
									<option key="12" value="12">
										12
									</option>
								</NativeSelect>
								<NativeSelect
									onChange={e => setExpirationYear(e.target.value)}
									value={expirationYear}
								>
									<option key="" value={null}>
										YYYY
									</option>
									{years.map(function(year) {
										return (
											<option key={year} value={year}>
												{year}
											</option>
										);
									})}
								</NativeSelect>
							</div>
						</FormControl>
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center'
						}}
					>
						<FormControl
							error={checkSecurityCode(securityCode)}
							style={{ width: '120px' }}
						>
							<InputLabel htmlFor="Security Code">Security Code *</InputLabel>
							<Input
								inputComponent={TextMaskSecurityCode}
								onChange={e => setSecurityCode(e.target.value)}
								value={securityCode}
							/>
						</FormControl>
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							marginTop: 30
						}}
					>
						<Button
							style={{
								// backgroundColor: '#49c5b6',
								// color: 'white',
								fontFamily: 'Roboto'
							}}
							component={Link}
							to="/Cart"
						>
							Back
						</Button>

						<Button
							style={{
								// backgroundColor: '#49c5b6',
								// color: 'white',
								fontFamily: 'Roboto',
								marginLeft: 15
							}}
							onClick={handleNextButton}
						>
							Next
						</Button>
					</div>
				</Paper>
			</div>
		);
	}
}

// actions
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			setPersonalName,
			setLastName,
			setEmail,
			setPhoneNumber,
			setAddress,
			setCity,
			setProvince,
			setPostalCode,
			setBillPersonalName,
			setBillLastName,
			setBillAddress,
			setBillCity,
			setBillProvince,
			setBillPostalCode,
			setCardNumber,
			setSecurityCode,
			setExpirationMonth,
			setExpirationYear,
			setSameAsAbove
		},
		dispatch
	);

// redux state variables
const mapStateToProps = state => {
	return {
		firstName: state.checkout.firstName,
		lastName: state.checkout.lastName,
		email: state.checkout.email,
		phoneNumber: state.checkout.phoneNumber,
		address: state.checkout.address,
		city: state.checkout.city,
		province: state.checkout.province,
		postalCode: state.checkout.postalCode,
		billingFirstName: state.checkout.billingFirstName,
		billingLastName: state.checkout.billingLastName,
		billingAddress: state.checkout.billingAddress,
		billingCity: state.checkout.billingCity,
		billingProvince: state.checkout.billingProvince,
		billingPostalCode: state.checkout.billingPostalCode,
		cardNumber: state.checkout.cardNumber,
		securityCode: state.checkout.securityCode,
		expirationMonth: state.checkout.expirationMonth,
		expirationYear: state.checkout.expirationYear
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);
