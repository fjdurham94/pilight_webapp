const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const host = '0.0.0.0';
const port = 8080;

app.use(bodyParser.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/test', (req, res) => { res.send('Hello') });

app.listen(port, host, () => { console.log('App listening on ' + host + ':' + port); });