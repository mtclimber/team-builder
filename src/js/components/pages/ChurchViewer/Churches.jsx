'use strict';

const React = require('react');
import {Link} from 'react-router';
import Church from './Church.jsx';

class Churches extends React.Component{
  constructor() {
    super();

    this.state = {
      focused: null
    }
  }

  setFocused(name) {
    this.state.focused = name;
    this.setState(this.state);
  }

  render() {
    let churchRowClasses = 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
    let churchRowStyle = {
      'marginBottom': '10px'
    };

    if(this.state.focused !== null)
      churchRowClasses = 'col-xs-12 col-sm-12 col-md-8 col-lg-8';

    return (
      <div>
        <div className='row'>
          <div className='col-xs-12' style={{'marginBottom': '10px'}}>
            <h1 style={{'marginBottom': '0px 0px 15px 0px'}}>Partnerships</h1>
            <Link to='/partner' className='btn btn-success'>Add Partner</Link>
          </div>
        </div>
        <div className='row'>
          {this.props.churches.map((church) => {
            if(this.state.focused === null || this.state.focused === church.name)
            return (
              <div key={church.name} className={churchRowClasses} style={churchRowStyle} >
                <Church id={church._id} name={church.name} healthIndex={church.healthIndex} lastContacted={church.lastContacted} setFocused={(name) => this.setFocused(name)}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

module.exports = Churches;