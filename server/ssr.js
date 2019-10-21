import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { printDrainHydrateMarks } from 'react-imported-component';
import App from '../client/src/App';

const htmlPath = path.join(process.cwd(), 'dist', 'client', 'index.html');
const rawHtml = fs.readFileSync(htmlPath).toString();

const appString = '<div id="app">';
const splitter = '###SPLIT###';

const [startingRawHtmlFragment, endingRawHtmlFragment] = rawHtml
	.replace(appString, `${appString}${splitter}`)
	.split(splitter);

function getHtmlMarkup (markup, drainHydrateMarks) {
	return `${startingRawHtmlFragment}${markup}${drainHydrateMarks}${endingRawHtmlFragment}`;
}


export default (req, res) => {
	try {
		// Get application state data here
		const context = {};
		const router = <StaticRouter location={req.originalUrl} context={context}><App /></StaticRouter>;
		const markup = ReactDOM.renderToString(router);

		if(context.url) {
			res.send(301, context.url);
		}

		const htmlMarkup = getHtmlMarkup(markup, printDrainHydrateMarks());

		res.send(htmlMarkup);
	} catch(e) {
		//TODO: Log error
		res.status(500);
		res.end();
	}
};