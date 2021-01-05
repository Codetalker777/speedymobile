import TagManager from 'react-gtm-module';

const tagManagerArgs = {
	gtmId: 'GTM-P22M9CD'
};

export default function intializeGTM(): void {
	if (window.location.host === 'localhost:3000') return;
	TagManager.initialize(tagManagerArgs);
}
