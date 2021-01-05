import React from 'react';

import { Link } from 'react-router-dom';

import { styled } from '@material-ui/styles';

import SubscribeInput from '../Subscribe/SubscribeInput';

import FB from '../../data/images/icons/fb.png';
import TW from '../../data/images/icons/tw.png';
import YT from '../../data/images/icons/yt.png';
import IG from '../../data/images/icons/ig.png';
import SC from '../../data/images/icons/sc.png';
import LogoInvert from '../../data/images/logoinvert.png';

// import '../fonts.css';

/* this page holds the footer that appears on every page */

// styling
const StyledLink = styled(Link)({
	color: 'white',
	marginLeft: 10,
	fontFamily: 'Roboto',
	fontWeight: '300',
	textDecoration: 'none'
});

const StyledCard = {
	display: 'flex',
	width: '100%',
	// height: "250%",
	padding: '5%',
	// marginTop: "100px",
	backgroundColor: '#313131',
	// boxShadow: `0px 0px 0px`,
	boxShadow: `5px 5px 5px`,
	flexDirection: 'row',
	justifyContent: 'center',
	flexWrap: 'wrap'
	// zIndex: 1400,
	// paddingBottom:"150px"
};

function SearchCard() {
	return (
		<div
			style={{
				color: 'white',

				alignItems: 'center'
			}}
		>
			<div style={StyledCard}>
				<div
					style={{
						Width: '100%',
						flex: 2,
						color: 'white',
						fontFamily: 'Roboto',

						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column'
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							padding: 10,
							alignItems: 'center',
							borderRadius: 4
						}}
					>
						<a
							href="https://www.facebook.com/SpeedyMobileSite/?ref=nf&hc_ref=ARQLkbh_RcLYzSCQaRgn6cbI5h5Gtg2d3aAfIhWlXb9-ONIm0uAF2QM70Hpyzn3uIII"
							style={{ paddingRight: '20px' }}
						>
							<img src={FB} alt="logo" width="50" />
						</a>

						<a
							href="https://www.instagram.com/speedymobile.ca/"
							style={{ paddingRight: '0px' }}
						>
							<img src={IG} alt="logo" width="50" />
						</a>
					</div>

					<br />

					<div
						style={{
							maxWidth: '90%',
							flex: 1,
							fontWeight: '1000',
							fontSize: 17,
							color: 'white',
							justifyContent: 'center',
							flexWrap: 'wrap',
							color: 'white',
							fontFamily: 'Roboto',

							display: 'flex',

							flexDirection: 'row'
						}}
					>
						<StyledLink size="small" component={Link} to="/AboutUs">
							<b>ABOUT</b>
						</StyledLink>
						&nbsp;&nbsp;&nbsp;|
						<StyledLink size="small" component={Link} to="/FAQ">
							<b>FAQ</b>
						</StyledLink>
						&nbsp;&nbsp;&nbsp;|
						<StyledLink sixze="small" component={Link} to="/TOS">
							<b>TOS</b>
						</StyledLink>
						&nbsp;&nbsp;&nbsp;|
						<StyledLink size="small" component={Link} to="/Privacy">
							<b>PRIVACY</b>
						</StyledLink>
						&nbsp;&nbsp;&nbsp;|
						<StyledLink size="small" component={Link} to="/Contact">
							<b>CONTACT</b>
						</StyledLink>
					</div>
					<br />
					<br />

					<SubscribeInput />
					<br />
				</div>
			</div>
			<div style={{ height: 20, backgroundColor: '#49c5b6', minWidth: '100%' }} />
		</div>
	);
}

export default SearchCard;
