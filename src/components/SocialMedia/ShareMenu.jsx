import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	PinterestShareButton,
	EmailShareButton,
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
	LinkedinIcon,
	PinterestIcon,
	EmailIcon
} from 'react-share';

export default function ShareMenu(props) {
	return (
		<div>
			<FacebookShareButton url={props.url} quote={props.title}>
				<MenuItem>
					<FacebookIcon size={32} round={true} />
				</MenuItem>
			</FacebookShareButton>

			<LinkedinShareButton url={props.url} quote={props.title}>
				<MenuItem>
					<LinkedinIcon size={32} round={true} />
				</MenuItem>
			</LinkedinShareButton>

			<TwitterShareButton url={props.url} quote={props.title}>
				<MenuItem>
					<TwitterIcon size={32} round={true} />
				</MenuItem>
			</TwitterShareButton>
			<EmailShareButton url={props.url} quote={props.title}>
				<MenuItem>
					<EmailIcon size={32} round={true} />
				</MenuItem>
			</EmailShareButton>
			<WhatsappShareButton url={props.url} quote={props.title}>
				<MenuItem>
					<WhatsappIcon size={32} round={true} />
				</MenuItem>
			</WhatsappShareButton>
		</div>
	);
}
