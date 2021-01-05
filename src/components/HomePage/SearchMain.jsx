import React from 'react';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import MediaQuery from 'react-responsive';
import {
	setDataSlider,
	setMessagesSlider,
	setMinutesSlider,
	updateUrl
} from '../../actions/actions/actions';
import {
	setMonthlyCost,
	setUpFrontCost
} from '../../actions/searchActions/searchActions';
import SearchField from './SearchField';

import PositionedPopper from './SliderDetailsHomepage';

/** Needs to refactored to a function to be much cleaner to read */

const styles = {
	div1: {
		flex: 2,
		minWidth: '270px',
		overflow: 'visible',
		// margin: '30px 10px 10px 6px'
		// '@media (min-width:480px)': {
		margin: '70px 10px 10px 6px'

		// }
	},
	div2: {
		flex: 4,
		display: 'flex',
		overflow: 'hidden',
		minWidth: '300px',
		// flexDirection: 'column',
		// marginLeft: '7%',
		// marginRight: '7%'
		// [theme.breakpoints.down('xm')]: {
		flexDirection: 'row',
		marginLeft: 0,
		marginRight: 0
		// }
	}
};

/* Main page search block, allows you to enter data you need to help with the search of plan
contains the sliders, button and search field */

class SearchMain extends React.Component {
	componentDidMount() {
		const {
			dataRequested,
			searchText,
			contractsText,
			searchCriteria,
			tab,
			monthlyCost,
			upFrontCost
		} = this.props;

		this.setURL(
			searchText,
			dataRequested,
			monthlyCost,
			upFrontCost,
			contractsText,
			searchCriteria,
			tab
		);
	}

	componentDidUpdate(prevProps) {
		const {
			dataRequested,
			searchText,
			contractsText,
			searchCriteria,
			tab,
			monthlyCost,
			upFrontCost
		} = this.props;

		if (
			prevProps.searchText !== searchText ||
			prevProps.dataRequested !== dataRequested ||
			prevProps.monthlyCost !== monthlyCost ||
			prevProps.upFrontCost !== upFrontCost ||
			prevProps.contractsText !== contractsText ||
			prevProps.searchCriteria !== searchCriteria ||
			prevProps.tab !== tab
		) {
			this.setURL(
				searchText,
				dataRequested,
				monthlyCost,
				upFrontCost,
				contractsText,
				searchCriteria,
				tab
			);
		}
	}

	// functions that handle the sliders
	handleDataChange = (event, dataValue) => {
		this.props.setDataSlider(dataValue);
	};

	handleMinuteChange = (event, minuteValue) => {
		this.props.setMinutesSlider(minuteValue);
	};

	handleMessageChange = (event, messageValue) => {
		this.props.setMessagesSlider(messageValue);
	};

	handleMonthlyChange = (event, monthlyCost) => {
		this.props.setMonthlyCost(monthlyCost);
	};

	handleUpFrontChange = (event, upFrontCost) => {
		this.props.setUpFrontCost(upFrontCost);
	};

	// functions that handle what message to display based on the slider
	dataDisplay = value => {
		switch (value) {
			case 1:
				return '100 mb';
			case 2:
				return '200 mb';
			case 3:
				return '500 mb';
			case 4:
				return '1 gb';
			case 5:
				return '2 gb';
			case 6:
				return '3 gb';
			case 7:
				return '4 gb';
			case 8:
				return '5 gb';
			case 9:
				return '10 gb';
			case 10:
				return '15 gb';
			case 11:
				return '20 gb';
			case 12:
				return '25 gb';
			default:
				return 'None';
		}
	};

	minuteDisplay = value => {
		switch (value) {
			case 1:
				return '50 mins';
			case 2:
				return '75 mins';
			case 3:
				return '100 mins';
			case 4:
				return '200 mins';
			case 5:
				return 'Unlimited';
			default:
				return '0 mins';
		}
	};

	messageDisplay = value => {
		switch (value) {
			case 1:
				return '50 msgs';
			case 2:
				return '75 msgs';
			case 3:
				return '100 msgs';
			case 4:
				return '200 msgs';
			case 5:
				return 'Unlimited';
			default:
				return '0 msgs';
		}
	};

	// search field label
	label = value => {
		switch (value) {
			case 1:
				return 'Android Search';
			case 2:
				return 'Plan Search';
			default:
				return 'iPhone Search';
		}
	};

	searchType = tab => {
		switch (tab) {
			case 1:
				return 'Android';
			case 2:
				return '';
			default:
				return 'iPhone';
		}
	};

	// sends the data and links to the search result page
	setURL = (phones, data, monthly, upfront, contractsText, searchCriteria, tab) => {
		this.props.updateUrl(
			phones,
			data,
			'Unlimited',
			'Unlimited',
			monthly,
			upfront,
			undefined,
			contractsText,
			searchCriteria,
			1,
			this.searchType(tab)
		);
	};

	render() {
		const {
			dataSlider,
			URL,
			monthlySlider,
			monthlyCost,
			upFrontCost,
			upFrontSlider
		} = this.props;

		const MyLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
		return (
			<div style={{ overflow: 'visible' }}>
				<Divider style={{ marginTop: 20, background: '#49c5b6' }} />
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-evenly',
						flexWrap: 'wrap',
						overflow: 'visible'
					}}
				>
					<MediaQuery maxWidth={479}>
						<div
							style={{
								flex: 2,
								minWidth: '270px',
								overflow: 'visible',
								margin: '30px 10px 10px 6px'
								// '@media (min-width:480px)': {
								// margin: '70px 10px 10px 6px'
							}}
						>
							<SearchField />
						</div>
						<div
							style={{
								flex: 4,
								display: 'flex',
								overflow: 'hidden',
								minWidth: '300px',
								flexDirection: 'column',
								marginLeft: '7%',
								marginRight: '7%'
							}}
						>
							<Box
								style={{
									display: 'flex',
									justifyContent: 'center',
									flexDirection: 'column',
									minWidth: '60px',
									padding: 10,
									margin: 7,
									// width: "20%",
									flex: 1
								}}
							>
								<Box
									style={{
										display: 'flex',
										justifyContent: 'center',
										textAlign: 'center',
										flexDirection: 'row'
									}}
								>
									<PositionedPopper
										label="Cellular Data"
										helperText="Use the slider to adjust the minimum amount of Data you need per month"
									/>
								</Box>
								<Slider
									min={0}
									max={12}
									step={1}
									valueLabelDisplay="auto"
									valueLabelFormat={this.dataDisplay(dataSlider)}
									value={dataSlider}
									onChange={this.handleDataChange}
								/>
							</Box>

							<Box
								style={{
									display: 'flex',
									justifyContent: 'center',
									flexDirection: 'column',
									minWidth: '60px',
									padding: 10,
									margin: 7,
									// width: "20%",
									flex: 1
								}}
							>
								<Box
									style={{
										display: 'flex',
										justifyContent: 'center',
										textAlign: 'center',
										flexDirection: 'row'
									}}
								>
									<PositionedPopper
										label="Monthly Cost"
										helperText={"What's your monthly budget?"}
									/>
								</Box>

								<Slider
									min={0}
									max={9}
									step={1}
									value={monthlySlider}
									valueLabelDisplay="auto"
									valueLabelFormat={isNaN(monthlyCost) ? monthlyCost : `$${monthlyCost}`}
									onChange={this.handleMonthlyChange}
								/>
							</Box>

							<Box
								style={{
									display: 'flex',
									justifyContent: 'center',
									flexDirection: 'column',
									minWidth: '60px',
									padding: 10,
									margin: 7,
									// width: "20%",
									flex: 1
								}}
							>
								<Box
									style={{
										display: 'flex',
										justifyContent: 'center',
										textAlign: 'center',
										flexDirection: 'row'
									}}
								>
									<PositionedPopper
										label="Upfront Cost"
										helperText={
											"The maximum you're willing to pay upfront for your phone with a plan"
										}
									/>
								</Box>

								<Slider
									min={0}
									max={9}
									step={1}
									valueLabelDisplay="auto"
									valueLabelFormat={isNaN(upFrontCost) ? upFrontCost : `$${upFrontCost}`}
									value={upFrontSlider}
									onChange={this.handleUpFrontChange}
								/>
							</Box>
						</div>
					</MediaQuery>
					<MediaQuery minWidth={480}>
						<div
							style={{
								flex: 2,
								minWidth: '270px',
								overflow: 'visible',
								margin: '50px 10px 10px 6px'
							}}
						>
							<SearchField />
						</div>
						<div
							style={{
								flex: 4,
								display: 'flex',
								overflow: 'hidden',
								minWidth: '300px',
								flexDirection: 'row',
								marginLeft: 0,
								marginRight: 0
							}}
						>
							<Box
								style={{
									display: 'flex',
									justifyContent: 'center',
									flexDirection: 'column',
									minWidth: '60px',
									padding: 10,
									margin: 7,
									// width: "20%",
									flex: 1
								}}
							>
								<Box
									style={{
										display: 'flex',
										justifyContent: 'center',
										textAlign: 'center',
										flexDirection: 'row'
									}}
								>
									<PositionedPopper
										label="Cellular Data"
										helperText="Use the slider to adjust the minimum amount of Data you need per month"
									/>
								</Box>
								<Slider
									min={0}
									max={12}
									step={1}
									valueLabelDisplay="auto"
									valueLabelFormat={this.dataDisplay(dataSlider)}
									value={dataSlider}
									onChange={this.handleDataChange}
								/>
							</Box>

							<Box
								style={{
									display: 'flex',
									justifyContent: 'center',
									flexDirection: 'column',
									minWidth: '60px',
									padding: 10,
									margin: 7,
									// width: "20%",
									flex: 1
								}}
							>
								<Box
									style={{
										display: 'flex',
										justifyContent: 'center',
										textAlign: 'center',
										flexDirection: 'row'
									}}
								>
									<PositionedPopper
										label="Monthly Cost"
										helperText={"What's your monthly budget?"}
									/>
								</Box>

								<Slider
									min={0}
									max={9}
									step={1}
									value={monthlySlider}
									valueLabelDisplay="auto"
									valueLabelFormat={isNaN(monthlyCost) ? monthlyCost : `$${monthlyCost}`}
									onChange={this.handleMonthlyChange}
								/>
							</Box>

							<Box
								style={{
									display: 'flex',
									justifyContent: 'center',
									flexDirection: 'column',
									minWidth: '60px',
									padding: 10,
									margin: 7,
									// width: "20%",
									flex: 1
								}}
							>
								<Box
									style={{
										display: 'flex',
										justifyContent: 'center',
										textAlign: 'center',
										flexDirection: 'row'
									}}
								>
									<PositionedPopper
										label="Upfront Cost"
										helperText={
											"The maximum you're willing to pay upfront for your phone with a plan"
										}
									/>
								</Box>

								<Slider
									min={0}
									max={9}
									step={1}
									valueLabelDisplay="auto"
									valueLabelFormat={isNaN(upFrontCost) ? upFrontCost : `$${upFrontCost}`}
									value={upFrontSlider}
									onChange={this.handleUpFrontChange}
								/>
							</Box>
						</div>
					</MediaQuery>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: 20
					}}
				>
					<Button
						component={MyLink}
						to={`/Search?${URL}`}
						style={{
							height: 50,
							width: 200,
							fontSize: '15px'
						}}
					>
						Search
					</Button>
				</div>
			</div>
		);
	}
}

// actions
const mapDispatchToProperties = dispatch =>
	bindActionCreators(
		{
			setDataSlider,
			setMinutesSlider,
			setMessagesSlider,
			updateUrl,
			setMonthlyCost,
			setUpFrontCost
		},
		dispatch
	);

// redux variables
const mapStateToProperties = state => {
	return {
		tab: state.main.tab,
		dataSlider: state.main.dataSlider,
		minutesSlider: state.main.minutesSlider,
		messagesSlider: state.main.messagesSlider,
		searchText: state.main.searchText,
		phones: state.main.phones,
		URL: state.main.URL,
		dataRequested: state.main.dataRequested,
		minutesRequested: state.main.minutesRequested,
		messagesRequested: state.main.messagesRequested,
		contractsText: state.search.contractsText,
		searchCriteria: state.search.searchCriteria,
		monthlySlider: state.search.monthlySlider,
		monthlyCost: state.search.monthlyCost,
		upFrontCost: state.search.upFrontCost,
		upFrontSlider: state.search.upFrontSlider
	};
};

export default withRouter(
	connect(mapStateToProperties, mapDispatchToProperties)(SearchMain)
);
