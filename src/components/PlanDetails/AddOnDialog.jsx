import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	closeButton: {
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)(props => {
	const { children, classes } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root}>
			<Typography style={{ flex: 1 }} variant="h6">
				{children}
			</Typography>
			<IconButton
				aria-label="Close"
				onClick={() => props.value()}
				className={classes.closeButton}
			>
				<CloseIcon />
			</IconButton>
		</MuiDialogTitle>
	);
});

export default function ScrollDialog(data) {
	function handleClose() {
		data.handleCloseDialog();
	}
	if (data.dialog) {
		return (
			<Dialog
				open
				fullScreen={false}
				onClose={handleClose}
				scroll="paper"
				aria-labelledby="scroll-dialog-title"
			>
				<DialogTitle value={data.handleCloseDialog} id="scroll-dialog-title">
					{data.dialogTitle}
				</DialogTitle>
				<DialogContent>
					<Typography>{data.dialogText}</Typography>
				</DialogContent>
			</Dialog>
		);
	}

	return null;
}
