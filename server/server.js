const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const app = express();
const DEFAULT_PORT = 3000;

app.use(compression());
app.use(morgan('combined'))
// Server static files created by Parcel
app.use(express.static('dist'));

app.get("/", (req, res) => { res.send("Server up and running"); });

app.listen(process.env.PORT || DEFAULT_PORT, () => { 
	console.log(`Listening on port ${DEFAULT_PORT}`)
});

