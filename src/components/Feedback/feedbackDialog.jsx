import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector, useDispatch } from 'react-redux';
import SubscribeInput from '../Subscribe/SubscribeInput';
import {
	sendFeedBack,
	changeValue,
	changeMissing,
	changeRecommend,
	changeDevelopment
} from '../../actions/feedbackActions/feedbackActions';

export default function ScrollDialog(data) {
	const feedbackState = useSelector(state => state.feedback);
	const dispatch = useDispatch();
	const { valueNextPurchase, somethingmissing, recommend, development } = feedbackState;
	function handleClose() {
		data.closeDialog();
	}
	function handleSubmit() {
		dispatch(sendFeedBack());
		handleClose();
	}

	if (data.showDialog) {
		return (
			<Dialog
				open
				fullScreen={false}
				onClose={handleClose}
				scroll="paper"
				aria-labelledby="scroll-dialog-title"
			>
				<DialogTitle id="scroll-dialog-title">We crave your feedback!</DialogTitle>
				<DialogContent>
					<Typography>
						On a scale of 1 to 10 how valuable do you see this website being in your next
						purchase?
					</Typography>
					<RadioGroup
						value={valueNextPurchase}
						onChange={event => dispatch(changeValue(event.target.value))}
						name="Value on next Purchase"
						style={{ flexDirection: 'row', justifyContent: 'center' }}
					>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="1"
							control={<Radio color="primary" />}
							label="1"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="2"
							control={<Radio color="primary" />}
							label="2"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="3"
							control={<Radio color="primary" />}
							label="3"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="4"
							control={<Radio color="primary" />}
							label="4"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="5"
							control={<Radio color="primary" />}
							label="5"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="6"
							control={<Radio color="primary" />}
							label="6"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="7"
							control={<Radio color="primary" />}
							label="7"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="8"
							control={<Radio color="primary" />}
							label="8"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="9"
							control={<Radio color="primary" />}
							label="9"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="10"
							control={<Radio color="primary" />}
							label="10"
							labelPlacement="bottom"
						/>
					</RadioGroup>
					<Typography style={{ marginTop: 10 }}>
						Do you feel there is something missing? If so what would add value to your
						experience on this website?
					</Typography>
					<TextField
						value={somethingmissing}
						onChange={event => dispatch(changeMissing(event.target.value))}
						style={{ marginTop: 10 }}
						fullWidth
						placeholder="Enter text here"
						multiline
						rows={4}
						rowsMax={4}
						variant="outlined"
					/>
					<Typography style={{ marginTop: 10 }}>
						How likely are you to recommend/share this to a friend?
					</Typography>
					<RadioGroup
						value={recommend}
						onChange={event => dispatch(changeRecommend(event.target.value))}
						name="Recommend to friend"
						style={{ flexDirection: 'row', justifyContent: 'center' }}
					>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="1"
							control={<Radio color="primary" />}
							label="1"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="2"
							control={<Radio color="primary" />}
							label="2"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="3"
							control={<Radio color="primary" />}
							label="3"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="4"
							control={<Radio color="primary" />}
							label="4"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="5"
							control={<Radio color="primary" />}
							label="5"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="6"
							control={<Radio color="primary" />}
							label="6"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="7"
							control={<Radio color="primary" />}
							label="7"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="8"
							control={<Radio color="primary" />}
							label="8"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="9"
							control={<Radio color="primary" />}
							label="9"
							labelPlacement="bottom"
						/>
						<FormControlLabel
							style={{ marginLeft: 0, marginRight: 0 }}
							value="10"
							control={<Radio color="primary" />}
							label="10"
							labelPlacement="bottom"
						/>
					</RadioGroup>
					<Typography style={{ marginTop: 10 }}>
						Anything else you would like to contribute to our development?
					</Typography>
					<TextField
						value={development}
						onChange={event => dispatch(changeDevelopment(event.target.value))}
						style={{ marginTop: 10 }}
						fullWidth
						placeholder="Enter text here"
						multiline
						rows={4}
						rowsMax={4}
						variant="outlined"
					/>
					<Typography style={{ marginTop: 10 }}>
						Subscribe to follow latest developments
					</Typography>
					<div
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							marginTop: 10
						}}
					>
						<SubscribeInput />
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleSubmit}>Submit</Button>
				</DialogActions>
			</Dialog>
		);
	}

	return null;
}
