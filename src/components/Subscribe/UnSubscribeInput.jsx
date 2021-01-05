import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';

import {
	setSubscribe,
	registerSubscription,
	DeleteSubscription
} from '../../actions/checkoutActions/checkoutActions';

/* Unsubscribe component that allows users to remove emails from a subscribing list */

// styling
// const theme = createMuiTheme({
// 	overrides: {
// 		MuiInput: {
// 			underline: {
// 				'&:before': {
// 					borderBottom: '1px solid #49c5b6'
// 				},
// 				'&:after': {
// 					borderBottom: `2px solid #000000`
// 				},
// 				'&:hover:not($disabled):not($focused):not($error):before': {
// 					borderBottom: `2px solid #49c5b6`
// 				}
// 			}
// 		}
// 	}
// });

class UnSubscribeInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			initial: false,
			loading: false
		};
	}

	render() {
		const {
			setSubscribe,
			registerSubscription,
			subscribe,
			deleteSub,
			DeleteSubscription,
			unSubscribeState
		} = this.props;
		const { initial, loading } = this.state;

		// updated button to indicate when it is finsihed unsubscribing
		const buttonContent = () => {
			if (unSubscribeState) {
				return (
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center'
						}}
					>
						UnSubscribed
						<CheckIcon />
					</div>
				);
			}
			if (loading) {
				return <CircularProgress style={{ height: 25, width: 25 }} />;
			}
			return 'UnSubscribe';
		};

		//  deletes subscribition if email is valid
		const handleSubscribe = () => {
			this.setState({ initial: true });

			if (sendEmailCheck()) {
				this.setState({ loading: true });
				DeleteSubscription();
			} else {
			}
		};

		// verifies email when sent
		const sendEmailCheck = () => {
			const re = /^(([^\s"(),.:;<>@[\]]+(\.[^\s"(),.:;<>@[\]]+)*)|(".+"))@(([^\s"(),.:;<>@[\]]+\.)+[^\s"(),.:;<>@[\]]{2,})$/i;
			if (re.test(subscribe)) {
				return true;
			}
			return false;
		};
		// checks if email is valid on subsequent tries
		const checkEmail = () => {
			if (initial === false) {
				return true;
			}
			const re = /^(([^\s"(),.:;<>@[\]]+(\.[^\s"(),.:;<>@[\]]+)*)|(".+"))@(([^\s"(),.:;<>@[\]]+\.)+[^\s"(),.:;<>@[\]]{2,})$/i;
			if (re.test(subscribe)) {
				return true;
			}
			return false;
		};
		// output
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				{/* <MuiThemeProvider theme={theme}> */}
				<FormControl error={!checkEmail()}>
					<Input
						htmlFor="Email"
						placeholder="Email"
						style={{ background: 'white' }}
						onChange={e => setSubscribe(e.target.value)}
						value={subscribe}
					/>
				</FormControl>

				<Button
					disabled={loading}
					style={{ backgroundColor: '#49c5b6', marginTop: '20px' }}
					onClick={handleSubscribe}
				>
					{buttonContent()}
				</Button>
				{/* </MuiThemeProvider> */}
			</div>
		);
	}
}

// actions
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{ registerSubscription, setSubscribe, DeleteSubscription },
		dispatch
	);

// redux store
const mapStateToProps = state => {
	return {
		subscribe: state.checkout.subscribe,
		unSubscribeState: state.checkout.unSubscribeState
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(UnSubscribeInput)
);
