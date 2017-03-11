'use strict';

const React = require('react');
const moment = require('moment');

import PageHeader from '../../shared/PageHeader.jsx';
import ChurchApi from '../../../api/ChurchApi.jsx';
import MemberApi from '../../../api/MemberApi.jsx';
import Loading from '../../shared/Loading.jsx';
import CommFrequencyType from '../../../enums/CommFrequencyTypes.js';
import HistoryFeed from './HistoryFeed.jsx';
import Rater from 'react-rater'
import {Link} from 'react-router';
import config from '../../../../../lib/config.js';

class DetailsPage extends React.Component{
  constructor() {
    super();
    this.state = {
      partner: null,
      loading: true,
      readonly: true,
      member: {username:""},
      error: ''
    }
  }

  componentDidMount() {
    ChurchApi.getPartner(this.props.params.partnerId, (response) => {
      if(response.message !== null && response.message !== undefined) {
          this.state.error = 'The partner was not found.';
      } else {
        this.state.partner = response;
      }

      MemberApi.getById(response.partner.teammember, (memberResponse) => {
        this.state.member = memberResponse;
        this.setState(this.state);
        });

      this.state.loading = false;
      this.setState(this.state);
    });

  }

  cancel() {
    this.state.readonly = true;
    this.setState(this.state);
  }
  getCommunicationNeeds() {
    var cm = Number(this.state.partner.partner.commfreq);
    var val = CommFrequencyType[cm];
    return val;
  }

  getProgressBar() {
    var healthIndex = Number(this.state.partner.healthIndex);

    if(healthIndex >= 90)
      return "success";
    else if(healthIndex >= 50)
      return "info";
    else if(healthIndex >= 25)
      return "warning";
    else if(healthIndex >= 0)
      return "danger";
  }

  getImageSource() {
    var healthIndex = Number(this.state.partner.healthIndex);

    if(healthIndex >= 90)
      return "great";
    else if(healthIndex >= 50)
      return "good";
    else if(healthIndex >= 25)
      return "sad";
    else if(healthIndex >= 0)
      return "mad";
  }

  getDaysAgoText() {
    const days = this.state.partner.lastContacted;
    if(days === 1)
      return `${days} day ago`;
    if(days === 0)
      return 'today';

    return `${days} days ago`;
  }


  renderPartner() {
    const partner = this.state.partner.partner;
    const member = this.state.member
    const hi = this.state.partner.healthIndex;
    const lc = this.state.partner.lastContacted;
    const prettyDate = moment(this.state.partner.date_created).format('MMMM Do YYYY');;
    const churchSize = '75px';
    const headerStyle = {
      'fontWeight': 'bold',
      'fontSize': '18px',
      'marginBottom': '0'
    }

    const feedHeaderStyle = {
      'fontWeight': 'bold',
      'fontSize': '18px',
    }

    let updateCancelButton = (
      <div className="text-left">
        <Link to={'partner/' + partner._id} className='btn btn-primary' style={{'float': 'left', 'marginLeft': '5px'}}>Edit</Link>
        <Link to={'partnerships/' + member.username} className='btn btn-danger' style={{'float': 'left', 'marginLeft': '5px'}}>Close</Link>
      </div>
      )

    return (
      <div style={{'textAlign': 'center'}}>
        <div>
          <Rater interactive={!this.state.readonly} rating={this.state.partner.partner.partner_rating} />
        </div>
        <img style={{'height': churchSize, 'width': churchSize}} src={`/images/${this.getImageSource()}.png`} />
        <div className="progress" style={{'margin': '10px auto 15px auto'}}>
          <div className={`progress-bar progress-bar-${this.getProgressBar()}`} role="progressbar" aria-valuenow={hi} aria-valuemin="0" aria-valuemax="100" style={{'width': `${hi}%`}}>
            <span className="sr-only">{`${hi}%`}</span>
          </div>
        </div>
        <p className='church-title'>{partner.name}</p>
        <div style={{'textAlign': 'left'}}>
          <p style={headerStyle}>Partnership Started</p>
          <p>{prettyDate}</p>
          <p>{`Last contacted ${this.getDaysAgoText()}`}</p>
          <p style={headerStyle}>Primary Contact</p>
          <p>{partner.primary_name}</p>
          <p>{partner.primary_phone}</p>
          <p>{partner.primary_email}</p>
          <p style={headerStyle}>Location</p>
          <p>{`${partner.city}, ${partner.state}`}</p>
          <p style={headerStyle}>Communication Needs</p>
          <p>{this.getCommunicationNeeds()}</p>
          <p style={feedHeaderStyle}>Communication History</p>
          <HistoryFeed history={partner.history} />
        </div>
        <div className="form-group">
          <label className="control-label" />
          <div className="text-left">
            <div className="form-group">
              <label className="control-label" />
                {updateCancelButton}
            </div>
          </div>
        </div>

      </div>
    )
  }
  render() {
    let partner = null;
    let loading = null;
    if(this.state.loading === true)
      loading = (<Loading />)
    else
      partner = this.renderPartner();

    return (
      <div>
        <PageHeader />
        <div className='row'>
          <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <div className='panel'>
              {partner}
              {loading}
              <h1 className='text-danger'>{this.state.error}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = DetailsPage;
