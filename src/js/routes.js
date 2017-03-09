import React from 'react'
import { Router, Route, browserHistory, DefaultRoute, NotFoundRoute, Redirect } from 'react-router'
const HomePage = require('./components/pages/Home.jsx');

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={HomePage} />
  </Router>
);

module.exports = routes;