import React from 'react';
import { Helmet } from 'react-helmet';
import FAQ from '../data/images/home_faq.png';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

export default function FrequentlyAskedQuestions(): JSX.Element {
	return (
		<div>
			<Helmet>
				<title>FAQ | SpeedyMobile</title>
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`${process.env.API_URL}/FAQ`} />
				<meta
					name="description"
					content="Find the answers to your questions about SpeedyMobile here!"
				/>
				<meta property="og:title" content="FAQ" />
				<meta
					property="og:description"
					content="Find the answers to your questions about SpeedyMobile here!"
				/>
				<meta name="twitter:image" content={TwitterLink} />
				<meta property="og:image" content={FaceBookLink} />
				<meta property="fb:app_id" content="794534664367050" />
			</Helmet>
			<div
				id="faq"
				align="center"
				style={{
					// backgroundColor:"#ededed",
					paddingTop: '10%',
					paddingBottom: '10%',
					paddingLeft: '10%',
					paddingRight: '10%'
					// marginBottom:"10%",
				}}
			>
				<img src={FAQ} alt="FAQ Text" height="63" />
				<p
					style={{
						textAlign: 'center',
						fontFamily: 'Roboto',
						color: '#313131'
					}}
				>
					<span>
						<b>Which telecoms do you feature in your search engine?</b>
						<br />
						Currently we feature all telecoms that service Ontario, Canada.
					</span>
					<br />
					<br />
					<span>
						<b>When will you cover the rest of Canada?</b>
						<br />
						We are working to expand to the rest of Canada in the next few months.
					</span>
					<br />
					<br />
					<span>
						<b>Are your search results up to date?</b>
						<br />
						Our team monitors changes in the industry daily and update our database on an
						ongoing basis.
					</span>
					<br />
					<br />
					<span>
						<b>Will you feature home phone service in your search results?</b>
						<br />
						Home phone lines in Canada are declining at an exponential rate, therefore we
						will not be featuring them in our search results.
					</span>{' '}
					<br />
					<br />
					<span>
						<b>More questions?</b>
						<br />
						Send us an email at info@speedymobile.ca
					</span>
					<br />
					<br />
				</p>
			</div>
		</div>
	);
}
