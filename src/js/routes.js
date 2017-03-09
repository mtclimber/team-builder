import React from 'react'
import { Router, Route, browserHistory, DefaultRoute, NotFoundRoute, Redirect } from 'react-router'
const Dashboard = require('./components/pages/Dashboard/Dashboard.jsx');

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Dashboard} />
  </Router>
);

module.exports = routes;