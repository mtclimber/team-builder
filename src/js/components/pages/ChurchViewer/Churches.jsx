'use strict';

const React = require('react');
const _ = require('lodash');
import {Link} from 'react-router';
import Church from './Church.jsx';
import config from '../../../../../lib/config.js';

class Churches extends React.Component{
  constructor() {
    super();

    this.state = {
      focused: null,
      churches: []
    }
  }

  componentWillMount() {
    this.state.churches = this.props.churches;
  }
  setFocused(name, health) {
    if(name === null) {
      for(var i = 0; i < this.state.churches.length; i++) {
        if(this.state.churches[i].partner.name === this.state.focused) {
          var num = Number(this.state.churches[i].healthIndex);
          num += Number(health);
          this.state.churches[i].healthIndex = num;
        }
      }
    }

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
            <h1 style={{'marginBottom': '0px 0px 15px 0px'}}>{`${this.props.focusedMember.name}'s Partnerships`}</h1>
          </div>
        </div>
        <div className='row'>
          {this.state.churches.map((church) => {
            if(church.partner.teammember === this.props.focusedMember._id && (this.state.focused === null || this.state.focused === church.partner.name))
            return (
              <div key={church.partner.name} className={churchRowClasses} style={churchRowStyle} >
                <Church partnerRating={church.partner.partner_rating} id={church.partner._id} name={church.partner.name} healthIndex={church.healthIndex} lastContacted={church.lastContacted} setFocused={(name, hi) => this.setFocused(name, hi)}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

module.exports = Churches;
