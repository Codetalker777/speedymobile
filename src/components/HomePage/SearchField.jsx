import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { setText } from '../../actions/actions/actions';
import { setContractText } from '../../actions/searchActions/searchActions';

/* This is the search field on the main page. It allows you to switch between 3 options, iphone, android and plans */

// styling

const styles = theme => ({
	root: {
		flexGrow: 1,
		overflow: 'visible'
	},
	input: {
		display: 'flex',
		padding: 0,
		height: 'auto'
	},
	valueContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flex: 1,
		alignItems: 'center',
		overflow: 'hidden'
	},
	chip: {
		margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`
	},
	chipFocused: {
		backgroundColor: emphasize(
			theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
			0.08
		)
	},
	noOptionsMessage: {
		padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`
	},
	singleValue: {
		fontSize: 16
	},
	placeholder: {
		position: 'absolute',
		left: 2,
		fontSize: 16
	},
	paper: {
		position: 'absolute',
		zIndex: 3,
		marginTop: theme.spacing(1),
		left: 0,
		right: 0, 
	},
	divider: {
		height: theme.spacing(2)
	}
});

// no results found
function NoOptionsMessage(props) {
	return (
		<Typography
			color="textSecondary"
			className={props.selectProps.classes.noOptionsMessage}
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
}

function inputComponent({ inputRef, ...props }) {
	return <div ref={inputRef} {...props} />;
}

// textfield displayed
function Control(props) {
	return (
		<TextField
			fullWidth
			InputProps={{
				inputComponent,
				inputProps: {
					className: props.selectProps.classes.input,
					inputRef: props.innerRef,
					children: props.children,
					...props.innerProps
				}
			}}
			{...props.selectProps.textFieldProps}
		/>
	);
}

// option in the list
function Option(props) {
	return (
		<MenuItem
			buttonRef={props.innerRef}
			selected={props.isFocused}
			component="div"
			style={{
				fontWeight: props.isSelected ? 500 : 400
			}}
			{...props.innerProps}
		>
			{props.children}
		</MenuItem>
	);
}

// intial message beofre anything is entered
function Placeholder(props) {
	return (
		<Typography
			color="textSecondary"
			className={props.selectProps.classes.placeholder}
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
}

// one value is chosen
function SingleValue(props) {
	return (
		<Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
			{props.children}
		</Typography>
	);
}

function ValueContainer(props) {
	return (
		<div className={props.selectProps.classes.valueContainer}>{props.children}</div>
	);
}

// more than one value is chosen
function MultiValue(props) {
	return (
		<Chip
			tabIndex={-1}
			label={props.children}
			className={classNames(props.selectProps.classes.chip, {
				[props.selectProps.classes.chipFocused]: props.isFocused
			})}
			onDelete={props.removeProps.onClick}
			deleteIcon={<CancelIcon {...props.removeProps} />}
		/>
	);
}

// the list that holds all of the options displayed
function Menu(props) {
	return (
		<Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
			{props.children}
		</Paper>
	);
}

const components = {
	Control,
	Menu,
	MultiValue,
	NoOptionsMessage,
	Option,
	Placeholder,
	SingleValue,
	ValueContainer
};

class SearchField extends React.Component {
	// label displayed based on value entered
	label = value => {
		switch (value) {
			case 1:
				return 'Android Search';
			case 2:
				return 'Plan Search';
			default:
				return 'iPhone Search';
		}
	};

	render() {
		const { classes, theme, tab, phones, searchText, contractsText } = this.props;

		// sets the change based on the tab
		const handleChange = searches => {
			if (tab === 2) {
				this.props.setContractText(searches);
			} else {
				this.props.setText(searches);
			}
		};

		// displays the correct value based on tab
		const displayValue = () => {
			if (tab === 2) {
				return contractsText;
			}
			return searchText;
		};

		const suggestions = phones.map(suggestion => ({
			value: suggestion,
			label: suggestion
		}));

		const selectStyles = {
			menuList: (provided, state) => ({
				...provided,
				'&::-webkit-scrollbar': {
					width: '4px'
				},
				'&::-webkit-scrollbar-thumb': {
					background: '#000000',
					borderRadius: '10px'
				},
				'&::-webkit-scrollbar-thumb:hover': {
					background: '#000000'
				}
			})
		};

		return (
			<div className={classes.root}>
				<Select
					style={{ position: 'absolute' }}
					classes={classes}
					styles={selectStyles}
					textFieldProps={{
						InputLabelProps: {
							shrink: true
						}
					}}
					options={suggestions}
					components={components}
					value={displayValue()}
					onChange={handleChange}
					placeholder={this.label(tab)}
					isMulti
				/>
			</div>
		);
	}
}

// actions
const mapDispatchToProps = dispatch =>
	bindActionCreators({ setText, setContractText }, dispatch);

// redux variables
const mapStateToProps = state => {
	return {
		tab: state.main.tab,
		searchText: state.main.searchText,
		phones: state.main.phones,
		contractsText: state.search.contractsText
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(withStyles(styles, { withTheme: true })(SearchField))
);
