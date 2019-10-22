import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../client/src/App';

/**
 * Split 'dist/index.html' in two parts so we can insert
 * the <App /> component later
 * 
 * @return {Array} [startingHtml, endHtml]
 */
// function splitIndexHtml() {
	// Get the HTML from the built index.html
	const htmlPath = path.join(process.cwd(), 'dist', 'index.html');
	const rawHtml = fs.readFileSync(htmlPath).toString();

	const appString = '<div id="app">';
	const splitter = '###SPLIT###';

	// Split the HTML into two
	const [startingHtml, endHtml] = rawHtml
		.replace(appString, `${appString}${splitter}`)
		.split(splitter);
// }

/**
 * Insert the <App /> component markup and return full page HTML to be rendered
 * 
 * @param {String} markup The <App /> component markup
 * @return {String} HTML markup for an entire page
 */
function getHtmlMarkup (markup) {
	// const [startingHtml, endHtml] = splitIndexHtml();
	return `${startingHtml}${markup}${endHtml}`;
}


/**
 * Render a page on request
 * 
 * @param req The request object
 * @param res The response object
 */
export default (req, res) => {
	try {
		// TODO: Get application state data here
		const context = {};
		// Create a static react router and get the <App /> 
		// component markup for the current URL and context
		const router = <StaticRouter location={req.originalUrl} context={context}><App /></StaticRouter>;
		const appMarkup = ReactDOM.renderToString(router);

		// Redirect if necessary
		if(context.url) {
			res.send(301, context.url);
		}

		// Get the full HTML for the page
		const pageMarkup = getHtmlMarkup(appMarkup);
		console.log(pageMarkup);
		// Return the full HTML page to the browser
		res.send(pageMarkup);
	} catch(e) {
		//TODO: Log error properly
		console.error(e);
		res.status(500);
		res.end();
	}
};