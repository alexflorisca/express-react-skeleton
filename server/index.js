/* 
	server/index.js - entry point for the node server
*/

// Transpile all require/imports from here on out
// This is the easiest way I found to run a server
// without having to rebuild assets with every hot
// reload.
require("@babel/register")({
	only: [/client/, /server/]
});

// Ignore style imports on the server (css,sass,less,img,etc...)
// For full list, see here: https://github.com/bkonkle/ignore-styles/blob/master/ignore-styles.js#L1
require('ignore-styles');

// Set up logging
const log = require('loglevel');
if(process.env.NODE_ENV === 'production') {
	log.setLevel('error');
} else {
	log.setLevel('trace');
}

// Get our server and listen
const server = require('./server');
const port = process.env.PORT || 3000;

server.listen(port, () => {
	log.info(`Listening on port ${port}`);
});
