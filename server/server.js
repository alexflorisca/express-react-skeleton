
import path from 'path';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import ssr from './ssr';

const server = express();

server.use(compression());
server.use(morgan('combined'));

// Server static files created by Parcel
server.use('/dist', express.static('dist'));

// Server Side Rendering
server.get("/*", ssr);

module.exports = server;
