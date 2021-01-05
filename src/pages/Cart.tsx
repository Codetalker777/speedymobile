import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Helmet } from 'react-helmet';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import CartContainer from '../components/Cart/CartContainer';

import { trackPageView } from '../utils/GoogleAnalytics';

import { getCartItems, requireReload } from '../actions/cartActions/cartActions';
import { useSelector } from '../reducers';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

export default function Cart(): JSX.Element {
	const loading = useSelector(state => state.cart.loading);
	const [cookies] = useCookies(['cart']);
	const dispatch = useDispatch();
	useEffect(() => {
		trackPageView(window.location);
		if (loading) {
			dispatch(getCartItems(cookies.cart || {}));
		}
		return (): void => {
			dispatch(requireReload());
		};
	}, []);
	if (loading) {
		return (
			<div>
				<Helmet>
					<title>Cart | SpeedyMobile</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`${process.env.API_URL}/Cart`} />
					<meta name="description" content="Inventory of Phone Plans at SpeedyMobile" />
					<meta property="og:title" content="Cart" />
					<meta
						property="og:description"
						content="Inventory of Phone Plans at SpeedyMobile"
					/>
					<meta name="twitter:image" content={TwitterLink} />
					<meta property="og:image" content={FaceBookLink} />
					<meta property="fb:app_id" content="794534664367050" />
				</Helmet>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#eff2f7',
						height: window.innerHeight - 360
					}}
				>
					<CircularProgress color="secondary" />
				</div>
			</div>
		);
	}
	return (
		<div>
			<Helmet>
				<title>Cart</title>
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${process.env.API_URL}/Cart`} />
				<meta name="description" content="Inventory of Phone Plans at SpeedyMobile" />
				<meta property="og:title" content="Cart | SpeedyMobile" />
				<meta
					property="og:description"
					content="Inventory of Phone Plans at SpeedyMobile"
				/>
				<meta name="twitter:image" content={TwitterLink} />
				<meta property="og:image" content={FaceBookLink} />
			</Helmet>
			<CartContainer />
		</div>
	);
}
