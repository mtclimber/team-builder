'use strict';

const React = require('react');

import PageHeader from '../shared/PageHeader.jsx';

const HomePage = React.createClass({
  render: function() {
    return (
      <div>
        <PageHeader />
        <p>Hello, World!</p>
      </div>
    );
  }
});

module.exports = HomePage;
