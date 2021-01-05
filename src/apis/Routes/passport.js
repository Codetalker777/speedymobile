import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';

const Users = mongoose.model('User');

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		(email, password, done) => {
			Users.findOne({ email })
				.then(user => {
					if (!user) {
						return done(null, false, {
							error: 'Email is not valid, please try again'
						});
					}
					if (!user.verified) {
						return done(null, false, {
							error: 'You must verify your email before logging in for the first time'
						});
					}
					if (!user.validatePassword(password)) {
						return done(null, false, { error: 'Incorrect Password, please try again' });
					}

					return done(null, user);
				})
				.catch(done);
		}
	)
);

passport.use(
	'socialLogin',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'email'
		},
		(email, password, done) => {
			Users.findOne({ email })
				.then(user => {
					if (!user) {
						return done(null, false, {
							error: 'Email is not valid, please try again'
						});
					}
					// if (!user.verified) {
					// 	return done(null, false, {
					// 		error: 'You must verify your email before logging in for the first time'
					// 	});
					// }

					done(null, user);
				})
				.catch(done);
		}
	)
);
