import fs from 'fs';
import log from 'loglevel';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HeadProvider } from 'react-head';
import App from '../client/src/App';

// We're going to split a HTML file in two so that we can insert things in the middle
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
		
		/* Here we get the markup for our main <App> component, wrapped in a couple of
			 goodies.

			 <HeadProvider>: We may want to insert things into the <head> section of the app 
			                 dynamically, based on the URL. <HeadProvider> helps us do that
											 More info: https://github.com/tizmagik/react-head 

			 <StaticRouter>: The App component needs to know which page to render, so we create 
												a static react router and pass it the url that was requested by the 
												client (req.originalUrl), and the context which can contain the 
												application state data
												More info: https://reacttraining.com/react-router/web/guides/server-rendering
	  */
		const wrappedApp = (
			<HeadProvider headTags={headTags}>
				{ /* Here we create a static react router and pass it the url
					that was requested by the client (req.originalUrl), and the 
					context which can contain the application state data */ }
				<StaticRouter location={req.originalUrl} context={context}>
					<App />
				</StaticRouter>
			</HeadProvider>
		);

		const appMarkup = renderToString(wrappedApp);
		const headMarkup = renderToString(headTags);

		// Redirect if necessary, based on context
		if(context.url) {
			log.info(`301 Redirect from context.url: ${context.url}`);
			res.send(301, context.url);
		}

		// Get the full HTML for the page
		// TODO: This is ugly, make it more functional
		const pageMarkup = insertAppMarkup(insertHeadMarkup(getIndexHtml(), headMarkup), appMarkup);

		// Return the full HTML page to the browser
		res.send(pageMarkup);
	} catch(e) {
		log.error(e);
		res.status(500);
		res.end();
	}
};