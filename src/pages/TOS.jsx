import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Helmet } from 'react-helmet';
import { trackPageView } from '../utils/GoogleAnalytics';
import FaceBookLink from '../data/images/FacebookLink.png';
import TwitterLink from '../data/images/TwitterLink.png';

/* this page displays all the phones in the app */

// Styling
const StyledPaper = {
	flex: 1,
	display: 'flex',
	justifyContent: 'left',
	// alignItems: 'center',
	// alignSelf: 'center',
	flexDirection: 'column',
	// width: '50em',
	maxWidth: '50em',
	marginLeft: '15px',
	marginRight: '15px',
	marginTop: '20px',
	marginBottom: '5%',
	paddingTop: '20px',
	paddingBottom: '50px',
	paddingLeft: '25px',
	paddingRight: '25px'
};

class Phones extends React.Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		// GA track page view
		trackPageView(this.props.location);
		// get top plans
	}

	render() {
		return (
			<div>
				<Helmet>
					<title>Terms of Service | SpeedyMobile</title>
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`${process.env.API_URL}/TOS`} />
					<meta
						name="description"
						content="In order to use our website, we have some guidelines, click to learn more"
					/>
					<meta property="og:title" content="Terms of Service" />
					<meta
						property="og:description"
						content="In order to use our website, we have some guidelines, click to learn more"
					/>
					<meta name="twitter:image" content={TwitterLink} />
					<meta property="og:image" content={FaceBookLink} />
					<meta property="fb:app_id" content="794534664367050" />
				</Helmet>

				<div align="center" style={{ fontFamily: 'roboto' }}>
					<Paper style={StyledPaper} align="justify">
						<h2 style={{ fontWeight: 'bold' }}>SpeedyMobile Terms of Service</h2>
						<h4>1. Terms</h4>
						<p>
							By accessing the website at{' '}
							<a href="https://SpeedyMobile.ca">https://SpeedyMobile.ca</a>, you are
							agreeing to be bound by these terms of service, all applicable laws and
							regulations, and agree that you are responsible for compliance with any
							applicable local laws. If you do not agree with any of these terms, you are
							prohibited from using or accessing this site. The materials contained in
							this website are protected by applicable copyright and trademark law.
						</p>
						<h4>2. Use License</h4>
						<ol type="a">
							<li>
								Permission is granted to temporarily download one copy of the materials
								(information or software) on SpeedyMobile's website for personal,
								non-commercial transitory viewing only. This is the grant of a license,
								not a transfer of title, and under this license you may not:
								<ol type="i">
									<li>modify or copy the materials;</li>
									<li>
										use the materials for any commercial purpose, or for any public
										display (commercial or non-commercial);
									</li>
									<li>
										attempt to decompile or reverse engineer any software contained on
										SpeedyMobile's website;
									</li>
									<li>
										remove any copyright or other proprietary notations from the
										materials; or
									</li>
									<li>
										transfer the materials to another person or "mirror" the materials on
										any other server.
									</li>
								</ol>
							</li>
							<li>
								This license shall automatically terminate if you violate any of these
								restrictions and may be terminated by SpeedyMobile at any time. Upon
								terminating your viewing of these materials or upon the termination of
								this license, you must destroy any downloaded materials in your
								possession whether in electronic or printed format.
							</li>
						</ol>
						<h4>3. Disclaimer</h4>
						<ol type="a">
							<li>
								The materials on SpeedyMobile's website are provided on an 'as is' basis.
								SpeedyMobile makes no warranties, expressed or implied, and hereby
								disclaims and negates all other warranties including, without limitation,
								implied warranties or conditions of merchantability, fitness for a
								particular purpose, or non-infringement of intellectual property or other
								violation of rights.
							</li>
							<li>
								Further, SpeedyMobile does not warrant or make any representations
								concerning the accuracy, likely results, or reliability of the use of the
								materials on its website or otherwise relating to such materials or on
								any sites linked to this site.
							</li>
						</ol>
						<h4>4. Limitations</h4>
						<p>
							In no event shall SpeedyMobile or its suppliers be liable for any damages
							(including, without limitation, damages for loss of data or profit, or due
							to business interruption) arising out of the use or inability to use the
							materials on SpeedyMobile's website, even if SpeedyMobile or a SpeedyMobile
							authorized representative has been notified orally or in writing of the
							possibility of such damage. Because some jurisdictions do not allow
							limitations on implied warranties, or limitations of liability for
							consequential or incidental damages, these limitations may not apply to
							you.
						</p>
						<h4>5. Accuracy of materials</h4>
						<p>
							The materials appearing on SpeedyMobile's website could include technical,
							typographical, or photographic errors. SpeedyMobile does not warrant that
							any of the materials on its website are accurate, complete or current.
							SpeedyMobile may make changes to the materials contained on its website at
							any time without notice. However SpeedyMobile does not make any commitment
							to update the materials.
						</p>
						<h4>6. Links</h4>
						<p>
							SpeedyMobile has not reviewed all of the sites linked to its website and is
							not responsible for the contents of any such linked site. The inclusion of
							any link does not imply endorsement by SpeedyMobile of the site. Use of any
							such linked website is at the user's own risk.
						</p>
						<h4>7. Modifications</h4>
						<p>
							SpeedyMobile may revise these terms of service for its website at any time
							without notice. By using this website you are agreeing to be bound by the
							then current version of these terms of service.
						</p>
						<h4>8. Governing Law</h4>
						<p>
							These terms and conditions are governed by and construed in accordance with
							the laws of Ontario and you irrevocably submit to the exclusive
							jurisdiction of the courts in that State or location.
						</p>
					</Paper>
				</div>

				<div
					align="center"
					style={{
						backgroundColor: '#f9f9f9',
						paddingTop: '5%',
						margin: 0
					}}
				/>
			</div>
		);
	}
}

export default Phones;
