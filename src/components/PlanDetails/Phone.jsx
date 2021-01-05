import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import DisplayPhone from './DisplayPhone';
import FindPhone from './FindPhone';
import { getPhonesByPlan } from '../../actions/planActions/planActions';

/* This file gets the plan from the database and then determines whether to d */

class Phone extends React.Component {
	// Get the plan once the page launches
	componentDidMount() {
		const { data } = this.props;
		if (data[0].phone === null) {
			this.props.getPhonesByPlan(data[0].name, data[0].providerName);
		}
	}

	/* DEPRECATED FUNCTION REWRITE IS NEEDED */
	// checks if it should update then downloads the latest plan
	componentDidUpdate(nextProps, nextState) {
		const { data } = this.props;
		if (nextProps.data[0].id !== this.props.data[0].id) {
			if (nextProps.data[0].phone === null) {
				this.props.getPhonesByPlan(
					nextProps.data[0].name,
					nextProps.data[0].providerName
				);
			}
		}
	}

	// if a phone is present in the response from the database, display the phone otherwise display Findphone compoenet
	render() {
		const { data } = this.props;
		if (data[0].phone !== null) {
			return <DisplayPhone />;
		}
		return <FindPhone />;
	}
}

// actions
const mapDispatchToProps = dispatch => bindActionCreators({ getPhonesByPlan }, dispatch);

// redux variables
const mapStateToProps = state => {
	return {
		data: state.plan.data,
		phone: state.plan.phone
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Phone));
