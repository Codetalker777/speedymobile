import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import FeedbackIcon from '@material-ui/icons/Feedback';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FeedbackDialog from './feedbackDialog';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles(() => ({
	speedDial: {
		position: 'fixed',
		bottom: 10,
		right: 10
	}
}));

export default function FeedbackPrompt(props) {
	const classes = useStyles();
	const [showDialog, handleDialog] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [cookies, setCookie] = useCookies(['NewsDialogDismiss']);
	const [hidden, setHidden] = React.useState(false);

	const cookieSetter = () => {
		const year = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
		setCookie('FeedbackPrompt', true, { path: '/', expires: year });
	};
	const hideButton = () => {
		setOpen(false);
		setHidden(true);
		cookieSetter();
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCloseDialog = () => {
		handleDialog(false);
		hideButton();
	};
	const handleOpenDialog = () => {
		handleDialog(true);
	};

	const transitionDuration = {
		enter: 1000,
		exit: 1000
	};

	return (
		<div>
			<FeedbackDialog showDialog={showDialog} closeDialog={handleCloseDialog} />
			<Zoom
				in={true}
				timeout={transitionDuration}
				style={{
					transitionDelay: `100ms`
				}}
				unmountOnExit
			>
				<SpeedDial
					className={classes.speedDial}
					color="primary"
					ariaLabel="feedback"
					hidden={!cookies.FeedbackPrompt ? (!hidden ? props.hidden : true) : true}
					icon={
						<div>
							<FeedbackIcon style={{ marginTop: 8 }} />
						</div>
					}
					onClose={handleClose}
					onOpen={handleOpen}
					open={open}
				>
					<SpeedDialAction
						icon={<FeedbackIcon />}
						tooltipTitle={'Leave Feedback'}
						onClick={handleOpenDialog}
						tooltipOpen
					/>
					<SpeedDialAction
						icon={
							<HighlightOffIcon
								style={{
									color: 'red',
									cursor: 'pointer'
								}}
							/>
						}
						tooltipTitle={'Not interested'}
						tooltipOpen
						onClick={hideButton}
					/>
				</SpeedDial>
			</Zoom>
		</div>
	);
}
