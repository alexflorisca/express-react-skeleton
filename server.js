const express = require('express');
const app = express();
const DEFAULT_PORT = 3000;

app.get('/', (req, res) => { res.send("Server up and running"); });

app.listen(process.env.PORT || DEFAULT_PORT, () => { 
	console.log(`Listening on port ${DEFAULT_PORT}`)
});

