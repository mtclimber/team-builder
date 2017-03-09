'use strict';
window.$ = window.jQuery = require('jquery');

const $ = require('jquery');
const bs = require('bootstrap');
const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const routes = require('./routes');
const render = require('react-dom').render;
const d3 = require('d3');
const c3 = require('c3');
import { browserHistory } from 'react-router';

render(routes, document.getElementById('app'));