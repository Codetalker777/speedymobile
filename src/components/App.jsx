import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import routes from '../routes';
import Messages from './Messaging/MessageContainer';
import { messageActions } from '../actions/messageActions/messageActions';
import NavBar from './TopNavigation/NavigationBar/NavBar';
import FooterPage from './BottomNavigation/Footer';

export default () => {
	const [cookies] = useCookies(['tocCookie']);
	const dispatch = useDispatch();
	if (!cookies.tocCookie) {
		dispatch(
			messageActions.setPopup(
				'By using this website you agree to the terms and services',
				'info'
			)
		);
	}
	return (
		<>
			<Messages />
			<NavBar />
			<Switch>
				{routes.map((route, idx) => (
					<Route exact key={idx} {...route} />
				))}
			</Switch>
			<FooterPage />
		</>
	);
};
