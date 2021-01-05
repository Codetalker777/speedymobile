import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';

// About Icons
import Timer from '@material-ui/icons/Timer';
import People from '@material-ui/icons/People';
import Location from '@material-ui/icons/LocationCity';
import Search from '@material-ui/icons/Search';
import Help from '@material-ui/icons/HelpOutline';

// Value Icons
import Accuracy from '@material-ui/icons/GpsFixed';
import Transparency from '@material-ui/icons/CropFree';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

// const theme = createMuiTheme({
// 	palette: {
// 		primary: {
// 			main: '#49c5b6'
// 		},
// 		secondary: {
// 			main: '#49c5b6'
// 		}
// 	},
// 	overrides: {
// 		MuiTabs: {
// 			indicator: { backgroundColor: '#000000' }
// 		}
// 	}
// });

export default function AboutUsPage() {
	return (
		<div>
			<Helmet>
				<title>About Us | SpeedyMobile</title>
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${process.env.API_URL}/AboutUs`} />
				<meta
					name="description"
					content="Whether you know exactly what phone plan you want or you just want to see whats out there, SpeedyMobile helps you find the best deals across most telecom Carriers. Providing Canadians like you with a platform to find, compare, purchase, and manage the perfect phone and plan pairing directly on our site."
				/>
				<meta property="og:title" content="About Us" />
				<meta
					property="og:description"
					content="Whether you know exactly what phone plan you want or you just want to see whats out there, SpeedyMobile helps you find the best deals across most telecom Carriers. Providing Canadians like you with a platform to find, compare, purchase, and manage the perfect phone and plan pairing directly on our site."
				/>
				<meta name="twitter:image" content={TwitterLink} />
				<meta property="og:image" content={FaceBookLink} />
				<meta property="fb:app_id" content="794534664367050" />
			</Helmet>

			{/* ********** Banner ********** */}
			<div
				align="center"
				justify="center"
				style={{
					backgroundColor: '#49c5b6',
					paddingTop: 50,
					height: '500px',
					align: 'center'
				}}
			>
				<div
					style={{
						backgroundColor: '#49c5b6',
						marginTop: 120,
						height: '270px',
						border: '1px solid white',
						maxWidth: '500px',
						color: 'white'
					}}
				>
					<div
						style={{
							backgroundColor: '#49c5b6',
							paddingTop: 0,
							height: '262px',
							marginTop: '3px',
							width: '100%',
							color: 'white',
							borderTop: '1px solid white',
							borderBottom: '1px solid white'
						}}
					>
						<p
							style={{
								fontSize: 50,
								color: 'ffffff',
								fontFamily: 'roboto',
								fontWeight: '1'
							}}
						>
							PHONE SHOPPING
							<br />
							SIMPLIFIED
							<br />
							<b
								style={{
									fontWeight: '400'
								}}
							>
								@SPEEDYMOBILE
							</b>
						</p>
					</div>
				</div>
			</div>
			{/* ********** Banner ********** */}

			{/* ********** About ********** */}
			<div style={{ backgroundColor: '#fff' }}>
				<Typography
					align="center"
					style={{
						paddingTop: 30,
						paddingBottom: 10,
						fontSize: 30,
						fontFamily: 'roboto',
						color: '#313131',
						fontWeight: 1
					}}
				>
					<b
						style={{
							fontWeight: '1'
						}}
					>
						ABOUT
					</b>
					<hr
						style={{
							height: '2px',
							borderTop: '1px solid #313131',
							borderBottom: '1px solid #313131',
							borderLeft: '1px solid #fff',
							borderRight: '1px solid #fff',
							maxWidth: '100px'
						}}
					/>
				</Typography>
			</div>

			<div style={{ backgroundColor: '#fff', paddingTop: 0 }}>
				<div style={{ flexGrow: 1 }}>
					{/* <MuiThemeProvider theme={theme}> */}
					<Grid
						style={{
							width: '100%',
							paddingTop: 10,
							paddingBottom: 50
						}}
						container
						justify="center"
					>
						<Grid
							align="center"
							style={{
								maxWidth: 200,
								margin: '0px 10px 0px 10px',
								padding: 20,
								boxShadow: '1px 1px 5px #ededed'
							}}
							item
						>
							<Help fontSize="large" color="secondary" />

							<Typography style={{ color: '#313131', fontWeight: 1 }} align="center">
								Why <br />
								<br />
								Helping Canadians find the right phone or plan in a world where things
								arent cheap is tough. We hope to make the whole finding and buying
								process easier, faster, and cheaper for you and other Canadians so you
								can enjoy your phone without worrying about the bill.
							</Typography>
						</Grid>
						<Grid
							align="center"
							style={{
								maxWidth: 200,
								margin: '0px 20px 0px 20px',
								padding: 20,
								boxShadow: '1px 1px 5px #ededed'
							}}
							item
						>
							<Search fontSize="large" color="secondary" />

							<Typography style={{ color: '#313131', fontWeight: 1 }} align="center">
								How <br />
								<br />
								We do the searching for you. Collecting and categorizing phones, plans,
								and benefits into a database according to certain personal needs that you
								may have. Then you build what your looking for and we give you our
								professional opinion on what suits you best
							</Typography>
						</Grid>
						<Grid
							align="center"
							style={{
								maxWidth: 200,
								margin: '0px 20px 0px 20px',
								padding: 20,
								boxShadow: '1px 1px 5px #ededed'
							}}
							item
						>
							<Timer fontSize="large" color="secondary" />

							<Typography style={{ color: '#313131', fontWeight: 1 }} align="center">
								What
								<br />
								<br />
								From start to finish we enable Canadians like you to find the best phone
								and plan according to your personal needs across all carriers. Once
								you've selected your purchase, carriers prepare the order for you and you
								get to pick how you receive your phone.
							</Typography>
						</Grid>
						<Grid
							align="center"
							style={{
								maxWidth: 200,
								margin: '0px 20px 0px 20px',
								padding: 20,
								boxShadow: '1px 1px 5px #ededed'
							}}
							item
						>
							<People fontSize="large" color="secondary" />
							<Typography style={{ color: '#313131', fontWeight: 1 }} align="center">
								Who
								<br />
								<br />
								We are currently in the process of developing relationships with all
								major telecom providers so Canadians like you can see what all of Canada
								has to offer you all at once instead of one store at a time. This will
								take time, but with your help and feedback we can make this site better
								and better.
							</Typography>
						</Grid>
						<Grid
							align="center"
							style={{
								maxWidth: 200,
								margin: '0px 20px 0px 20px',
								padding: 20,
								boxShadow: '1px 1px 5px #ededed'
							}}
							item
						>
							<Location fontSize="large" color="secondary" />
							<Typography style={{ color: '#313131', fontWeight: 1 }} align="center">
								Where
								<br />
								<br />
								Our team is working out of Canada's Economic Hub, where most telecom
								providers are based. Enabling us to get the best deals for you as quickly
								as possible.
							</Typography>
						</Grid>
					</Grid>
					{/* </MuiThemeProvider> */}
				</div>

				<div style={{ display: 'flex', justifyContent: 'center' }} />
			</div>
			{/* ********** About ********** */}

			{/* ********** Values ********** */}
			<div style={{ backgroundColor: '#fff' }}>
				<Typography
					align="center"
					style={{
						paddingLeft: 70,
						paddingRight: 70,
						paddingTop: 0,
						paddingBottom: 10,
						marginLeft: 5,
						marginRight: 5,
						fontSize: 18,
						fontFamily: 'roboto',
						color: '#313131',
						fontWeight: 1
					}}
				>
					<b
						style={{
							fontWeight: '1',
							fontSize: 30
						}}
					>
						VALUES
					</b>
					<hr
						style={{
							height: '2px',
							borderTop: '1px solid #313131',
							borderBottom: '1px solid #313131',
							borderLeft: '1px solid #fff',
							borderRight: '1px solid #fff',
							maxWidth: '100px'
						}}
					/>
				</Typography>
			</div>

			<div style={{ backgroundColor: '#fff', paddingTop: 0 }}>
				<div style={{ flexGrow: 1 }}>
					{/* <MuiThemeProvider theme={theme}> */}
					<Grid
						style={{
							width: '100%',
							paddingTop: 10,
							paddingBottom: 100
						}}
						container
						justify="center"
					>
						<Grid
							align="center"
							style={{
								maxWidth: 200,
								margin: '0px 20px 0px 20px',
								padding: 20,
								boxShadow: '1px 1px 5px #ededed'
							}}
							item
						>
							<People fontSize="large" color="secondary" />
							<Typography style={{ color: '#313131', fontWeight: 1 }} align="center">
								Customer Oriented
								<br />
								<br />
								Saving our customers money is our main priority.
							</Typography>
						</Grid>
						<Grid
							align="center"
							style={{
								maxWidth: 200,
								margin: '0px 20px 0px 20px',
								padding: 20,
								boxShadow: '1px 1px 5px #ededed'
							}}
							item
						>
							<Accuracy fontSize="large" color="secondary" />
							<Typography style={{ color: '#313131', fontWeight: 1 }} align="center">
								Accuracy
								<br />
								<br />
								We strive to provide accurate information, so you can make an informed
								decision.
							</Typography>
						</Grid>
						<Grid
							align="center"
							style={{
								maxWidth: 200,
								margin: '0px 20px 0px 20px',
								padding: 20,
								boxShadow: ' 1px 1px 5px #ededed'
							}}
							item
						>
							<Transparency fontSize="large" color="secondary" />
							<Typography style={{ color: '#313131', fontWeight: 1 }} align="center">
								Transparency
								<br />
								<br />
								We provide unbiased information and are not influenced by telecoms.
							</Typography>
						</Grid>
					</Grid>
					{/* </MuiThemeProvider> */}
				</div>

				<div style={{ display: 'flex', justifyContent: 'center' }} />
			</div>
			{/* ********** Values ********** */}

			{/* ********** Mission and Values ********** */}
			<div style={{ padding: 100, backgroundColor: '#ececed' }}>
				<Typography
					align="center"
					style={{
						paddingLeft: 70,
						paddingRight: 70,
						paddingTop: 30,
						paddingBottom: 30,
						marginBottom: 5,
						marginLeft: 5,
						marginRight: 5,
						fontSize: 18,
						fontFamily: 'roboto',
						color: '#313131',
						fontWeight: 1
					}}
				>
					<b
						style={{
							fontWeight: '1',
							fontSize: 30
						}}
					>
						MISSION
					</b>
					<hr
						style={{
							height: '2px',
							borderTop: '1px solid #313131',
							borderBottom: '1px solid #313131',
							borderLeft: '1px solid #fff',
							borderRight: '1px solid #fff',
							maxWidth: '100px'
						}}
					/>
					<br />
					Whether you know exactly what phone plan you want or you just want to see whats
					out there, SpeedyMobile helps you find the best deals across most telecom
					Carriers. Providing Canadians like you with a platform to find, compare,
					purchase, and manage the perfect phone and plan pairing directly on our site.
					<br /> <br />
					<br />
					<b
						style={{
							fontWeight: '1',
							fontSize: 30
						}}
					>
						VISION
					</b>
					<hr
						style={{
							height: '2px',
							borderTop: '1px solid #313131',
							borderBottom: '1px solid #313131',
							borderLeft: '1px solid #fff',
							borderRight: '1px solid #fff',
							maxWidth: '100px'
						}}
					/>
					<br />
					By helping to keep Canadians informed on pricing, we hope to contribute to a
					future where Canadians no longer pay some of the highest rates in the world.
				</Typography>
				<div style={{ flexGrow: 1 }} />

				<div style={{ display: 'flex', justifyContent: 'center' }} />
			</div>
			{/* ********** Mission and Values ********** */}
		</div>
	);
}
