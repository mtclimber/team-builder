'use strict';

import React from 'react';
import {Link} from 'react-router';

class PageHeader extends React.Component{
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">Team Builder</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
              <li><Link to='/partner'>Add Partner</Link></li>
              <li><Link to='/create-member'>Add Member</Link></li>
              <li><Link to='/Login'>Login</Link></li>
              <li><Link to='/report'>Report</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
};

module.exports = PageHeader;