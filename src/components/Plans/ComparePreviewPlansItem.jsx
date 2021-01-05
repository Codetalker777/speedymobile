import React from 'react';
import { useDispatch } from 'react-redux';
import { MuiThemeProvider, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { removeFromCompareList } from '../../actions/comparePlansActions/comparePlansActions';

const useStyles = makeStyles(() => ({
	PlanPrice: {
		fontFamily: 'roboto',
		fontWeight: 350,
		fontSize: 60,
		paddingTop: 15,
		color: '#313131'
	}
}));

export default function CompareItem(input) {
	const [] = React.useState(false);
	const dispatch = useDispatch();
	const theme = useTheme();
	const classes = useStyles(theme);
	const { index } = input;
	const { item } = input;

	return (
		<MuiThemeProvider theme={theme}>
			<ListItem style={{ justifyContent: 'center' }}>
				<Card
					style={{
						margin: 15,
						display: 'flex',
						flexDirection: 'column',
						width: 200,
						alignSelf: 'center',
						borderRadius: 8
					}}
				>
					<CardHeader
						style={{ height: 60, backgroundColor: '#ededed' }}
						avatar={
							<img
								// alt={item.phone}
								height={22}
								src={item.logo}
							/>
						}
						title={
							<div>
								<Typography
									style={{
										fontSize: '12px',
										WebkitBorderBottomLeftRadius: 5,
										color: '#313131',
										fontWeight: 470
									}}
								>
									{item.name}
								</Typography>
								<HighlightOffIcon
									style={{
										position: 'absolute',
										right: 40,
										top: 40,
										color: 'red',
										cursor: 'pointer'
									}}
									onClick={() => dispatch(removeFromCompareList(index))}
								/>
							</div>
						}
					/>
					<CardContent>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<ListItem
								component={Link}
								to={`/Plans/${item.slug}`}
								style={{
									display: 'flex',
									flexDirection: 'column',
									padding: 0,
									margin: 0,
									minHeight: 0,
									minWidth: 0
								}}
							>
								<Box
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'center'
									}}
									align="center"
								>
									<Typography style={{ marginTop: 20, fontSize: 45, color: '#9e9e9e' }}>
										$
									</Typography>{' '}
									<Typography className={classes.PlanPrice}>
										{item.monthlyCost}
									</Typography>{' '}
									<Typography
										style={{
											fontSize: 15,
											fontWeight: 900,
											paddingTop: 30,
											color: '#9e9e9e'
										}}
									>
										&nbsp;&nbsp;PER MONTH
									</Typography>
								</Box>

								<MuiThemeProvider theme={theme}>
									<CardHeader
										style={{
											padding: 5,
											textAlign: 'center',
											margin: 0,
											color: 'black',
											textTransform: 'none'
										}}
										title={
											<Typography style={{ fontSize: 20, fontWeight: 450 }}>
												{item.planName}
											</Typography>
										}
									/>
								</MuiThemeProvider>
							</ListItem>
						</div>
					</CardContent>
				</Card>
			</ListItem>
		</MuiThemeProvider>
	);
}
