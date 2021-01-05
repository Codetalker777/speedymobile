import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Carousel } from 'react-responsive-carousel';
// import './slider.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AdvancedSearchField from '../AdvancedSearchField';
import { setColor, setStorage } from '../../actions/planActions/planActions';

/* This file holds the left most componenet which contains a dropdown for phones and phone information
when you select a plan without a phone */

// styling
const StyledPaper = styled(Paper)({
	background: 'white',
	width: '90%',
	marginLeft: '5%',
	marginRight: '5%',
	marginBottom: '5%',
	marginTop: '15%',
	alignItems: 'center',

	flexDirection: 'row',
	flexGrow: 1,
	boxShadow: `0px 0px 0px`
});

const ImageHolder = styled(Paper)({
	background: 'white',
	width: '100%',
	// borderColor: "grey",
	// borderStyle: "solid",
	// borderTop: 0,
	// borderLeft: 0,
	// borderRight: 0,
	marginBottom: '10px'
});

const PhoneSpecs = styled(Paper)({
	background: 'white',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
	marginBottom: 1
});

const settings = {
	dots: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	draggable: true,
	arrows: true
};

class Phone extends React.Component {
	// change storage size
	handleChangeStorage = event => {
		const { selectedPhone } = this.props;
		for (let i = 0; i < selectedPhone[1].storage.length; i++) {
			if (selectedPhone[1].storage[i].size === event.currentTarget.value) {
				this.props.setStorage(this.props.selectedPhone[1].storage[i]);
				return;
			}
		}
	};

	// display storage options with highlighted option
	renderStorage = storage => {
		if (storage.size === this.props.storage.size) {
			return (
				<div
					style={{
						border: 2,
						borderColor: 'blue',
						borderStyle: 'solid',
						borderRadius: 5,
						margin: 10
					}}
				>
					<Button
						disableRipple
						value={storage.size}
						style={{ width: 76 }}
						onClick={this.handleChangeStorage}
					>
						{storage.size}
					</Button>
				</div>
			);
		}
		return (
			<Button
				disableRipple
				value={storage.size}
				onClick={this.handleChangeStorage}
				style={{
					border: 2,
					borderColor: 'black',
					borderStyle: 'solid',
					margin: 10,
					borderRadius: 5,
					width: 80
				}}
			>
				{storage.size}
			</Button>
		);
	};

	// change color
	handleChange = event => {
		this.props.setColor(event.target.value);
	};

	// display images with the matching color
	renderImage = image => {
		if (!this.props.color) {
			return (
				<div>
					<img
						style={{ objectFit: 'scale-down' }}
						src={image}
						alt=""
						height="200"
						width="250"
					/>
				</div>
			);
		}
		if (image.includes(this.props.color)) {
			return (
				<div>
					<img
						style={{ objectFit: 'scale-down' }}
						src={image}
						alt=""
						height="200"
						width="250"
					/>
				</div>
			);
		}
	};

	componentDidUpdate() {
		const { selectedPhone, setColor, setStorage } = this.props;
		// do not include color or stoarge if a plan has no phone
		if (selectedPhone === null || selectedPhone === [] || selectedPhone.length === 0) {
			setColor(null);
			setStorage(null);
		}
	}

	render() {
		const { data, phonePlan, selectedPhone, phoneChosen, color } = this.props;
		return (
			<StyledPaper>
				<ImageHolder>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column'
						}}
					>
						<Typography style={{ marginBottom: 15, fontWeight: 'bold' }}>
							{phoneChosen !== [] &&
							phoneChosen !== null &&
							phoneChosen.label !== 'No Phone'
								? phoneChosen.value[0]
								: 'Select a phone'}
						</Typography>
						{selectedPhone !== null &&
						selectedPhone !== [] &&
						selectedPhone.length !== 0 ? (
							<Carousel
								showStatus={false}
								showArrows
								showThumbs={false}
								infiniteLoop
								showIndicators
							>
								{selectedPhone[1].image.map(this.renderImage)}
							</Carousel>
						) : (
							<Carousel
								showStatus={false}
								showArrows
								showThumbs={false}
								infiniteLoop
								showIndicators
							>
								{data[0].image.map(this.renderImage)}
							</Carousel>
						)}
					</div>
				</ImageHolder>
				<div>
					<Divider
						style={{
							marginTop: 5,
							marginBottom: 10,
							height: 2,
							backgroundColor: 'black'
						}}
					/>
					<AdvancedSearchField type={3} placeholder="Phones" data={data} />
				</div>

				{selectedPhone !== null && selectedPhone !== [] && selectedPhone.length !== 0 ? (
					<ImageHolder>
						<Typography align="center" style={{ marginTop: 10 }}>
							Colors
						</Typography>
						<RadioGroup
							value={color}
							onChange={this.handleChange}
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								marginTop: 10,
								flexWrap: 'wrap'
							}}
						>
							{selectedPhone[1].color.map(function(singleColor) {
								return (
									<FormControlLabel
										style={{ margin: 0 }}
										value={singleColor.colorName}
										control={
											<Radio
												style={{ color: singleColor.color }}
												icon={
													<svg height="30" width="30">
														<circle
															cx="50%"
															cy="50%"
															r="11"
															fill={singleColor.color}
															stroke="black"
															strokeWidth={singleColor.color === '#FFFFFF' ? 1 : 0}
														/>
													</svg>
												}
												checkedIcon={
													<svg height="30" width="30">
														<circle
															cx="50%"
															cy="50%"
															r="13"
															stroke="blue"
															strokeWidth="2"
															fillOpacity="0.0"
														/>
														<circle cx="50%" cy="50%" r="11" fill={singleColor.color} />
													</svg>
												}
											/>
										}
									/>
								);
							})}
						</RadioGroup>
						<Typography align="center" style={{ marginTop: 10 }}>
							Storage
						</Typography>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								marginTop: 10,
								flexWrap: 'wrap'
							}}
						>
							{selectedPhone[1].storage.map(this.renderStorage)}
						</div>
					</ImageHolder>
				) : null}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column'
					}}
				>
					{selectedPhone !== null &&
					selectedPhone !== [] &&
					selectedPhone.length !== 0 ? (
						<div>
							<PhoneSpecs>
								<Typography style={{ marginBottom: 15, fontWeight: 'bold' }}>
									Phone Specifications:
								</Typography>
								<List>
									<ListItem>
										<Typography>Operating System: {selectedPhone[0].version}</Typography>
									</ListItem>
									<ListItem>
										<Typography>Screen Size: {selectedPhone[0].screenSize}</Typography>
									</ListItem>
									<ListItem>
										<Typography>
											Screen Resolution: {selectedPhone[0].screenRes}
										</Typography>
									</ListItem>
									<ListItem>
										<Typography>Battery: {selectedPhone[0].battery}</Typography>
									</ListItem>
									<ListItem>
										<Typography>Internal Storage: {selectedPhone[0].storage}</Typography>
									</ListItem>
									<ListItem>
										<Typography>Camera: {selectedPhone[0].camera}</Typography>
									</ListItem>
								</List>
							</PhoneSpecs>

							<ExpansionPanel
								style={{
									borderColor: 'grey',
									borderStyle: 'solid',
									borderTop: 0,
									borderLeft: 0,
									borderRight: 0
								}}
							>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography>More Details</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails style={{ padding: 0, margin: 0 }}>
									<List>
										<ListItem>
											<Typography>
												Front Camera: {selectedPhone[0].frontCamera}
											</Typography>
										</ListItem>
										<ListItem>
											<Typography>CPU: {selectedPhone[0].CPU}</Typography>
										</ListItem>
										<ListItem>
											<Typography>GPU: {selectedPhone[0].GPU}</Typography>
										</ListItem>
										<ListItem>
											<Typography>Memory: {selectedPhone[0].memory}</Typography>
										</ListItem>
										<ListItem>
											<Typography>Weight: {selectedPhone[0].weight}</Typography>
										</ListItem>
										<ListItem>
											<Typography>
												External Storage: {selectedPhone[0].externalStorage}
											</Typography>
										</ListItem>
										<ListItem>
											<Typography>Video: {selectedPhone[0].video}</Typography>
										</ListItem>
									</List>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						</div>
					) : null}

					{/* <StyledButton>Add Phone</StyledButton> */}
				</div>
			</StyledPaper>
		);
	}
}

// redux state
const mapStateToProps = state => {
	return {
		data: state.plan.data,
		phone: state.plan.phone,
		phonePlan: state.plan.phonePlan,
		selectedPhone: state.plan.selectedPhone,
		phoneChosen: state.plan.phoneChosen,
		color: state.plan.color,
		storage: state.plan.storage
	};
};

// actions
const mapDispatchToProps = dispatch =>
	bindActionCreators({ setStorage, setColor }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Phone));
