const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => { res.send("Server up and running"); });

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`)});

