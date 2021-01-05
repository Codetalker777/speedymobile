import React from 'react';
import { RouteComponentProps } from 'react-router';
import lucky from '../data/images/LuckyBanner.png';
import chatr from '../data/images/ChatrBanner.png';
import LuckyPage from '../components/Plans/LuckyPage';
import ChatrPage from '../components/Plans/ChatrPage';

interface PhonePageRouteProps {
	carrierSlug: string;
}

const carriers: Record<string, () => JSX.Element> = {
	Chatr: ChatrPage,
	'Lucky-Mobile': LuckyPage
};

const banners: Record<string, string> = {
	Chatr: chatr,
	'Lucky-Mobile': lucky
};

export default function Plans({
	match
}: RouteComponentProps<PhonePageRouteProps>): JSX.Element {
	const carrier = match.params.carrierSlug;
	return (
		<div>
			{carriers[carrier] && (
				<>
					<img src={banners[carrier]} alt={`${carrier} banner`} width="100%" />
					<br />
					<br />
					{carriers[carrier]()}
				</>
			)}
			<div style={{ paddingBottom: 40 }} />
		</div>
	);
}
