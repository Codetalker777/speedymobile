import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import { withCookies } from 'react-cookie';
import TextField from '@material-ui/core/TextField';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Compare from '@material-ui/icons/Compare';
import IconButton from '@material-ui/core/IconButton';
import { addToCompareList } from '../../actions/compareActions/compareActions';
import { addGAEvent } from '../../utils/GoogleAnalytics';
import AddonDialog from './AddOnDialog';
import { messageActions } from '../../actions/messageActions/messageActions';

/* this file holds the right most component on the plan details page, holding all the financial information */

// styling
const StyledPaper = styled(Paper)({
	width: '90%',
	marginLeft: '5%',
	marginRight: '5%',
	marginBottom: '3px',
	display: 'flex',
	flexGrow: 1,
	flexDirection: 'column',
	paddingTop: '2%'
});

const StyledTypography = styled(Typography)({
	fontWeight: 'bold',
	fontSize: 40
});

class FinancialInfo extends React.Component {
	// local variables
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
			added: [],
			upfrontValue: null,
			myTabCharge: 0,
			error: false,
			dialog: false,
			dialogText: '',
			dialogTitle: ''
		};
		// this.handleClose = this.handleClose.bind(this);
	}

	componentDidMount() {
		const { data, selectedPhone, cookies, storage } = this.props;
		// initalizes upfront value on load
		if (data[0].myTab && !selectedPhone) {
			this.setState({ upfrontValue: data[0].upfrontCost });
		} else if (selectedPhone) {
			if (selectedPhone[1].myTab) {
				this.setState({ upfrontValue: selectedPhone[1].upfrontCost });
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { data, selectedPhone, cookies, storage } = this.props;
		if (prevProps.storage) {
			// detected a storage change, update values
			if (data[0].myTab && !selectedPhone && prevProps.storage.size !== storage.size) {
				this.setState({
					upfrontValue: this.upfrontCost(),
					myTabCharge: 0,
					error: false
				});
			} else if (selectedPhone) {
				if (selectedPhone.length) {
					// detected a storage change, update values
					if (selectedPhone[1].myTab && prevProps.storage.size !== storage.size) {
						this.setState({
							upfrontValue: this.upfrontCost(),
							myTabCharge: 0,
							error: false
						});
					}
				}
			}
		}
	}

	// upfront cost calculation
	upfrontCost = () => {
		const { data, selectedPhone, cookies, storage } = this.props;
		if (
			selectedPhone !== null &&
			selectedPhone !== undefined &&
			selectedPhone.length === 2
		) {
			return selectedPhone[1].upfrontCost + storage.cost;
		}
		if (storage === null) {
			return data[0].upfrontCost;
		}
		return data[0].upfrontCost + storage.cost;
	};

	render() {
		const { data, selectedPhone, cookies, storage } = this.props;

		// my tab checking if valid and between given range, otherwise sets error as true
		const handleMyTab = e => {
			if (isNaN(e.target.value)) {
				this.setState({
					error: true,
					upfrontValue: e.target.value
				});
				return;
			}
			if (
				selectedPhone !== null &&
				selectedPhone !== undefined &&
				selectedPhone.length === 2
			) {
				let tab = selectedPhone[1].myTab[storage.size].max - e.target.value;
				tab /= 24;
				if (
					e.target.value > selectedPhone[1].myTab[storage.size].max ||
					e.target.value < selectedPhone[1].myTab[storage.size].min
				) {
					this.setState({
						error: true,
						upfrontValue: e.target.value,
						myTabCharge: tab
					});
				} else {
					this.setState({
						error: false,
						upfrontValue: e.target.value,
						myTabCharge: tab
					});
				}
			} else {
				let tab = data[0].myTab[storage.size].max - e.target.value;
				tab /= 24;
				if (
					e.target.value > data[0].myTab[storage.size].max ||
					e.target.value < data[0].myTab[storage.size].min
				) {
					this.setState({
						error: true,
						upfrontValue: e.target.value,
						myTabCharge: tab
					});
				} else {
					this.setState({
						error: false,
						upfrontValue: e.target.value,
						myTabCharge: tab
					});
				}
			}
		};

		// if my tab is an option, displays upfront cost with a text field and range, otherwise just text
		const renderUpfrontCost = () => {
			if (
				selectedPhone !== null &&
				selectedPhone !== undefined &&
				selectedPhone.length === 2
			) {
				if (selectedPhone[1].myTab) {
					return (
						<ListItem
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%'
							}}
						>
							<div style={{ display: 'flex', flexDirection: 'row' }}>
								<Typography
									align="left"
									style={{ paddingTop: 15, fontSize: 20, marginRight: 10 }}
								>
									Upfront Cost: $
								</Typography>
								<br />

								<TextField
									error={this.state.error}
									onChange={handleMyTab}
									style={{ maxWidth: '30%', resize: { fontSize: 40 } }}
									variant="outlined"
									margin="none"
									value={this.state.upfrontValue}
								/>
							</div>
							<div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
								<Typography
									align="center"
									style={{ paddingTop: 15, fontSize: 12, width: '50%' }}
								>
									Min: ${selectedPhone[1].myTab[storage.size].min}
								</Typography>
								<Typography
									align="center"
									style={{ paddingTop: 15, fontSize: 12, width: '50%' }}
								>
									Max: ${selectedPhone[1].myTab[storage.size].max}
								</Typography>
							</div>
						</ListItem>
					);
				}
				return (
					<ListItem
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%'
						}}
					>
						<Typography
							align="left"
							style={{ width: '100%', paddingTop: 15, fontSize: 20 }}
						>
							Upfront Cost: ${upfrontCost()}
						</Typography>
					</ListItem>
				);
			}
			if (data[0].myTab) {
				return (
					<div align="center">
						<div align="center">
							<Typography
								align="center"
								style={{
									fontSize: 15,
									fontWeight: '600',

									fontFamily: 'Archivo Black',
									color: '#545454',
									paddingBottom: '5px'
									// width:"85%"
								}}
							>
								Upfront Cost:
							</Typography>
						</div>

						<div
							style={{
								fontSize: 15,
								fontWeight: '600',

								fontFamily: 'Archivo Black',
								color: '#545454'
								// paddingLeft: "10%",
								// width:"85%"
							}}
						>
							${' '}
							<TextField
								error={this.state.error}
								onChange={handleMyTab}
								style={{ maxWidth: '30%', resize: { fontSize: 40 } }}
								variant="outlined"
								margin="none"
								value={this.state.upfrontValue}
							/>
						</div>

						<div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
							<Typography
								align="center"
								style={{
									paddingTop: 15,
									fontSize: 12,
									width: '40%',
									paddingLeft: '10%',
									color: '#545454'
								}}
							>
								Min: &nbsp; ${data[0].myTab[storage.size].min}
							</Typography>
							<Typography
								align="center"
								style={{
									paddingTop: 15,
									fontSize: 12,
									width: '40%',
									paddingRight: '10%',
									color: '#545454'
								}}
							>
								Max: &nbsp;${data[0].myTab[storage.size].max}
							</Typography>
						</div>
					</div>
				);
			}
			return (
				<div align="center">
					<Typography
						style={{
							fontSize: 15,
							fontWeight: '600',
							// justifyContent: "left",
							alignContent: 'center',
							alignItems: 'center',
							fontFamily: 'Archivo Black',
							color: '#545454'
							// paddingLeft: "5%",
							// width:"85%"
						}}
					>
						Upfront Cost:
					</Typography>
					<Typography
						style={{
							fontSize: 30,
							fontWeight: '600',
							// justifyContent: "left",
							alignContent: 'center',
							alignItems: 'center',
							fontFamily: 'Archivo Black',
							color: '#545454',
							// paddingLeft: "5%",
							// border: "3px solid #49c5b6",
							// borderBottom: "1px solid #ededed",
							width: '80%',
							paddingBottom: '10px'
						}}
					>
						${upfrontCost()}.00
					</Typography>
				</div>
			);
		};

		// myTab cost display
		const displayMyTab = () => {
			if (
				selectedPhone !== null &&
				selectedPhone !== undefined &&
				selectedPhone.length === 2
			) {
				if (selectedPhone[1].myTab) {
					return (
						<div align="center">
							<Typography
								style={{
									paddingTop: 15,
									fontSize: 15,
									fontFamily: 'Archivo Black',
									fontWeight: 'bold'
								}}
							>
								MyTab Charge: ${this.state.myTabCharge.toFixed(2)}/mth
							</Typography>
						</div>
					);
				}
				return null;
			}
			if (data[0].myTab) {
				return (
					<div align="center">
						<Typography
							style={{
								paddingTop: 15,
								fontSize: 15,
								fontFamily: 'Archivo Black',
								fontWeight: 'bold',
								color: '#545454',
								paddingBottom: '3px'
							}}
						>
							MyTab Charge:
						</Typography>
						<Typography
							style={{
								paddingBottom: '20px',
								// fontSize: 15,
								fontFamily: 'Roboto',
								// fontWeight: "bold",
								color: '#545454'
							}}
						>
							${this.state.myTabCharge.toFixed(2)} per month
						</Typography>
					</div>
				);
			}
			return null;
		};

		// renders addons available for purchase
		const displayAddOns = () => {
			if (!data[0].addOns.length) {
				return null;
			}
			if (
				selectedPhone !== null &&
				selectedPhone !== undefined &&
				selectedPhone.length === 2
			) {
				return (
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<Typography
							align="center"
							style={{
								paddingLeft: '10%',
								paddingTop: 15,
								fontSize: 15,
								fontWeight: 'bold',
								fontFamily: 'Roboto',
								// borderBottom: "1px solid #ededed",
								paddingBottom: '10px',
								width: '80%',
								color: '#545454'
								// marginBottom: 10,
								// fontSize: 15,
							}}
						>
							Add Ons
						</Typography>

						{selectedPhone !== null &&
						selectedPhone !== undefined &&
						selectedPhone.length === 2
							? null
							: null}
						{selectedPhone[1].addOns.map(function returnAddon(addon, index) {
							return (
								<div
									key={index}
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center'
									}}
								>
									<Checkbox
										key={index}
										value={addon.title}
										onChange={handleCheck}
										color="primary"
									/>
									<Typography>{addon.title}</Typography>
									<Typography align="right" style={{ flex: 1, paddingLeft: 10 }}>
										${addon.cost}/mth
									</Typography>
								</div>
							);
						})}
					</div>
				);
			}
			return (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						marginBottom: '20px'
					}}
				>
					<Typography
						align="center"
						style={{
							paddingLeft: '10%',
							paddingTop: 15,
							fontSize: 15,
							fontWeight: 'bold',
							fontFamily: 'Roboto',
							// borderBottom: "1px solid #ededed",
							// paddingBottom: "10px",
							width: '80%',
							color: '#545454'

							// fontSize: 15,
						}}
					>
						Add Ons
					</Typography>

					{selectedPhone !== null &&
					selectedPhone !== undefined &&
					selectedPhone.length === 2
						? null
						: null}
					{data[0].addOns.map(function returnAddons(addon, index) {
						return (
							<div
								key={index}
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									paddingLeft: '5%',
									paddingRight: '5%'
								}}
							>
								<Checkbox
									key={index}
									value={addon.title}
									onChange={handleCheck}
									color="primary"
								/>

								<Typography
									style={{
										paddingTop: 15,
										// fontSize: 18,
										// fontWeight:"bold",
										fontFamily: 'Roboto',
										// borderBottom: "1px solid #ededed",
										paddingBottom: '3px',

										color: '#545454'
										// marginBottom: 10,
										// fontSize: 15,
									}}
								>
									<b>{addon.title}</b>
									<br />${addon.cost} per month
								</Typography>
								<div
									style={{
										flexGrow: 1,
										display: 'flex',
										justifyContent: 'flex-end',
										flex: 1
									}}
								>
									<IconButton value={index} onClick={handleAddonDialog}>
										<InfoIcon />
									</IconButton>
								</div>
							</div>
						);
					})}
				</div>
			);
		};

		// quantity of plan desired
		const setQuantity = e => {
			this.setState({ quantity: e.target.value });
		};
		const handleCompareClick = () => {
			this.props.addToCompareList(
				selectedPhone !== null &&
					selectedPhone !== undefined &&
					selectedPhone.length === 2
					? selectedPhone[1]
					: data[0]
			);
			this.props.setPopup('Added to Compare List!', 'info');
		};

		// checks if there is no error and adds to cart
		const buttonClick = e => {
			if (this.state.error) {
				window.scrollTo(0, 0);
				return;
			}
			if (
				selectedPhone !== null &&
				selectedPhone !== undefined &&
				selectedPhone.length === 2
			) {
				const x = cookies.get('cart');
				if (x !== undefined) {
					if (x.hasOwnProperty(selectedPhone[1].id)) {
						x[selectedPhone[1].id] = {
							quantity: this.state.quantity,
							color: this.props.color,
							storage: this.props.storage,
							addOns: this.state.added,
							tab: selectedPhone[1].myTab ? this.state.myTabCharge : 0
						};
					} else {
						x[selectedPhone[1].id] = {
							quantity: this.state.quantity,
							color: this.props.color,
							storage: this.props.storage,
							addOns: this.state.added,
							tab: selectedPhone[1].myTab ? this.state.myTabCharge : 0
						};
					}
					addGAEvent('Cart', 'Added to Cart', 'Plan Details Page', selectedPhone[1].id);
					cookies.set('cart', JSON.stringify(x), { path: '/' });
				} else {
					const object = {};
					object[selectedPhone[1].id] = {
						quantity: this.state.quantity,
						color: this.props.color,
						storage: this.props.storage,
						addOns: this.state.added,
						tab: selectedPhone[1].myTab ? this.state.myTabCharge : 0
					};
					addGAEvent('Cart', 'Added to Cart', 'Plan Details Page', selectedPhone[1].id);
					cookies.set('cart', JSON.stringify(object), { path: '/' });
				}
			} else {
				const x = cookies.get('cart');
				if (x !== undefined) {
					if (x.hasOwnProperty(data[0].id)) {
						x[data[0].id] = {
							quantity: this.state.quantity,
							color: this.props.color,
							storage: this.props.storage,
							addOns: this.state.added,
							tab: data[0].myTab ? this.state.myTabCharge : 0
						};
					} else {
						x[data[0].id] = {
							quantity: this.state.quantity,
							color: this.props.color,
							storage: this.props.storage,
							addOns: this.state.added,
							tab: data[0].myTab ? this.state.myTabCharge : 0
						};
					}
					addGAEvent('Cart', 'Added to Cart', 'Plan Details Page', data[0].id);
					cookies.set('cart', JSON.stringify(x), { path: '/' });
				} else {
					const object = {};
					object[data[0].id] = {
						quantity: this.state.quantity,
						color: this.props.color,
						storage: this.props.storage,
						addOns: this.state.added,
						tab: data[0].myTab ? this.state.myTabCharge : 0
					};
					addGAEvent('Cart', 'Added to Cart', 'Plan Details Page', data[0].id);
					cookies.set('cart', JSON.stringify(object), { path: '/' });
				}
			}
		};

		// upfront cost calculation
		const upfrontCost = () => {
			if (
				selectedPhone !== null &&
				selectedPhone !== undefined &&
				selectedPhone.length === 2
			) {
				return selectedPhone[1].upfrontCost + storage.cost;
			}
			if (storage === null) {
				return data[0].upfrontCost;
			}
			return data[0].upfrontCost + storage.cost;
		};

		// mytab cost calculation
		const myTabMonthlyCharge = myTab => {
			if (myTab) {
				return this.state.myTabCharge;
			}
			return 0;
		};

		// monthly cost calculaton
		const monthlyCost = () => {
			if (
				selectedPhone !== null &&
				selectedPhone !== undefined &&
				selectedPhone.length === 2 &&
				this.state.added.length
			) {
				let addonCost = 0;
				for (let i = 0; i < this.state.added.length; i++) {
					addonCost += this.state.added[i].cost;
				}
				return (
					selectedPhone[1].monthlyCost +
					addonCost +
					myTabMonthlyCharge(selectedPhone[1].myTab)
				).toFixed(2);
			}
			if (
				selectedPhone !== null &&
				selectedPhone !== undefined &&
				selectedPhone.length === 2 &&
				!this.state.added.length
			) {
				return (
					selectedPhone[1].monthlyCost + myTabMonthlyCharge(selectedPhone[1].myTab)
				).toFixed(2);
			}
			if (this.state.added.length) {
				let addonCost = 0;
				for (let i = 0; i < this.state.added.length; i++) {
					addonCost += this.state.added[i].cost;
				}
				return (
					data[0].monthlyCost +
					addonCost +
					myTabMonthlyCharge(data[0].myTab)
				).toFixed(2);
			}
			return (data[0].monthlyCost + myTabMonthlyCharge(data[0].myTab)).toFixed(2);
		};
		// checks what contract type it is, if mytab exists automatically becomes 2 years, other no contract
		// for all other plans checks what type it is
		const contractCheck = () => {
			if (Math.ceil(this.state.myTabCharge)) {
				return 'Commitment: 2 years';
			}
			if (
				selectedPhone !== null &&
				selectedPhone !== undefined &&
				selectedPhone.length === 2
			) {
				if (selectedPhone[1].type === 'Contract') {
					return `Commitment: ${selectedPhone[1].contractLength / 12} years`;
				}
				return selectedPhone[1].type;
			}
			if (data[0].type === 'Contract') {
				return `Commitment: ${data[0].contractLength / 12} years`;
			}
			return data[0].type;
		};

		const handleCloseDialog = event => {
			this.setState({ dialog: false });
		};
		const handleAddonDialog = e => {
			console.log(e.currentTarget.value);
			if (
				selectedPhone !== null &&
				selectedPhone !== undefined &&
				selectedPhone.length === 2
			) {
			} else {
				console.log(data[0].addOns[e.currentTarget.value].title);
				this.setState({
					dialog: true,
					dialogText: data[0].addOns[e.currentTarget.value].text,
					dialogTitle: data[0].addOns[e.currentTarget.value].title
				});
			}
		};
		// check marks a addon chosen
		const handleCheck = e => {
			if (
				selectedPhone !== null &&
				selectedPhone !== undefined &&
				selectedPhone.length === 2
			) {
				for (let i = 0; i < selectedPhone[1].addOns.length; i++) {
					if (selectedPhone[1].addOns[i].title === e.target.value && e.target.checked) {
						const test = this.state.added;
						test.push(selectedPhone[1].addOns[i]);
						this.setState({ added: test });
						break;
					} else if (
						selectedPhone[1].addOns[i].title === e.target.value &&
						!e.target.checked
					) {
						const test = this.state.added;
						for (let i = 0; i < test.length; i++) {
							if (test[i].title === e.target.value) {
								test.splice(i, 1);
								this.setState({ added: test });
								break;
							}
						}
					}
				}
			} else {
				for (let i = 0; i < data[0].addOns.length; i++) {
					if (data[0].addOns[i].title === e.target.value && e.target.checked) {
						const test = this.state.added;
						test.push(data[0].addOns[i]);
						this.setState({ added: test });
						break;
					} else if (data[0].addOns[i].title === e.target.value && !e.target.checked) {
						const test = this.state.added;
						for (let i = 0; i < test.length; i++) {
							if (test[i].title === e.target.value) {
								test.splice(i, 1);
								this.setState({ added: test });
								break;
							}
						}
					}
				}
			}
		};
		// everything has loaded
		if (storage || data[0].phone === null) {
			return (
				<StyledPaper>
					<AddonDialog
						dialog={this.state.dialog}
						dialogTitle={this.state.dialogTitle}
						dialogText={this.state.dialogText}
						handleCloseDialog={handleCloseDialog}
					/>

					<List>
						{/* ***Monthly Cost*** */}
						<div
							align="center"
							style={{
								paddingTop: '0px',
								paddingBottom: '15px'
							}}
						>
							<Typography
								style={{
									fontSize: 30,
									fontWeight: '600',
									// justifyContent: "left",
									alignContent: 'center',
									alignItems: 'center',
									fontFamily: 'Archivo Black',
									color: '#545454',
									// paddingLeft: "5%",
									// border: "3px solid #49c5b6",
									width: '85%'
								}}
							>
								${monthlyCost()}
							</Typography>
							<Typography
								style={{
									fontSize: 15,
									fontWeight: '600',
									alignContent: 'center',
									alignItems: 'center',
									fontFamily: 'Archivo Black',
									color: '#545454',
									// borderBottom: "1px solid #aaaaaa",
									width: '85%'
								}}
							>
								per month
							</Typography>
						</div>
						{/* ***Monthly Cost*** */}

						<div align="center">
							<div
								style={{
									width: '80%',
									borderBottom: '1px solid #ededed',
									marginBottom: '30px'
								}}
							/>
						</div>

						{/* ***Upfront*** */}
						{renderUpfrontCost()}
						{/* ***Upfront*** */}

						{displayMyTab()}

						<div align="center">
							<Typography
								style={{
									// fontSize: 18,
									fontWeight: 'bold',
									fontFamily: 'Roboto',
									borderTop: '1px solid #ededed',
									borderBottom: '1px solid #ededed',
									marginTop: '15px',
									paddingTop: '15px',
									paddingBottom: '15px',
									width: '80%',
									color: '#545454'
								}}
							>
								{contractCheck()}
							</Typography>
						</div>

						{/* ***Fees*** */}
						<div
							style={{
								paddingTop: 15,
								// fontSize: 15,
								paddingLeft: '10%',
								fontFamily: 'Roboto',
								paddingTop: '30px',
								paddingBottom: '30px',
								width: '60%',
								color: '#545454'
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									paddingBottom: '7px'
								}}
							>
								<div style={{}}>
									<b>Activation Fee:</b>
								</div>
								<div>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
									{selectedPhone !== null &&
									selectedPhone !== undefined &&
									selectedPhone.length === 2
										? selectedPhone[1].activationFee
										: data[0].activationFee}
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									paddingBottom: '7px'
								}}
							>
								<div style={{}}>
									<b>Sim Card Fee:</b>
								</div>
								<div>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
									{selectedPhone !== null &&
									selectedPhone !== undefined &&
									selectedPhone.length === 2
										? selectedPhone[1].simCardFee
										: data[0].simCardFee}
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'row'
									// paddingBottom: "5px",
								}}
							>
								<div style={{}}>
									<b>Store Credit:</b>
								</div>
								<div>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
									{selectedPhone !== null &&
									selectedPhone !== undefined &&
									selectedPhone.length === 2
										? selectedPhone[1].storeCredit
										: data[0].storeCredit}
								</div>
							</div>
						</div>
						{/* ***Fees*** */}

						<div align="center">
							<div
								style={{
									width: '80%',
									borderBottom: '1px solid #ededed',
									marginBottom: '15px'
								}}
							/>
						</div>

						{/* ***Quantity*** */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'row'
							}}
						>
							<Typography
								style={{
									paddingTop: 15,
									paddingRight: 20,
									fontSize: 15,
									paddingLeft: '10%',
									paddingTop: '30px',
									paddingBottom: '30px',
									marginRight: '10px'
								}}
							>
								Quantity:
							</Typography>

							<TextField
								value={this.state.quantity}
								onChange={evt => setQuantity(evt)}
								select
								SelectProps={{
									native: true
								}}
								// margin="90px"
								variant="outlined"
								style={{
									marginLeft: '20px',
									paddingTop: '10px',
									paddingBottom: '10px'
								}}
							>
								<option key={1} value={1}>
									{1}
								</option>
								<option key={2} value={2}>
									{2}
								</option>
								<option key={3} value={3}>
									{3}
								</option>
								<option key={4} value={4}>
									{4}
								</option>
								<option key={5} value={5}>
									{5}
								</option>
								<option key={6} value={6}>
									{6}
								</option>
								))}
							</TextField>
						</div>
						{/* ***Quantity*** */}

						<div align="center">
							<div
								style={{
									width: '80%',
									borderBottom: '1px solid #ededed',
									marginBottom: '20px'
								}}
							/>
						</div>
						<ListItem
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center'
							}}
						>
							<div style={{ width: '100%' }} onClick={buttonClick}>
								<Button
									disabled={this.state.error}
									component={Link}
									to="/Cart"
									style={{
										// color: 'white',
										// background: '#49c5b6',
										height: 50,
										width: '100%',
										fontSize: 20
									}}
								>
									<AddShoppingCartIcon style={{ marginRight: 10 }} />
									Add to Cart
								</Button>
							</div>
						</ListItem>
						<ListItem style={{ justifyContent: 'center' }}>
							<Button
								onClick={handleCompareClick}
								style={{
									color: 'white',
									background: 'grey',
									width: '100%',
									height: 50,
									fontSize: 20
								}}
							>
								<Compare style={{ marginRight: 10 }} />
								MyCompare
							</Button>
						</ListItem>

						{displayAddOns()}
					</List>
				</StyledPaper>
			);
		}
		// still loading

		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center'
				}}
			>
				<CircularProgress style={{ marginTop: 60 }} />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			addToCompareList,
			...messageActions
		},
		dispatch
	);
// redux store
const mapStateToProps = state => {
	return {
		data: state.plan.data,
		selectedPhone: state.plan.selectedPhone,
		storage: state.plan.storage,
		color: state.plan.color
	};
};

export default withRouter(
	withCookies(connect(mapStateToProps, mapDispatchToProps)(FinancialInfo))
);
