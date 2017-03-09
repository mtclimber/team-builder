"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const config = require('./lib/config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const file = __dirname + '/index.html';
    res.sendFile(file);
});

app.use(express.static('public'));

app.listen(config.port);
console.log('Listening at port: ' + config.port);