import React from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useCookies } from 'react-cookie';
import { updateCartItem, deleteCartItem } from '../../actions/cartActions/cartActions';
import { IndividualPhone, PhoneCartType, CartType } from '../../utils/dataTypes';
import { useSelector } from '../../reducers';

interface CartItemProps {
	phone: IndividualPhone;
	review?: boolean;
}

export default function CartItem({ phone, review }: CartItemProps): JSX.Element {
	const { phones, cart } = useSelector(state => state.cart);
	const dispatch = useDispatch();
	const [cookies, setCookie, removeCookie] = useCookies(['cart']);

	const upFrontCost = (): number => {
		let cost = 0;
		const cartItem: PhoneCartType = cart?.phones[phone.slug];
		cost += phone.cost[`${cartItem.color}${cartItem.storage}`] * cartItem.quantity;
		return cost;
	};
	const renderImage = (): string => {
		return phone.images[0];
	};
	const handleDelete = (): void => {
		const newCookie: CartType = cookies.cart || {};
		delete newCookie.phones[phone.slug];
		dispatch(deleteCartItem(phone.slug, phones, cart || {}));
		setCookie('cart', JSON.stringify(newCookie), { path: '/' });
	};
	// update quantity
	const setQuantity = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => {
		const newCookie: CartType = cookies.cart || {};
		newCookie.phones[phone.slug].quantity = Number.parseInt(e.target.value, 10);
		dispatch(
			updateCartItem(phone.slug, Number.parseInt(e.target.value, 10), cart || {})
		);
		setCookie('cart', JSON.stringify(newCookie), { path: '/' });
	};
	return (
		<div
			align="left"
			style={{
				marginTop: '50px',
				paddingLeft: '10px',
				width: '80%',
				borderBottom: '1px solid #cccccc',
				marginBottom: '50px'
			}}
		>
			<div align="center">
				<Typography
					style={{
						fontSize: 17,
						// fontWeight: "400",
						// justifyContent: "left",
						alignContent: 'center',
						alignItems: 'center',
						fontFamily: 'Archivo Black',
						color: '#545454',
						// paddingLeft: "5%",
						// border: "3px solid #49c5b6",
						width: '100%',
						borderTop: '1px solid #cccccc',
						borderBottom: '1px solid #cccccc'
					}}
				>
					{phone.name}
				</Typography>
			</div>

			{/** * Top ** */}
			<div
				align="center"
				style={{
					borderBottom: '1px solid #cccccc',
					paddingTop: '10px',
					fontSize: 13,
					fontFamily: 'Archivo Black',
					fontWeight: 'bold',
					color: '#545454',
					paddingBottom: '10px',
					display: 'flex',
					flexDirection: 'row'
				}}
			>
				{/** * Top Left ** */}
				<div
					style={{
						width: '50%',
						borderRight: '1px solid #cccccc',
						paddingTop: 15
					}}
				>
					<Typography
						style={{
							paddingTop: 15,
							// fontSize: 15,
							fontFamily: 'Roboto',
							// fontWeight: "bold",
							color: '#545454',
							paddingBottom: '3px',
							fontSize: 13
						}}
					>
						{phone.storage.length > 1 ? cart && cart.phones[phone.slug].storage : null}
					</Typography>
					<img alt="" src={renderImage()} height="65" />
					<Typography style={{ marginTop: 10 }}>
						{phone.color.length > 1
							? `color: ${cart && cart.phones[phone.slug].color}`
							: null}
					</Typography>
				</div>
				{/** * Top Left ** */}
				{/** * Top Right ** */}
				<div
					style={{
						width: '50%',
						paddingTop: 15
					}}
				>
					<Typography
						style={{
							// paddingTop: 15,
							fontFamily: 'Roboto',
							color: '#545454',
							fontSize: 13
						}}
					>
						<b>UpFront Cost: </b>
						<br />${upFrontCost()}
					</Typography>
				</div>
				{/** * Top Right ** */}
			</div>
			{/** * Top ** */}

			{/** * Bottom ** */}
			<div
				align="center"
				style={{
					paddingTop: 10,
					fontSize: 15,
					fontFamily: 'Archivo Black',
					fontWeight: 'bold',
					color: '#545454',
					paddingBottom: '10px',
					display: 'flex',
					flexDirection: 'row'
				}}
			>
				{/** * Bottom Left ** */}

				{/** * Bottom Right ** */}
				<div
					style={{
						width: '50%',
						// borderRight: "1px solid #cccccc",
						// paddingTop: 15,
						fontSize: 15,
						fontFamily: 'Archivo Black',
						fontWeight: 'bold',
						color: '#545454'
						// paddingBottom: "3px"
					}}
				>
					<ListItem
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							paddingLeft: 10,
							paddingRight: 10
						}}
					>
						<Typography
							style={{
								// paddingTop: 15,
								fontFamily: 'Roboto',
								color: '#545454',
								fontSize: 13
							}}
						>
							<b>Quantity:</b>
						</Typography>
						{/* if it is reviewing an order does not all you to edit quanity */}
						{review ? (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center'
								}}
							>
								<Typography align="center">
									{cart && cart.phones[phone.slug].quantity}
								</Typography>
								{/* <DeleteButton>Edit</DeleteButton> */}
							</div>
						) : (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center'
								}}
							>
								<TextField
									select
									value={cart && cart.phones[phone.slug].quantity}
									onChange={setQuantity}
									SelectProps={{
										native: true
									}}
									margin="normal"
									variant="outlined"
								>
									<option key={1} value={1}>
										{1}
									</option>
									<option key={2} value={2}>
										{2}
									</option>
									<option key={3} value={3}>
										{3}
									</option>
									<option key={4} value={4}>
										{4}
									</option>
									<option key={5} value={5}>
										{5}
									</option>
									<option key={6} value={6}>
										{6}
									</option>
								</TextField>
								<DeleteButton
									onClick={handleDelete}
									style={{
										// paddingTop: 15,
										fontFamily: 'Roboto',
										color: 'black',
										fontSize: 10,
										backgroundColor: '#cccccc'
									}}
								>
									<b>Delete</b>
								</DeleteButton>
							</div>
						)}
					</ListItem>
				</div>
				{/** * Bottom Right ** */}
			</div>
			{/** * Bottom ** */}
		</div>
	);
}

/* each item of the cart is generated in this file */

// styling
const DeleteButton = styled(Button)({
	color: 'Blue'
});
