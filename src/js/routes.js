import React from 'react'
import { Router, Route, browserHistory, DefaultRoute, NotFoundRoute, Redirect } from 'react-router'
const Dashboard = require('./components/pages/Dashboard/Dashboard.jsx');
const Partner = require('./components/pages/Partner/Partner.jsx');

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Dashboard} />
    <Route path="/partner" component={Partner} />
  </Router>
);

module.exports = routes;
