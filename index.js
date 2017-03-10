"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const config = require('./lib/config');
const mongoose = require('mongoose');

mongoose.connect(config.database);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

require('./src/routes/team')(app);
require('./src/routes/partner')(app);
require('./src/routes/member')(app);

app.get('/*', (req, res) => {
    const file = __dirname + '/index.html';
    res.sendFile(file);
});

app.listen(config.port);
console.log('Listening at port: ' + config.port);