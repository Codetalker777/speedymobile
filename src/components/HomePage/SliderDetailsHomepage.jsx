import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme => ({
	root: {
		width: 500
	},
	typography: {
		padding: theme.spacing(2)
	}
}));

export default function PositionedPopper(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();

	const handleClick = () => event => {
		setAnchorEl(event.currentTarget);
		setOpen(prev => !prev);
	};

	const handleOpen = () => event => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};

	const handleClose = () => event => {
		setAnchorEl(event.currentTarget);
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Popper
				open={open}
				anchorEl={anchorEl}
				placement="top"
				transition
				style={{ zIndex: 1 }}
			>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={350}>
						<Paper style={{ borderRadius: 8 }}>
							<Typography className={classes.typography}>{props.helperText}</Typography>
						</Paper>
					</Fade>
				)}
			</Popper>
			<Button
				style={{ textTransform: 'none', background: 'transparent', cursor: 'default' }}
			>
				<Typography style={{ color: 'black', fontSize: 18, fontWeight: 450 }}>
					{props.label}
				</Typography>
				<HelpOutlineIcon
					style={{ fontSize: 'small', color: 'black' }}
					onClick={handleClick()}
					onMouseEnter={handleOpen()}
					onMouseLeave={handleClose()}
				/>
			</Button>
		</div>
	);
}
