// Transpile all require/imports from here on out
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

const server = require('./server');
const port = process.env.PORT || 3000;

server.listen(port, () => {
	log.info(`Listening on port ${port}`);
});
