'use strict';

const React = require('react');

import PageHeader from '../../shared/PageHeader.jsx';
import Churches from './Churches.jsx';

class Dashboard extends React.Component{
  
  render() {
    const churches = [
    {
      name: 'Coool Baptist Church',
      healthIndex: 90,
      lastContacted: 1
    },{
      name: 'First Baptist Church of Snoreville',
      healthIndex: 63,
      lastContacted: 17
    },{
      name: 'Church that we Should Ignore',
      healthIndex: 31,
      lastContacted: 46
    },{
      name: 'Best Church Eva',
      healthIndex: 3,
      lastContacted: 99
    }
  ]
    return (
      <div>
        <PageHeader />
        <Churches churches={churches}/>  
      </div>
    );
  }
};


module.exports = Dashboard;