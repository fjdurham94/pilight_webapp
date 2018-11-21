const express = require('express');
const path = require('path');

const app = express();
const host = '0.0.0.0';
const port = 8080;

app.use(express.static(path.join(__dirname, '../dist')));
app.use('/test', (req, res) => { res.send('Hello') });

app.listen(port, () => { console.log('App listening on ' + host + ':' + port); });