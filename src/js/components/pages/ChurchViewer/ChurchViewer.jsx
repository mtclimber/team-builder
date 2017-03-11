'use strict';

const React = require('react');
const _ = require('lodash');
import PageHeader from '../../shared/PageHeader.jsx';
import ChurchApi from '../../../api/ChurchApi.jsx';
import MemberApi from '../../../api/MemberApi.jsx';
import Churches from './Churches.jsx';
import Loading from '../../shared/Loading.jsx';
import config from '../../../../../lib/config.js';

class Dashboard extends React.Component{
  constructor() {
    super();
    this.state = {
      partners: [],
      focusedMember: null,
      loading: true,
      error: ''
    }
  }

  componentDidMount() {
    if(this.props.params.username === undefined) {
      MemberApi.getById(config.loggedInId, (response) => {
        if(response !== null)
          this.state.focusedMember = response;
        else
          this.state.error = 'Could not find user with id ' + config.loggedInId;
          
        this.setState(this.state);
      })
    } else {
      MemberApi.getByUsername(this.props.params.username, (response) => {
        if(response !== null)
          this.state.focusedMember = response;
        else
          this.state.error = 'Could not find user with username ' + this.props.params.username;
          
        this.setState(this.state);
      })
    }

    ChurchApi.getPartners((response) => {
      this.state.loading = false;
      response = _.sortBy(response, ['healthIndex']);
      this.state.partners = response;
      this.setState(this.state);
    });
  }

  renderError() {
    return (<div className='row'>
          <div className='col-xs-12' style={{'marginBottom': '10px'}}>
            <p className='text-danger'>{this.state.error}</p>
          </div>
        </div>);
  }
  render() {
    let loading = null;
    if(this.state.loading === true)
      loading = (<Loading />)
    else
        loading = (<Churches focusedMember={this.state.focusedMember} churches={this.state.partners}/>);

    let error = null;
    if(this.state.error !== '')
      error = this.renderError();

    return (
      <div>
        <PageHeader />
        {loading}
        {error}
      </div>
    );
  }
};


module.exports = Dashboard;