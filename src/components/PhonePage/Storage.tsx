import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	button: {
		border: 2,
		borderColor: '#f1f1f1',
		borderStyle: 'solid ',
		margin: 10,
		borderRadius: 5,
		width: 80
	}
}));

interface StorageProps {
	storage: string;
}

export default function Storage({ storage }: StorageProps): JSX.Element {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<Button className={classes.button} disableRipple value={storage}>
			{storage}
		</Button>
	);
}
