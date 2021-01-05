import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Radio } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	formControl: {
		margin: 0
	},
	radio: {
		margin: 0
	}
}));

interface ColorProps {
	color: string;
}

export default function Color({ color }: ColorProps): JSX.Element {
	const classes = useStyles();
	return (
		<FormControlLabel
			label=""
			className={classes.formControl}
			value={color}
			control={
				<Radio
					className={classes.radio}
					icon={
						<svg height="40" width="40">
							<circle
								cx="50%"
								cy="50%"
								r="15"
								fill={color}
								stroke="#aaaaaa"
								strokeWidth={color === '#FFFFFF' ? 1 : 0}
							/>
						</svg>
					}
					checkedIcon={
						<svg height="40" width="40">
							<circle
								cx="50%"
								cy="50%"
								r="16"
								stroke="#49c5b6"
								strokeWidth="3"
								fillOpacity="0.0"
							/>
							<circle cx="50%" cy="50%" r="13" fill={color} />
						</svg>
					}
				/>
			}
		/>
	);
}
