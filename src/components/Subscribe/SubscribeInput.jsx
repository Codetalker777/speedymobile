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

/* This component holds a textfield and button that allows you to subsribe to a mailing list for updates */

class SubscribeInput extends React.Component {
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
			subscribeState
		} = this.props;
		const { initial, loading } = this.state;

		// waiting until a response from the server is made
		const buttonContent = () => {
			if (subscribeState) {
				return (
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center'
						}}
					>
						Subscribed
						<CheckIcon />
					</div>
				);
			}
			if (loading) {
				return <CircularProgress style={{ height: 25, width: 25 }} />;
			}
			return 'Subscribe';
		};

		// once you click subscribe it validates the email
		const handleSubscribe = () => {
			this.setState({ initial: true });

			if (sendEmailCheck()) {
				this.setState({ loading: true });
				registerSubscription();
			} else {
			}
		};

		// email check on sending
		const sendEmailCheck = () => {
			const re = /^(([^\s"(),.:;<>@[\]]+(\.[^\s"(),.:;<>@[\]]+)*)|(".+"))@(([^\s"(),.:;<>@[\]]+\.)+[^\s"(),.:;<>@[\]]{2,})$/i;
			if (re.test(subscribe)) {
				return true;
			}
			return false;
		};
		// email check while typing, no error on first try
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
					flexDirection: 'row',
					alignItems: 'center'
				}}
			>
				<FormControl error={!checkEmail()}>
					<Input
						htmlFor="Subscriber Email"
						placeholder="Email"
						style={{ background: 'white' }}
						onChange={e => setSubscribe(e.target.value)}
						value={subscribe}
					/>
				</FormControl>
				<Button
					disabled={loading}
					style={{
						marginLeft: 10,
						height: '33px'
					}}
					onClick={handleSubscribe}
				>
					{buttonContent()}
				</Button>
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

// redux variables
const mapStateToProps = state => {
	return {
		subscribe: state.checkout.subscribe,
		subscribeState: state.checkout.subscribeState
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubscribeInput));
