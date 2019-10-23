import fs from 'fs';
import log from 'loglevel';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HeadProvider } from 'react-head';
import App from '../client/src/App';

const SPLITTER = '###SPLIT###';
const appString = '<div id="app">';

/**
 * Read dist/index.html and return as a string
 * 
 * @return {String} dist/index.html
 */
function getIndexHtml() {
	// Get the HTML from the built index.html
	const htmlPath = path.join(process.cwd(), 'dist', 'index.html');
	return fs.readFileSync(htmlPath).toString();
}

/**
 * Insert tags into the <head> of the html markup
 * 
 * @param {String} html HTML Markup of the page
 * @param {String} headMarkup HTMl Markup of <head> tags to insert into the page
 */
function insertHeadMarkup(html, headMarkup) {
	const [startMarkup, endMarkup] = html.replace('<head>', `<head>${SPLITTER}`).split(SPLITTER);
	return `${startMarkup}${headMarkup}${endMarkup}`;
}


/**
 * Insert the <App /> component markup in HTML
 * 
 * @param {String} appMarkup The <App /> component markup
 * @return {String} HTML markup for an entire page
 */
function insertAppMarkup(html, appMarkup) {
	// Split the HTML into two
	const [startingHtml, endHtml] = html
		.replace(appString, `${appString}${SPLITTER}`)
		.split(SPLITTER);

		return `${startingHtml}${appMarkup}${endHtml}`;
}

const lift2 = f => g => h => x => f(g(x))(h(x));

/**
 * Render a page on request
 * 
 * @param req The request object
 * @param res The response object
 */
export default (req, res) => {
	try {
		// TODO: You can get application state data here
		const context = {};

		const headTags = [];
		
		// Create a static react router and get the <App /> 
		// component markup for the current URL and context
		const router = (
			<HeadProvider headTags={headTags}>
				<StaticRouter location={req.originalUrl} context={context}>
					<App />
				</StaticRouter>
			</HeadProvider>
		);
		const appMarkup = renderToString(router);
		const headMarkup = renderToString(headTags);

		log.info(appMarkup);

		// Redirect if necessary
		if(context.url) {
			log.info(`301 Redirect from context.url: ${context.url}`);
			res.send(301, context.url);
		}

		// Get the full HTML for the page
		// TODO: Make this more functional
		const pageMarkup = insertAppMarkup(insertHeadMarkup(getIndexHtml(), headMarkup), appMarkup);

		// Return the full HTML page to the browser
		res.send(pageMarkup);
	} catch(e) {
		log.error(e);
		res.status(500);
		res.end();
	}
};