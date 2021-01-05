import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';

import { messageActions } from '../../actions/messageActions/messageActions';
import {
	setSubscribe,
	registerSubscription,
	DeleteSubscription
} from '../../actions/checkoutActions/checkoutActions';
import { addGAEvent } from '../../utils/GoogleAnalytics';

/* This component holds a textfield and button that allows you to subsribe to a mailing list for updates */

class PopupSubcscribe extends React.Component {
	render() {
		const { setSubscribe, registerSubscription, subscribe } = this.props;

		// once you click subscribe it validates the email
		const handleSubscribe = () => {
			if (sendEmailCheck()) {
				registerSubscription();
				this.props.closeDialog();
				this.props.setPopup('Signed up!', 'info');
				addGAEvent(
					'Subscription',
					'New Email Subscription',
					`Added from ${window.location}`
				);
			} else {
				this.props.setPopup('Invalid Email', 'error');
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

		return (
			<DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
				<TextField
					color="secondary"
					variant="filled"
					style={{ margin: 10, width: '100%' }}
					label="Full Name"
				/>

				<TextField
					variant="filled"
					style={{ margin: 10, width: '100%' }}
					label="Email"
					required
					onChange={e => setSubscribe(e.target.value)}
					value={subscribe}
				/>

				<Button onClick={handleSubscribe} color="secondary">
					<Typography
						gutterBottom
						style={{ color: 'white', fontWeight: 500, fontSize: 20 }}
					>
						Sign Up
					</Typography>
				</Button>
				<Typography
					onClick={this.props.closeDialog}
					style={{
						fontSize: 14,
						fontFamily: 'Roboto',
						cursor: 'pointer',
						paddingTop: 10
					}}
				>
					I am not interested
				</Typography>
			</DialogContent>
		);
	}
}

// actions
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{ ...messageActions, registerSubscription, setSubscribe, DeleteSubscription },
		dispatch
	);

// redux variables
const mapStateToProps = state => {
	return {
		subscribe: state.checkout.subscribe,
		subscribeState: state.checkout.subscribeState
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PopupSubcscribe));
