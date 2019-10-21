import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import React from "react";
import { renderToString } from 'react-dom/server';
import App from '../client/src/App.js';

const server = express();

server.use(compression());
server.use(morgan('combined'))
// Server static files created by Parcel
server.use(express.static('dist'));

server.get("/*", (req, res) => {
	const reactHtml = renderToString(<App />);
	console.log(reactHtml);
	const pageHtml = htmlTemplate(reactHtml);

	res.send(pageHtml);
});


function htmlTemplate(reactHtml) {
	return (`
		<!DOCTYPE html>
<html>
  <head>
    <title>Express React Skeleton App</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#ffffff">
    <meta name="description" content="Web site created using create-react-app" />
    <meta property="og:image" content="">
    <meta property="og:site_name" content="ExpressReactSkeleton">
    <meta property="og:title" content="Express React Skeleton App">
    <meta property="og:url" content="https://your-website.com">
    <meta property="og:description" content="Skeleton for an express and react app">
  </head>
  <body>
    <div id="app">${reactHtml}</div>    
  </body>
</html>`
	);
};

module.exports = server;
