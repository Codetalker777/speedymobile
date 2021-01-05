import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import PopupCard from './PopupCard';
import { useCookies } from 'react-cookie';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

export default function PopupDialog(props) {
	const [cookies, setCookie] = useCookies(['NewsDialogDismiss']);
	const cookieSetter = () => {
		const year = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
		setCookie('NewsDialogDismiss', true, { path: '/', expires: year });
	};

	return (
		<div>
			<Dialog
				fullWidth
				maxWidth="sm"
				open={!cookies.NewsDialogDismiss ? props.open : false}
				onExited={cookieSetter}
				TransitionComponent={Transition}
				style={{ marginTop: -20 }}
			>
				<PopupCard
					closeDialog={props.handleClose}
					heading={props.heading}
					text={props.text}
					otherText={props.otherText}
				/>
			</Dialog>
		</div>
	);
}
