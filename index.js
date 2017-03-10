"use strict";

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const moment = require('moment');
const config = require('./lib/config');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

// passport config
const Member = require('./src/models/member');
passport.use(new LocalStrategy(Member.authenticate()));
passport.serializeUser(Member.serializeUser());
passport.deserializeUser(Member.deserializeUser());

// mongoose
mongoose.connect(config.database);

require('./src/routes/team')(app);
require('./src/routes/partner')(app);
require('./src/routes/member')(app);
require('./src/routes/auth')(app);

app.get('/*', (req, res) => {
    const file = __dirname + '/index.html';
    res.sendFile(file);
});

app.listen(config.port);
console.log('Listening at port: ' + config.port);