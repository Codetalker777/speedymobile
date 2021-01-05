import React from 'react';
import { Badge, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useCookies } from 'react-cookie';
import { CartType } from '../../../utils/dataTypes';
import TestID from '../../../Test/TestId';

const Quantity = (object?: CartType): number => {
	let sum = 0;
	if (!object) return 0;
	const values = Object.values(object.phones).concat(Object.values(object.plans));
	for (let i = 0; i < values.length; i++) {
		sum += values[i].quantity;
	}

	return sum;
};

export default function CartNotification(): JSX.Element {
	const [cookies] = useCookies(['cart']);
	if (cookies.cart !== undefined) {
		return (
			<IconButton id={TestID.navBar.cart} component={Link} to="/Cart">
				<Badge badgeContent={Quantity(cookies.cart)} color="primary">
					<ShoppingCartIcon
						style={{
							color: '#eeeeee'
						}}
					/>
				</Badge>
			</IconButton>
		);
	}
	return (
		<IconButton id={TestID.navBar.cart} component={Link} to="/Cart">
			<ShoppingCartIcon style={{ color: '#eeeeee' }} />
		</IconButton>
	);
}
