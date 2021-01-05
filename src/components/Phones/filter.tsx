import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import FilterIcon from '@material-ui/icons/FilterList';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import { IndividualPhone } from '../../utils/dataTypes';
import { useSelector } from '../../reducers';
import { setFilter } from '../../actions/individualPhoneActions/individualPhoneActions';

const useStyles = makeStyles(theme => ({
	textField: {
		width: '100%'
	},
	sliderContainer: {
		width: '100%'
	},
	iconExpanded: {
		transform: 'rotate(0deg) !important'
	}
}));

const getBrand = (phones?: IndividualPhone[] | null): string[] => {
	if (!phones) return [];
	return phones
		.map(phone => {
			return phone.manufacturer;
		})
		.filter((item, i, ar) => ar.indexOf(item) === i);
};

const getModel = (phones?: IndividualPhone[] | null): string[] => {
	if (!phones) return [];
	return phones
		.map(phone => {
			return phone.name;
		})
		.filter((item, i, ar) => ar.indexOf(item) === i);
};

function valuetext(value: number): string {
	return `$${value}`;
}

export default function Filter(): JSX.Element {
	const phones = useSelector(state => state.individualPhones.phones);
	const theme = useTheme();
	const classes = useStyles(theme);
	const dispatch = useDispatch();
	const [chosenBrand, setBrand] = React.useState('');
	const [chosenModel, setModel] = React.useState('');
	const [sortOption, setSortOption] = React.useState('');
	const [priceRange, setPriceRange] = React.useState<number[]>([0, 2000]);
	const handleBrand = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setBrand(event.target.value);
	};
	const handleModel = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setModel(event.target.value);
	};
	const handleSortOption = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSortOption(event.target.value);
	};
	const handlePriceRange = (
		event: React.ChangeEvent<any>,
		newValue: number | number[]
	): void => {
		setPriceRange(newValue as number[]);
	};
	const applyFilters = (): void => {
		const filteredResults = phones?.filter(phone => {
			return (
				(chosenBrand === '' || phone.manufacturer === chosenBrand) &&
				(chosenModel === '' || phone.name === chosenModel) &&
				phone?.cost[Object.keys(phone?.cost)[0]] >= priceRange[0] &&
				phone?.cost[Object.keys(phone?.cost)[0]] <= priceRange[1]
			);
		});
		if (sortOption === '') {
			dispatch(setFilter(filteredResults || []));
		} else {
			const sortedResults = filteredResults?.sort((a, b) => {
				if (sortOption === '') {
					return 0;
				}
				if (sortOption === 'lth') {
					return a?.cost[Object.keys(a?.cost)[0]] - b?.cost[Object.keys(b?.cost)[0]];
				}
				if (sortOption === 'htl') {
					return b?.cost[Object.keys(b?.cost)[0]] - a?.cost[Object.keys(a?.cost)[0]];
				}
			});
			dispatch(setFilter(sortedResults || []));
		}
	};
	const allBrands = getBrand(phones);
	const allModels = getModel(phones);
	return (
		<div>
			<Accordion>
				<AccordionSummary
					classes={{ expandIcon: classes.iconExpanded }}
					expandIcon={<FilterIcon />}
					aria-controls="panel1a-content"
				>
					<Typography>Filters</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Grid spacing={3} container justify="center">
						<Grid item xs={11} sm={6}>
							<div className={classes.sliderContainer}>
								<Typography align="center" gutterBottom>
									Price Range
								</Typography>
								<Slider
									value={priceRange}
									onChange={handlePriceRange}
									valueLabelDisplay="auto"
									aria-labelledby="range-slider"
									getAriaValueText={valuetext}
									valueLabelFormat={valuetext}
									max={2000}
									min={0}
								/>
							</div>
						</Grid>
						<Grid item xs={6}>
							<TextField
								className={classes.textField}
								select
								label="Brand"
								value={chosenBrand}
								onChange={handleBrand}
							>
								<MenuItem key="" value="">
									All
								</MenuItem>
								{allBrands.map(brand => (
									<MenuItem key={brand} value={brand}>
										{brand}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField
								className={classes.textField}
								select
								label="Model"
								value={chosenModel}
								onChange={handleModel}
							>
								<MenuItem key="" value="">
									All
								</MenuItem>
								{allModels.map(brand => (
									<MenuItem key={brand} value={brand}>
										{brand}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField
								className={classes.textField}
								select
								label="Sort"
								value={sortOption}
								onChange={handleSortOption}
							>
								<MenuItem key="Unsorted" value="">
									Unsorted
								</MenuItem>
								<MenuItem key="lth" value="lth">
									Low to High
								</MenuItem>
								<MenuItem key="htl" value="htl">
									High to Low
								</MenuItem>
							</TextField>
						</Grid>
					</Grid>
				</AccordionDetails>
				<AccordionActions>
					<Button onClick={applyFilters} size="small" color="primary">
						Apply
					</Button>
				</AccordionActions>
			</Accordion>
		</div>
	);
}
