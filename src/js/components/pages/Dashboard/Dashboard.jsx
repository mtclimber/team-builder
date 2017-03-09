'use strict';

const React = require('react');

import PageHeader from '../../shared/PageHeader.jsx';
import Churches from './Churches.jsx';

class Dashboard extends React.Component{
  render() {
    return (
      <div>
        <PageHeader />
        <Churches />  
      </div>
    );
  }
};

module.exports = Dashboard;