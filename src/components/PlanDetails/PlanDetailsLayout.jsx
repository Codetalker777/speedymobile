import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Phone from './Phone';
import FinancialInfo from './FinancialInfo';
import PlanDetails from './PlanDetails';

/* This is the main compoenet of the plan details page. It splits it into 3 parts
phone on the left, detials in the middle, financials on the right */
class PlanDetailsLayout extends React.Component {
	render() {
		const { data } = this.props;
		return (
			<Grid
				container
				style={{
					marginTop: '110px',
					marginBottom: '60px',
					paddingRight: '5%',
					paddingLeft: '5%'
				}}
			>
				<Grid item xs={12} sm={12} md={3}>
					<Phone />
				</Grid>

				<Grid item xs={12} sm={12} md={6}>
					<PlanDetails />
				</Grid>

				<Grid item xs={12} sm={12} md={3}>
					<FinancialInfo />
				</Grid>
			</Grid>
		);
	}
}

// redux store
const mapStateToProps = state => {
	return {
		data: state.plan.data
	};
};

export default withRouter(connect(mapStateToProps)(PlanDetailsLayout));
