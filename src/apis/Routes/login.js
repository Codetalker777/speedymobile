// router setup
import express from 'express';
import { config } from 'dotenv';
import isEmpty from 'is-empty';
import passport from 'passport';
import jwt from 'express-jwt';
import User from '../Schemas/user';
import VerifyUser from '../Schemas/verifyUser';
import './passport';
import emailingService from '../Services/emailingService';

config();
const loginRoute = express.Router();

const getTokenFromHeaders = req => {
	const {
		headers: { authorization }
	} = req;

	if (authorization && authorization.split(' ')[0] === 'Token') {
		return authorization.split(' ')[1];
	}
	return null;
};

const auth = {
	required: jwt({
		secret: 'secret',
		userProperty: 'payload',
		getToken: getTokenFromHeaders,
		algorithms: ['HS256']
	}),
	optional: jwt({
		secret: 'secret',
		userProperty: 'payload',
		getToken: getTokenFromHeaders,
		credentialsRequired: false,
		algorithms: ['HS256']
	})
};

loginRoute.post('/VerifyEmail', auth.optional, (req, res) => {
	const { id, currentTime: timeStamp } = req.body;
	if (isEmpty(id))
		res.json({
			success: false,
			error: 'Invalid link, please click on a valid link in your email'
		});
	VerifyUser.find({ uniqueID: id }).exec((err, verifyObj) => {
		if (err) {
			return res.json({ success: false, error: err });
		}
		if (!verifyObj) {
			res.json({
				success: false,
				error: 'Invalid link, please click on a valid link in your email'
			});
		} else if (new Date(timeStamp) < new Date(verifyObj[0].expiryDate)) {
			res.json({
				success: false,
				error: 'Your activation has expired, please request another one'
			});
		} else if (!verifyObj[0].newUser) {
			res.json({
				success: false,
				error: 'Invalid link, please click on a valid link in your email'
			});
		} else {
			User.findOneAndUpdate(
				{ uniqueID: verifyObj[0].userID },
				{ verified: true },
				{ useFindAndModify: false }
			).exec(err => {
				if (err) {
					return res.json({ success: false, error: err });
				}
				return res.json({ success: true });
			});
		}
	});
});

loginRoute.post('/VerifyResetLink', auth.optional, (req, res) => {
	const { id, currentTime: timeStamp } = req.body;
	if (isEmpty(id))
		res.json({
			success: false,
			error: 'Invalid Link. Please click on the link in your email'
		});
	VerifyUser.find({ uniqueID: id }).exec((err, verifyObj) => {
		if (err) return res.json({ success: false, error: err });
		if (verifyObj.length === 0) {
			return res.json({ success: false, error: 'Email not found' });
		}
		if (new Date(timeStamp) < new Date(verifyObj[0].expiryDate)) {
			res.json({
				success: false,
				error: 'Your Password Reset has expired, please request another one'
			});
		} else if (!verifyObj[0].resetPassword) {
			res.json({
				success: false,
				error: 'Invalid link, please click on a valid link in your email'
			});
		} else {
			User.find({ uniqueID: verifyObj[0].userID }).exec((err, user) => {
				if (err) return res.json({ success: false, error: err });
				if (user.length) return res.json({ success: true, id: user[0].uniqueID });
			});
		}
	});
});

loginRoute.post('/SetNewPassword', auth.optional, (req, res) => {
	const { password, id } = req.body;
	User.findOneAndUpdate(
		{ uniqueID: id },
		{ password: User.setPasswordExternal(password) },
		{ useFindAndModify: false }
	).exec(err => {
		if (err) return res.json({ success: false, error: 'Failed to Reset Password' });
		return res.json({ success: true });
	});
});

loginRoute.post('/SendResetEmail', auth.optional, (req, res) => {
	const { email } = req.body;
	if (isEmpty(email)) res.json({ success: false, error: 'No Email sent' });
	User.find({ email }).exec((err, user) => {
		if (err) return res.json({ success: false, error: err });
		if (user.length === 0) {
			return res.json({ success: false, error: 'Email not found' });
		}
		const verifyNewUser = new VerifyUser({
			userID: user[0].uniqueID,
			resetPassword: true
		});
		verifyNewUser.setUniqueID();
		verifyNewUser.setExpiryDate();
		verifyNewUser
			.save()
			.then(function sendVerificationEmail() {
				const mailOptions = {
					from: '"SpeedyMobile" <info@speedymobile.ca>',
					to: email,
					subject: 'Password Reset',
					html: `<div><p>Please Click on the link below to reset your password</p><a href='https://www.speedymobile.ca/verifyPasswordReset?bit=${verifyNewUser.uniqueID}'>Password Reset</a></div>`
				};
				const response = emailingService.sendMail(mailOptions);
				if (response) {
					return res.json({ success: true });
				}
				return res.json({ success: true, error: 'Email failure' });
			})
			.catch(error => console.error(error));
	});
});

loginRoute.post('/SocialButtonLogin', auth.optional, (req, res, next) => {
	const { email, firstName, lastName, birthDate } = req.body;

	if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(email)) {
		return res.json({ success: false, error: 'Information is Missing' });
	}
	User.find({ email }).exec((err, user) => {
		if (err) {
			return res.json({ success: false, error: err });
		}
		if (user.length) {
			return passport.authenticate(
				'socialLogin',
				{ session: false },
				(err, passportUser, info) => {
					if (err) {
						return next(err);
					}

					if (passportUser) {
						const user = passportUser;
						user.token = passportUser.generateJWT();

						return res.json({ user: user.toAuthJSON(), success: true });
					}

					return res.json({ success: false, error: info.error });
				}
			)(req, res, next);
		}

		const newUser = new User({
			firstName,
			lastName,
			email,
			birthDate
		});

		newUser.setUniqueID();
		newUser
			.save()
			.then(function generateVerification() {
				const verifyNewUser = new VerifyUser({
					userID: newUser.uniqueID,
					newUser: true
				});
				verifyNewUser.setUniqueID();
				verifyNewUser.setExpiryDate();
				verifyNewUser
					.save()
					.then(function sendVerificationEmail() {
						const mailOptions = {
							from: '"SpeedyMobile" <info@speedymobile.ca>',
							to: email,
							subject: 'Welcome to SpeedyMobile',
							html: `   <head>
						      <title>Welcome to Speedy Mobile</title>
						   </head>
						   <body>
						   Hi ${firstName}, <br /><br />  Thank you for creating an account with us. Hope you enjoy finding some of the best deals out there!<br /><br /> Thanks, <br /> The SpeedyMobile Team
						   </body>`
						};
						const response = emailingService.sendMail(mailOptions);
						if (!response) {
							return res.json({ success: true, error: 'Email Failed' });
						}
					})
					.catch(error => console.error(error))

					.then(function Login() {
						return passport.authenticate(
							'socialLogin',
							{ session: false },
							(err, passportUser, info) => {
								if (err) {
									return next(err);
								}

								if (passportUser) {
									const user = passportUser;
									user.token = passportUser.generateJWT();

									return res.json({ user: user.toAuthJSON(), success: true });
								}

								return res.json({ success: false, error: info.error });
							}
						)(req, res, next);
					});
			})
			.catch(error => console.error(error));
	});
});

loginRoute.post('/RegisterAccount', auth.optional, (req, res) => {
	const {
		firstName,
		lastName,
		email,
		password,
		birthDate,
		gender,
		postalCode,
		address,
		city,
		province
	} = req.body;

	if (
		isEmpty(firstName) ||
		isEmpty(lastName) ||
		isEmpty(email) ||
		isEmpty(password) ||
		isEmpty(birthDate)
	) {
		return res.json({ success: false, error: 'Missing Information' });
	}

	User.find({ email }).exec((err, user) => {
		if (err) {
			return res.json({ success: false, error: err });
		}
		if (user.length) {
			return res.json({ success: false, error: 'Email already Exists' });
		}
		const newUser = new User({
			firstName,
			lastName,
			email,
			password,
			birthDate,
			gender,
			postalCode,
			address,
			city,
			province
		});
		newUser.setUniqueID();
		newUser.setPassword(newUser.password);
		newUser
			.save()
			.then(function generateVerification() {
				const verifyNewUser = new VerifyUser({
					userID: newUser.uniqueID,
					newUser: true
				});
				verifyNewUser.setUniqueID();
				verifyNewUser.setExpiryDate();
				verifyNewUser
					.save()
					.then(function sendVerificationEmail() {
						const mailOptions = {
							from: '"SpeedyMobile" <info@speedymobile.ca>',
							to: email,
							subject: 'SpeedyMobile Email Verification',
							html: `<div><p>Thank for creating an account. Please click on the link to verify your account</p><a href='https://www.speedymobile.ca/verify?bit=${verifyNewUser.uniqueID}'>Verify your Account</a></div>`
						};
						const response = emailingService.sendMail(mailOptions);
						if (response) {
							return res.json({ success: true });
						}
						return res.json({ success: true, error: 'Email failure' });
					})
					.catch(error => console.error(error));
			})
			.catch(error => console.error(error));
	});
});

loginRoute.post('/Login', auth.optional, (req, res, next) => {
	const { email, password } = req.body;
	if (isEmpty(email) || isEmpty(password))
		return res.json({ success: false, error: 'Info has not been entered' });
	return passport.authenticate(
		'local',
		{ session: false },
		(err, passportUser, info) => {
			if (err) {
				return next(err);
			}

			if (passportUser) {
				const user = passportUser;
				user.token = passportUser.generateJWT();

				return res.json({ user: user.toAuthJSON(), success: true });
			}

			return res.json({ success: false, error: info.error });
		}
	)(req, res, next);
});

loginRoute.post('/GetUserInfo', auth.required, (req, res) => {
	const jwtToken = req.payload;
	User.aggregate([
		{
			$match: { uniqueID: jwtToken.uniqueID }
		},
		{
			$project: {
				_id: false,
				__v: false,
				locked: false,
				password: false,
				retry: false,
				verified: false,
				uniqueID: false
			}
		}
	]).exec((err, data) => {
		if (err) return res.json({ success: true, error: err });
		return res.json({ success: true, ...data[0] });
	});
});

loginRoute.post('/UpdateUserInfo', auth.required, (req, res) => {
	const jwtToken = req.payload;
	const { userData } = req.body;
	User.findOneAndUpdate(
		{ uniqueID: jwtToken.uniqueID },
		{ ...userData },
		{ useFindAndModify: false }
	).exec(err => {
		if (err) {
			return res.json({ success: false, error: err });
		}
		return res.json({ success: true });
	});
});

export default loginRoute;
