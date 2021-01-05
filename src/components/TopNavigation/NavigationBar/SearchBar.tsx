import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { findBestMatch } from 'string-similarity';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from '../../../reducers';
import { IndividualPhone } from '../../../utils/dataTypes';
import TestID from '../../../Test/TestId';

const filterOptions = createFilterOptions({
	matchFrom: 'any',
	stringify: (option: IndividualPhone) => `${option.manufacturer} ${option.name}`
});

interface SearchBarProps {
	isMobile?: boolean;
	onInputChanged?: (value: string) => void;
}

const useStyles = makeStyles(theme => ({
	mobileAutoCompletePaper: {
		width: '90vw'
	}
}));

export default function SearchBar({
	isMobile,
	onInputChanged
}: SearchBarProps): JSX.Element {
	const theme = useTheme();
	const history = useHistory();
	const classes = useStyles(theme);
	const [input, setInput] = useState('');
	const { loading, data } = useSelector(state => state.topNavSearch);
	const searchTerms: string[] = data.map(function returnSearchTerms(
		searchItem: IndividualPhone
	) {
		return searchItem.slug;
	});
	return (
		<Autocomplete
			id={TestID.navBar.searchBar}
			classes={isMobile ? { paper: classes.mobileAutoCompletePaper } : undefined}
			filterOptions={filterOptions}
			fullWidth
			inputValue={input}
			onInputChange={(event, value, reason): void => {
				setInput(value);
				if (onInputChanged) {
					onInputChanged(value);
				}
			}}
			options={data}
			autoComplete
			autoHighlight
			freeSolo
			selectOnFocus
			disablePortal
			loading={loading}
			blurOnSelect
			getOptionLabel={(option): string => option.name}
			renderOption={(option): JSX.Element => (
				<>
					<img
						style={{ paddingRight: 10, objectFit: 'scale-down' }}
						src={option.images[0]}
						height={25}
						width={25}
						alt={option.name}
					/>
					{option.name}
				</>
			)}
			groupBy={(option): string => {
				return option.manufacturer;
			}}
			onChange={(event, value, reason): void => {
				if (reason === 'select-option' && typeof value === 'object' && value) {
					history.push(`/Phones/${encodeURIComponent(value.slug)}`);
				} else if (reason === 'create-option' && typeof value === 'string') {
					const { bestMatchIndex } = findBestMatch(value, searchTerms);
					history.push(`/Phones/${encodeURIComponent(searchTerms[bestMatchIndex])}`);
				}
			}}
			renderInput={(params): JSX.Element => (
				/* eslint-disable react/jsx-props-no-spreading */
				<TextField {...params} placeholder="Search" variant="outlined" />
			)}
		/>
	);
}
