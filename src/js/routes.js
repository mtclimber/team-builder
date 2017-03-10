import React from 'react'
import { Router, Route, browserHistory, DefaultRoute, NotFoundRoute, Redirect } from 'react-router'
const ChurchViewer = require('./components/pages/ChurchViewer/ChurchViewer.jsx');
const Partner = require('./components/pages/Partner/Partner.jsx');
const Report = require('./components/pages/Report/Report.jsx');
const Registration = require('./components/pages/Registration/Registration.jsx');

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={ChurchViewer} />
    <Route path="/partner" component={Partner} />
    <Route path="/report" component={Report} />
    <Route path="/register" component={Registration} />
  </Router>
);

module.exports = routes;
