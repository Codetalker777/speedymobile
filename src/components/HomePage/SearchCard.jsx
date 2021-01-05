import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import MediaQuery from 'react-responsive';
import { setTab } from '../../actions/actions/actions';
import SearchMain from './SearchMain';
import PhoneHand from '../../data/images/hand_iPhoneX.png';
import bgi from '../../data/images/bgi.png';

/* This file holds the tab switcher on the main page that allows you to switch
between iphone, android and plan search */

// styling

const StyledCard = {
	height: 'min-content',
	backgroundColor: 'rgba(255, 255, 255, .9)',
	// boxShadow: `1px .25px 5px`,
	alignSelf: 'center',
	minWidth: '320px',
	maxWidth: '800px',
	flex: 1,
	overflow: 'visible',
	borderRadius: 8,
	padding: 5,
	boxShadow: `.5px .25px 3px`
};

// Banner
const StyledPaper = {
	fontFamily: 'Roboto',
	fontWeight: '200',
	fontSize: 'small',
	flexDirection: 'row',
	display: 'flex',
	justifyContent: 'space-evenly',
	flexWrap: 'wrap',
	marginTop: -60,
	paddingTop: 60,
	marginBottom: -20,
	paddingBottom: 50,
	width: '100%',
	overflow: 'visible',
	backgroundImage: `url(${bgi})`,
	backgroundRepeat: 'no-repeat',
	backgroundAttachment: 'fixed',
	backgroundSize: 'cover'
};

class SearchCard extends React.Component {
	// change tab chosen
	handleChange = (event, value) => {
		this.props.setTab(value);
	};

	// output
	render() {
		return (
			<div style={StyledPaper}>
				<MediaQuery maxWidth={480}>
					<img
						src={PhoneHand}
						alt="phone hand"
						style={{
							// max
							width: '100%',
							objectFit: 'scale-down',
							flex: 1,
							// height: '100%',
							// zIndex: '1',
							marginBottom: 5,
							marginTop: 5
						}}
					/>
				</MediaQuery>

				<Card style={StyledCard}>
					<h1
						align="center"
						style={{
							fontFamily: 'Roboto',
							color: '#49c5b6'
						}}
					>
						Shop the best cell phone plans in Canada. Period.
					</h1>
					<CardContent>
						<Tabs
							variant="fullWidth"
							value={this.props.tab}
							indicatorColor="secondary"
							onChange={this.handleChange}
							style={{
								// background: '#49c5b6',
								justifyContent: 'center'
							}}
						>
							<Tab
								label="iPhone"
								style={{
									fontFamily: 'Roboto',
									fontSize: '20px',
									textTransform: 'none'
								}}
							/>
							<Tab
								label="Android"
								style={{
									fontFamily: 'Roboto',
									fontSize: '20px',
									textTransform: 'none'
								}}
							/>
							{/* <Tab
									label="Plans"
									style={{
										fontFamily: 'Roboto',
										fontSize: '18px'
									}}
								/> */}
						</Tabs>

						<SearchMain />
					</CardContent>
				</Card>
			</div>
		);
	}
}

// actions
const mapDispatchToProperties = dispatch => bindActionCreators({ setTab }, dispatch);

// redux store
const mapStateToProperties = state => {
	return {
		tab: state.main.tab
	};
};

export default withRouter(
	connect(mapStateToProperties, mapDispatchToProperties)(SearchCard)
);
