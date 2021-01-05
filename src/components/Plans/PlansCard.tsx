import React from 'react';
import { Typography, Card, CardContent, Grid, Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export default function PlansCard(props): JSX.Element {
	const isMobile = useMediaQuery({ query: '(max-width:766px)' });
	return (
		<Grid item lg={'auto'}>
			<Card
				style={{
					margin: 15,
					alignSelf: 'center',
					backgroundColor: 'white',
					paddingTop: 10,
					borderRadius: 10,
					boxShadow: '0px 0px 4px 0px #888',
					flex: 1
				}}
			>
				<CardContent
					style={{
						paddingBottom: 15,
						width: '100%',
						backgroundColor: 'white'
					}}
				>
					<Grid
						container
						alignContent="center"
						alignItems="center"
						direction={isMobile ? 'column' : 'row'}
						justify="center"
					>
						<Grid item xs style={{ textAlign: 'center' }}>
							<text
								style={{
									fontSize: 24,
									marginBottom: 15,
									color: '#313131'
								}}
								variant="h1"
							>
								<text>$</text>
								<text style={{ fontWeight: 'bold', fontSize: 36 }}>
									{' '}
									{' ' + props.plan.price}
								</text>
								<text> {' /month'}</text>
							</text>
						</Grid>
						{!isMobile && (
							<Divider
								style={{
									color: props.ButtonColor,
									marginLeft: 10
								}}
								orientation="vertical"
								flexItem
							/>
						)}
						<Grid item xs={!isMobile && 4} style={{ textAlign: 'center' }}>
							<Typography
								style={{
									fontSize: 30,
									paddingLeft: 20,
									paddingTop: 20,
									fontWeight: '550',
									color: '#313131'
								}}
								variant="h1"
							>
								{props.plan.data}
							</Typography>
							<Typography
								style={{
									fontSize: isMobile ? 18 : 20,
									paddingRight: 20,
									paddingBottom: 20,
									color: '#313131'
								}}
								variant="h1"
							>
								{' + 500 MB with auto-pay'}
							</Typography>
						</Grid>
						{!isMobile && (
							<Divider
								style={{
									color: props.ButtonColor
								}}
								orientation="vertical"
								flexItem
							/>
						)}
						<Grid item xs={!isMobile && 4} style={{ textAlign: 'center' }}>
							<Typography
								align="left"
								style={{
									fontSize: 22,
									paddingLeft: 20,
									paddingRight: 20,
									marginBottom: 15,

									color: '#313131'
								}}
								variant="h1"
							>
								{props.plan.details}
							</Typography>
						</Grid>
						{!isMobile && (
							<Divider
								style={{
									color: props.ButtonColor
								}}
								orientation="vertical"
								flexItem
							/>
						)}
						<Grid item xs justify="center" style={{ textAlign: 'center' }}>
							<Typography
								style={{
									fontSize: 24,
									paddingLeft: 20,
									marginBottom: 15,

									color: '#313131'
								}}
								variant="h1"
							>
								<Link
									to={{
										pathname: `/PrepaidPlanDetails`,
										state: { plan: props.plan }
									}}
									style={{ textDecoration: 'none' }}
								>
									{' '}
									<Button
										style={{
											backgroundColor: props.ButtonColor ? props.ButtonColor : '#49c5b6'
										}}
									>
										{' '}
										More Info{' '}
									</Button>
								</Link>
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
}
