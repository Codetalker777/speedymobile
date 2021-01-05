import axios from 'axios';

/* this file contains the default url for the backend. Switch between them for development purposes
Make sure to only use https://SpeedyMobile-backend.herokuapp.com in production  */

const isDev = process.env.API_URL === 'http://localhost:3000';

export default axios.create({
	headers: { 'Content-Type': 'application/json' },
	baseURL: process.env.isNode || !isDev ? process.env.API_URL : window.location.origin
});
