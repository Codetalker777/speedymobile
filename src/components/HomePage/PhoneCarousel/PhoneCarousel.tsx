import React, { useEffect } from 'react';
import { GridList } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import PhoneCard from './PhoneCard';
import { useSelector } from '../../../reducers';
import { getPhones } from '../../../actions/individualPhoneActions/individualPhoneActions';

const useStyles = makeStyles(theme => ({
	title: {
		marginLeft: '0vw',
		marginRight: '0vw',
		fontSize: 24,
		fontWeight: 600,
		backgroundColor: 'transparent',
		paddingLeft: 10,
		paddingTop: 30,
		paddingBottom: 30,
		[theme.breakpoints.down('sm')]: {
			marginLeft: 'unset',
			marginRight: 'unset'
		},
		[theme.breakpoints.between('sm', 'md')]: {
			marginLeft: '10vw',
			marginRight: '10vw'
		}
	},
	root: {
		paddingTop: 30,
		paddingBottom: 30,
		display: 'flex',
		justifyContent: 'space-around',
		overflow: 'hidden',
		marginBottom: 10,
		marginRight: '0vw',
		marginLeft: '0vw',
		backgroundColor: '#f8f9fa',

		[theme.breakpoints.down('sm')]: {
			marginLeft: 'unset',
			marginRight: 'unset'
		},
		[theme.breakpoints.between('sm', 'md')]: {
			marginLeft: '10vw',
			marginRight: '10vw'
		}
	},
	gridList: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
		'&::-webkit-scrollbar': {
			display: 'none'
		}
	}
}));

export default function PhoneCarousel(): JSX.Element {
	const theme = useTheme();
	const classes = useStyles(theme);
	const phones = useSelector(state => state.individualPhones.phones);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!phones) {
			dispatch(getPhones());
		}
	}, []);
	return (
		<>
			<div className={classes.root}>
				<GridList spacing={0} className={classes.gridList} cols={2.5} component="div">
					{phones && phones.length > 0 ? (
						phones.map(function generateCard(phone) {
							return <PhoneCard key={phone.name} phone={phone} />;
						})
					) : (
						<div />
					)}
				</GridList>
			</div>
		</>
	);
}
