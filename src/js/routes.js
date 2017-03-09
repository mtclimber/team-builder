import React from 'react'
import { Router, Route, browserHistory, DefaultRoute, NotFoundRoute, Redirect } from 'react-router'
const HomePage = require('./components/pages/Home.jsx');
const Partner = require('./components/pages/Partner/Partner.jsx');

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={HomePage} />
    <Route path="/partner/" component={Partner} />
  </Router>
);

module.exports = routes;
