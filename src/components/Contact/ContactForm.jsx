import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { sendContactForm } from '../../actions/contactActions/contactActions';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		boxShadow: `.1px .7px 3px  `,
		// marginRight:'20%',
		// marginLeft:'20%',
		marginTop: '35px',
		marginBottom: '35px',
		maxWidth: '500px',
		paddingRight: '40px',
		paddingLeft: '40px',
		paddingTop: '30px',
		paddingBottom: '30px',
		backgroundColor: 'white',
		borderBottomLeftRadius: 13,
		borderBottomRightRadius: 13,
		borderTopLeftRadius: 13,
		borderTopRightRadius: 13
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '25ch'
	}
}));

export default function Contact() {
	const classes = useStyles();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [message, setMessage] = useState('');
	const dispatch = useDispatch();

	return (
		<div className={classes.root} align="center">
			<div>
				<p style={{ color: '#313131' }}>
					<h3>Contact Us</h3>
					<br />
					We would love to hear your comments and feedback.
					<br />
					Email us at <a href="mailto:info@speedymobile.ca">info@speedymobile.ca</a>
					<br />
					Call us at <a href="tel:519-563-7953">519-563-7953</a>
					<br />
					or use the form below
				</p>
				<TextField
					// label="Name"
					style={{ marginBottom: 8 }}
					placeholder="Your Name"
					fullWidth
					margin="normal"
					value={name}
					onChange={e => setName(e.target.value)}
					InputLabelProps={{
						shrink: true
					}}
					variant="outlined"
				/>
				<TextField
					// label="Email"
					style={{ marginBottom: 8 }}
					placeholder="Your Email"
					fullWidth
					margin="normal"
					value={email}
					onChange={e => setEmail(e.target.value)}
					InputLabelProps={{
						shrink: true
					}}
					variant="outlined"
				/>
				<TextField
					// label="Phone Number"
					style={{ marginBottom: 8 }}
					placeholder="Your Phone Number (Optional)"
					fullWidth
					margin="normal"
					value={phoneNumber}
					onChange={e => setPhoneNumber(e.target.value)}
					InputLabelProps={{
						shrink: true
					}}
					variant="outlined"
				/>
				<TextField
					// label="Your Message"
					style={{ marginBottom: 28, marginTop: 18 }}
					placeholder="Your Message"
					multiline
					value={message}
					onChange={e => setMessage(e.target.value)}
					fullWidth
					rows={4}
					InputLabelProps={{
						shrink: true
					}}
					variant="outlined"
				/>
				<Button
					onClick={() => dispatch(sendContactForm(name, phoneNumber, email, message))}
					variant="contained"
					fullWidth="true"
				>
					Submit
				</Button>
				<br />
			</div>
		</div>
	);
}
