import React from 'react'
import { Router, Route, browserHistory, DefaultRoute, NotFoundRoute, Redirect } from 'react-router'
const ChurchViewer = require('./components/pages/ChurchViewer/ChurchViewer.jsx');
const Partner = require('./components/pages/Partner/Partner.jsx');
const Report = require('./components/pages/Report/Report.jsx');
const Login = require('./components/pages/Login/Login.jsx');
const DetailsPage = require('./components/pages/PartnerDetails/DetailsPage.jsx');
const CreateMember = require('./components/pages/CreateMember/CreateMember.jsx');
const PartnerEdit = require('./components/pages/Partner/Partner.jsx');

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={ChurchViewer} />
    <Route path="/partnerships" component={ChurchViewer} />
    <Route path="/partnerships/:username" component={ChurchViewer} />
    <Route path="/partner" component={Partner} />
    <Route path="/report" component={Report} />
    <Route path="/login" component={Login} />
    <Route path="/create-member" component={CreateMember} />
    <Route path="/details/:partnerId" component={DetailsPage} />
    <Route path="/partner/:partnerId" component={PartnerEdit} />
  </Router>
);

module.exports = routes;
