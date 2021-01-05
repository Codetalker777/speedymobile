import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Carousel } from 'react-responsive-carousel';
import { setColor, setStorage } from '../../actions/planActions/planActions';

/* This holds the Phone details located on the left side on the plan details page
when you select a phone only */

// Styling
const StyledPaper = styled(Paper)({
	background: 'white',
	width: '90%',

	marginLeft: '5%',
	marginRight: '5%',

	marginBottom: '5%',
	// marginTop: "40px",
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
	// alignItems: "center",
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

class DisplayPhone extends React.Component {
	// changing storage size
	handleChangeStorage = event => {
		const { data } = this.props;
		for (let i = 0; i < data[0].storage.length; i++) {
			if (data[0].storage[i].size === event.currentTarget.value) {
				this.props.setStorage(this.props.data[0].storage[i]);
				return;
			}
		}
	};

	// renders the buttons for storage size, highlighting the chosen storage size
	renderStorage = storage => {
		if (storage.size === this.props.storage.size) {
			return (
				<div
					key={storage.size}
					style={{
						border: 2,
						borderColor: '#49c5b6',
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
				key={storage.size}
				disableRipple
				value={storage.size}
				onClick={this.handleChangeStorage}
				style={{
					border: 2,
					borderColor: '#f1f1f1',
					borderStyle: 'solid ',
					margin: 10,
					borderRadius: 5,
					width: 80
				}}
			>
				{storage.size}
			</Button>
		);
	};

	// chooses a color to display based on the color chosen
	renderImage = image => {
		// removed checking image color
		// if (image.includes(this.props.color)) {
		return (
			<div key={image}>
				<img
					style={{ objectFit: 'scale-down' }}
					src={image}
					alt=""
					height="200"
					width="250"
				/>
			</div>
		);
		// }
	};

	// changes color chosen
	handleChange = event => {
		this.props.setColor(event.target.value);
	};

	componentDidMount() {
		const { data, setColor, setStorage, storage, color } = this.props;
		// initial color set to first one in array
		if (!storage && !color) {
			setColor(data[0].color[0].colorName);
			setStorage(this.props.data[0].storage[0]);
		}
	}

	render() {
		const { data, phone, color, storage } = this.props;
		// everything is loaded and set correctly display phone details
		if (storage && color) {
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
							<Typography
								style={{
									fontWeight: 'bold',

									fontWeight: 'bold',
									fontSize: 20,
									textAlign: 'center',
									paddingTop: 10,
									fontFamily: 'Archivo Black',
									color: '#545454'
								}}
							>
								{data[0].phone}
							</Typography>
						</div>

						<div
							style={{
								paddingBottom: '20px'
								// marginBottom:"20px"
							}}
						>
							<Carousel
								showStatus={false}
								showArrows
								showThumbs={false}
								infiniteLoop
								showIndicators
							>
								{data[0].image.map(this.renderImage)}
							</Carousel>
						</div>
					</ImageHolder>

					<ImageHolder>
						<Typography
							style={{
								// marginBottom: 5,
								fontWeight: 'bold',
								fontSize: 20,
								textAlign: 'center',
								paddingTop: '30px',
								fontFamily: 'Archivo Black',
								color: '#545454'
							}}
						>
							Colors
						</Typography>

						<RadioGroup
							value={color}
							onChange={this.handleChange}
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								marginTop: 1,
								flexWrap: 'wrap'
								// width:"90%"
							}}
						>
							{data[0].color.map(function(singleColor, index) {
								return (
									<FormControlLabel
										key={index}
										style={{ margin: 0 }}
										value={singleColor.colorName}
										control={
											<Radio
												style={{ color: singleColor.color }}
												icon={
													<svg height="28" width="28">
														<circle
															cx="50%"
															cy="50%"
															r="11"
															fill={singleColor.color}
															stroke="#aaaaaa"
															strokeWidth={singleColor.color === '#FFFFFF' ? 1 : 0}
														/>
													</svg>
												}
												checkedIcon={
													<svg height="28" width="28">
														<circle
															cx="50%"
															cy="50%"
															r="12"
															stroke="#49c5b6"
															strokeWidth="3"
															fillOpacity="0.0"
														/>
														<circle cx="50%" cy="50%" r="9" fill={singleColor.color} />
													</svg>
												}
											/>
										}
									/>
								);
							})}
						</RadioGroup>

						<div
							style={{
								paddingBottom: '20px'
							}}
						>
							<Typography
								align="center"
								style={{
									// marginBottom: "20px",
									fontWeight: 'bold',
									fontSize: 20,
									textAlign: 'center',
									paddingTop: 10,
									fontFamily: 'Archivo Black',
									color: '#545454'
								}}
							>
								Storage
							</Typography>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									marginTop: 1,
									flexWrap: 'wrap'
								}}
							>
								{data[0].storage.map(this.renderStorage)}
							</div>
						</div>
					</ImageHolder>

					<PhoneSpecs>
						<div
							style={{
								color: '#545454'

								// paddingRight: "10%",
							}}
						>
							<Typography
								style={{
									marginBottom: 7,
									fontWeight: 'bold',
									fontSize: 20,
									// textAlign: "center",
									paddingTop: 10,
									fontFamily: 'Archivo Black',
									color: '#545454',
									paddingLeft: '10%',
									paddingRight: '10%'
								}}
							>
								Details & Specs
							</Typography>
							<br />

							<Typography
								style={{
									marginBottom: 10,
									paddingLeft: '10%'
								}}
							>
								<b>Operating System:</b>
								<br />
								{phone[0] ? phone[0].version : null}
							</Typography>

							<Typography
								style={{
									marginBottom: 10,
									paddingLeft: '10%'
								}}
							>
								<b>Screen Size:</b>
								<br />
								{phone[0] ? phone[0].screenSize : null}
							</Typography>

							<div />
							<Typography
								style={{
									marginBottom: 10,
									paddingLeft: '10%'
								}}
							>
								<b>Screen Resolution:</b>
								<br /> {phone[0] ? phone[0].screenRes : null}
							</Typography>

							<Typography
								style={{
									marginBottom: 10,
									paddingLeft: '10%'
								}}
							>
								<b>Battery:</b>
								<br />
								{phone[0] ? phone[0].battery : null}
							</Typography>

							<Typography
								style={{
									marginBottom: 10,
									paddingLeft: '10%'
								}}
							>
								<b>Internal Storage:</b>
								<br /> {phone[0] ? phone[0].storage : null}
							</Typography>

							<Typography
								style={{
									marginBottom: 20,
									paddingLeft: '10%'
								}}
							>
								<b>Camera:</b>
								<br /> {phone[0] ? phone[0].camera : null}
							</Typography>
						</div>

						<div align="center">
							<ExpansionPanel
								style={{
									borderColor: 'grey',
									// borderStyle: "solid",
									borderTop: 0,
									borderLeft: 0,
									borderRight: 0,
									backgroundColor: '#f7f7f7',
									width: '95%',
									marginBottom: '20px'
								}}
							>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography
										style={{
											// marginBottom: 15,
											fontWeight: 'bold',
											fontSize: 17
											// color:"#545454"
											// textAlign: "center",
											// paddingTop: 10
										}}
									>
										More Details
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails style={{ padding: 0, margin: 0 }}>
									<List>
										<ListItem>
											<Typography>
												Front Camera: {phone[0] ? phone[0].frontCamera : null}
											</Typography>
										</ListItem>
										<ListItem>
											<Typography>CPU: {phone[0] ? phone[0].CPU : null}</Typography>
										</ListItem>
										<ListItem>
											<Typography>GPU: {phone[0] ? phone[0].GPU : null}</Typography>
										</ListItem>
										<ListItem>
											<Typography>
												Memory: {phone[0] ? phone[0].memory : null}
											</Typography>
										</ListItem>
										<ListItem>
											<Typography>
												Weight: {phone[0] ? phone[0].weight : null}
											</Typography>
										</ListItem>
										<ListItem>
											<Typography>
												External Storage: {phone[0] ? phone[0].externalStorage : null}
											</Typography>
										</ListItem>
										<ListItem>
											<Typography>Video: {phone[0] ? phone[0].video : null}</Typography>
										</ListItem>
									</List>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						</div>
					</PhoneSpecs>
				</StyledPaper>
			);
		}
		// wait until everything loads correctly

		return (
			<div style={{ alignItems: 'center' }}>
				<CircularProgress />
			</div>
		);
	}
}

// redux store
const mapStateToProps = state => {
	return {
		data: state.plan.data,
		phone: state.plan.phone,
		color: state.plan.color,
		storage: state.plan.storage
	};
};

// actions
const mapDispatchToProps = dispatch =>
	bindActionCreators({ setStorage, setColor }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayPhone));
