'use strict';

const React = require('react');
import Church from './Church.jsx';

class Churches extends React.Component{
  render() {
    const churchRowClasses = 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
    const churchRowStyle = {
      'marginBottom': '10px'
    };

    return (
      <div className='row'>
        <div className={churchRowClasses} style={churchRowStyle} >
          <Church name='Coool Baptist Church' healthIndex='0' />
        </div>
        <div className={churchRowClasses} style={churchRowStyle} >
          <Church name='First Baptist Church of Snoreville' healthIndex='1' />
        </div>
        <div className={churchRowClasses} style={churchRowStyle} >
          <Church name='Church that we Should Ignore' healthIndex='2' />
        </div>
        <div className={churchRowClasses} style={churchRowStyle} >
          <Church name='Best Church Eva' healthIndex='3' />
        </div>
      </div>
    );
  }
};

module.exports = Churches;