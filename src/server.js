const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/test', (req, res) => { res.send('Hello') });

app.listen(config.port, config.host, () => {
    console.log('App listening on ' + config.host + ':' + config.port);
});
