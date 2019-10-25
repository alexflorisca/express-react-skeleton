/*
  server/server.js - our simple  express server
*/
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import ssr from './ssr';

const server = express();

server.use(compression());
server.use(morgan('combined'));

// Server static files created by Parcel from /dist
server.use('/dist', express.static('dist', {
  //  365 days
  maxAge: 1000 * 60 * 60 * 24 * 365
}));

// Server Side Rendering
server.get("/*", ssr);

// Need to module.exports here to work 
// with non babelified server/index.html
module.exports = server;
