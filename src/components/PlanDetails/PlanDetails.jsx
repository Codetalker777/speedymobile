import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
// import '../fonts.css';
import AddIcon from '@material-ui/icons/Check';

/* Middle compoenet of the plan detials page. It contains text details about the plan */

// Styling
const StyledPaper = styled(Paper)({
	// background: "#f7f7f7",
	// background: "#fcfcfc",
	width: '90%',
	marginLeft: '5%',
	marginRight: '5%',
	marginBottom: '3px',
	// marginTop:"7%",
	// alignItems: "center",
	display: 'flex',
	// flexDirection: "row",
	flexGrow: 1,
	flexDirection: 'column',
	// paddingLeft:"20px",
	paddingTop: '2%'
});

const dataValue = value => {
	if (value === 'Unlimited') {
		return 'Unlimited';
	}
	if (value >= 1000) {
		return value / 1000;
	}
	return value;
};

const dataType = value => {
	if (value === 'Unlimited' || value === 'Pay per use') {
		return '';
	}
	if (value >= 1000) {
		return 'gb';
	}
	return 'mb';
};

const minuteType = value => {
	if (value === 'Unlimited') {
		return '';
	}
	return 'mins';
};

const messageType = value => {
	if (value === 'Unlimited') {
		return '';
	}
	return 'msgs';
};

class PlanDetails extends React.Component {
	// Takes an array and output the text in a list format
	renderList(value) {
		if (value === null || value === undefined) {
			return null;
		}

		if (value.length === 0) {
			return null;
		}
		return (
			<List style={{ padding: 0, margin: 0 }}>
				{value.map(function(item, index) {
					return (
						<ListItem
							key={index}
							style={{
								paddingTop: 0,
								paddingBottom: 0,
								paddingLeft: 0
							}}
						>
							<Typography
								style={{
									// fontSize: 16,
									// fontWeight: "bold",
									// display: "flex",
									// flexDirection: "row",
									// alignItems: "center",
									// paddingBottom: 5
									// paddingLeft:"2%",
									fontFamily: 'Roboto',
									// fontFamily:"Titillium Web",
									color: '#8e8e8e'
								}}
							>
								<AddIcon style={{ color: '#49c5b6' }} />
								{item}
							</Typography>
						</ListItem>
					);
				})}
			</List>
		);
	}

	// expansion panel information is processed here
	renderCategory(value) {
		if (value === null || value === undefined) {
			return null;
		}
		return value.map(function(item, index) {
			return (
				<div key={index}>
					<Typography style={{ fontWeight: 'bold' }}>{item.name}</Typography>
					<Typography style={{ paddingBottom: 5 }}>{item.body}</Typography>
					{item.list !== null ? (
						<List>
							{item.list.map(function(point, index) {
								return (
									<ListItem key={index} style={{ paddingTop: 5, paddingBottom: 5 }}>
										<Typography>{point}</Typography>
									</ListItem>
								);
							})}
						</List>
					) : null}
				</div>
			);
		});
	}

	// any other important plan information is processed here and displayed
	renderImportantCategory(value) {
		if (value === null || value === undefined) {
			return null;
		}
		return value.map(function(item, index) {
			return (
				<div
					key={index}
					style={{
						width: '100%'
					}}
				>
					<div
						style={{
							alignSelf: 'flex-start',
							// paddingLeft: 20,
							// paddingBottom: 10,
							// paddingTop: 10,
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						<br />
						<Typography
							style={{
								fontSize: 14,
								fontWeight: 'bold',
								// display: "flex",
								// flexDirection: "row",
								// alignItems: "center",
								// paddingBottom: 5
								paddingLeft: '5%',
								paddingRight: '5%',
								fontFamily: 'Roboto',
								// fontFamily:"Titillium Web",
								color: '#313131'
							}}
						>
							{item.name}
						</Typography>

						<Typography
							style={{
								// fontSize: 16,
								// fontWeight: "bold",
								// display: "flex",
								// flexDirection: "row",
								// alignItems: "center",
								// paddingBottom: 5
								paddingLeft: '5%',
								paddingRight: '5%',
								fontFamily: 'Roboto',
								// fontFamily:"Titillium Web",
								color: '#8e8e8e'
							}}
						>
							{item.body}
						</Typography>

						{item.list !== null ? (
							<List>
								{item.list.map(function(point) {
									return (
										<ListItem style={{ paddingTop: 5, paddingBottom: 0 }}>
											<Typography>{point}</Typography>
										</ListItem>
									);
								})}
							</List>
						) : null}
					</div>
				</div>
			);
		});
	}

	render() {
		const { data } = this.props;

		return (
			<div
				style={{
					width: '100%'
					// display: "flex",
					// flexDirection: "column",
					// alignItems: "center"
				}}
			>
				<StyledPaper
					style={
						{
							// display: "flex",
							// flexDirection: "column",
							// alignItems: "center"
						}
					}
				>
					<div
						style={{
							// display: "flex",
							// flexDirection: "column",
							// alignItems: "center",
							paddingLeft: '5%',
							paddingBottom: '5px'
						}}
					>
						<img src={data[0].logo} alt="" height="40" />
					</div>

					<Divider style={{ width: '90%', alignSelf: 'center', height: '1px' }} />

					<div align="center">
						{/** *Plan Name** */}
						<Typography
							style={{
								fontSize: 23,
								fontWeight: '600',
								// justifyContent: "left",
								alignContent: 'center',
								alignItems: 'center',
								fontFamily: 'Archivo Black',
								color: '#545454',
								paddingLeft: '5%',
								// border: "3px solid #49c5b6",
								width: '85%'
							}}
						>
							{data[0].name}
							<br />
						</Typography>
						{/** *Plan Name** */}
					</div>

					<Divider style={{ width: '90%', alignSelf: 'center', height: '1px' }} />
					<br />

					{/** *Data** */}
					<div>
						<Typography
							style={{
								fontSize: 14,
								fontWeight: '900',
								// display: "flex",
								// flexDirection: "row",
								// alignItems: "center",
								// paddingBottom: 5
								paddingLeft: '5%',
								fontFamily: 'Roboto',
								// fontFamily:"Titillium Web",
								color: '#313131'
							}}
						>
							Data
						</Typography>

						<div
							style={{
								// fontSize: 16,
								// fontWeight: "100",
								// display: "flex",
								// flexDirection: "row",
								// alignItems: "center",
								// paddingBottom: 5
								paddingLeft: '5%',
								fontFamily: 'Roboto',
								// fontFamily:"Titillium Web",
								color: '#8e8e8e'
							}}
						>
							<AddIcon style={{ color: '#49c5b6' }} />
							{dataValue(data[0].data)} {dataType(data[0].data)}
							<br />
							{this.renderList(data[0].additionalDataInfo)}
						</div>
					</div>
					{/** *Data** */}

					<br />

					{/** *Talk** */}
					<div>
						<Typography
							style={{
								fontSize: 14,
								fontWeight: 'bold',
								// display: "flex",
								// flexDirection: "row",
								// alignItems: "center",
								// paddingBottom: 5
								paddingLeft: '5%',
								fontFamily: 'Roboto',
								// fontFamily:"Titillium Web",
								color: '#313131'
							}}
						>
							Talk
						</Typography>
						<div
							style={{
								// fontSize: 16,
								// fontWeight: "bold",
								// display: "flex",
								// flexDirection: "row",
								// alignItems: "center",
								// paddingBottom: 5
								paddingLeft: '5%',
								fontFamily: 'Roboto',
								// fontFamily:"Titillium Web",
								color: '#8e8e8e'
							}}
						>
							<AddIcon style={{ color: '#49c5b6' }} />
							{data[0].minutes} {minuteType(data[0].minutes)}
							{this.renderList(data[0].additionalMinuteInfo)}
						</div>
					</div>
					<br />
					{/** *Talk** */}

					{/** *Text** */}
					<div>
						<Typography
							style={{
								fontSize: 14,
								fontWeight: 'bold',
								// display: "flex",
								// flexDirection: "row",
								// alignItems: "center",
								// paddingBottom: 5
								paddingLeft: '5%',
								fontFamily: 'Roboto',
								// fontFamily:"Titillium Web",
								color: '#313131'
							}}
						>
							Text
						</Typography>
						<div
							style={{
								// fontSize: 16,
								// fontWeight: "bold",
								// display: "flex",
								// flexDirection: "row",
								// alignItems: "center",
								// paddingBottom: 5
								paddingLeft: '5%',
								fontFamily: 'Roboto',
								// fontFamily:"Titillium Web",
								color: '#8e8e8e'
							}}
						>
							{' '}
							<AddIcon style={{ color: '#49c5b6' }} />
							{data[0].messages}
							{messageType(data[0].messages)}
							<br />
							{this.renderList(data[0].additionalMessageInfo)}
						</div>
					</div>
					{/** *Text** */}

					{/** *Other** */}
					{this.renderImportantCategory(data[0].categories)}
					<br />
					{/** *Other** */}

					<div align="center" />

					{/** *Text** */}

					<div align="center">
						<ExpansionPanel
							align="center"
							style={{
								width: '90%',
								backgroundColor: '#f7f7f7'
								// alignSelf:"center",
								// display: "inlineblock",
								// marginBottom:"1px"
							}}
						>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography
									style={{ fontSize: 18, fontWeight: 'bold', color: '#313131' }}
								>
									Features & Benefits
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								{this.renderList(data[0].features)}
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</div>

					<div align="center">
						<ExpansionPanel
							style={{
								width: '90%',
								marginBottom: '20px',
								backgroundColor: '#f7f7f7'
							}}
						>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography
									style={{ fontSize: 18, fontWeight: 'bold', color: '#313131' }}
								>
									Additonal Information
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails
								style={{
									display: 'flex',
									flexDirection: 'column'
								}}
							>
								{this.renderCategory(data[0].extra)}
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</div>
				</StyledPaper>
				{/** *Features & Benefits** */}

				{/** *Text** */}
			</div>
		);
	}
}

// redux variables
const mapStateToProps = state => {
	return {
		data: state.plan.data
	};
};

export default withRouter(connect(mapStateToProps)(PlanDetails));
