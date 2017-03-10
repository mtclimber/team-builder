'use strict';

const React = require('react');
import PageHeader from '../../shared/PageHeader.jsx';
import MemberApi from '../../../api/MemberApi.jsx';
import TeamApi from '../../../api/TeamApi.js';
import {Link} from 'react-router';
import Loading from '../../shared/Loading.jsx';

class CreateMember extends React.Component{
  constructor() {
    super();
    this.state = {
      teams: [],
      loading: true,
      name: '',
      username: '',
      team: 'None',
      isChecked: false,
      leadingTeamName: '',
      error: ''
    }
  }

  componentDidMount() {
    TeamApi.getTeams((response) => {
      this.state.teams.push('None');
      for(var i = 0; i < response.length; i++) {
        this.state.teams.push(response[i].name);
      }
      this.state.loading = false;
      this.setState(this.state);
    });
  }

  save() {
    console.log(this.state);
    if(this.state.name === '' || this.state.username === '' || (this.state.isChecked === true && this.state.leadingTeamName === '')) {
      this.state.error = 'Name is required, and if member is a leader, the name of the member\'s team is required';
      this.setState(this.state);
    } else {
      MemberApi.createMember(this.state.name, this.state.username, this.state.team, this.state.leadingTeamName, () => {
        window.location="/";
      });
    }
  }


  onCheckboxChange() {
    this.state.isChecked = $('#leaderCheck')[0].checked;
    this.setState(this.state);
  }

  renderContent() {
    console.log(this.state.isChecked);

    let teamLeadName = (
      <input disabled value={this.state.leadingTeamName} type="text" className="form-control" id="teamName" placeholder="" />
    );

    if(this.state.isChecked === true) {
      teamLeadName = (
        <input value={this.state.leadingTeamName} type="text" className="form-control" id="teamName" placeholder="" onChange={(e) => {this.state.leadingTeamName = e.target.value; this.setState(this.state);}}/>
      );
    }
    return (
      <div>
        <div className="row"> 
          <div className='col-xs-12 col-sm-8 col-md-6'>
            <div className="panel panel-default">
              <div className="panel-heading clearfix">
                <h3 className="panel-title">Create Member</h3>
              </div>

              <div className="panel-body">
                <div className="form-group">
                  <label htmlFor="inputPartner" className="control-label">Name</label>
                  <input value={this.state.name} type="text" className="form-control" id="inputPartner" placeholder="" onChange={(e) => {this.state.name = e.target.value; this.setState(this.state);}}/>
                </div>
                <div className="form-group">
                  <label htmlFor="username" className="control-label">Username</label>
                  <input value={this.state.username} type="text" className="form-control" id="username" placeholder="" onChange={(e) => {this.state.username = e.target.value; this.setState(this.state);}}/>
                </div>
                <div className="form-group">
                  <label htmlFor="leader" className="control-label">Team</label>
                  <select className="select form-control" value={this.state.team} id="leader" placeholder="Team" onChange={(e) => {this.state.team=e.target.value; this.setState(this.state);}}>
                          {this.state.teams.map((team) => {
                            return (<option value={team}>{team}</option>)
                          })}
                  </select>
                </div>
                <div className="form-group">
                  <div className="checkbox">
                    <label><input id='leaderCheck' type="checkbox" value={this.state.isChecked} onChange={(e) => {this.onCheckboxChange()}} />Is Leader</label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="teamName" className="control-label">Name of Team You Lead</label>
                  {teamLeadName}
                </div>
              </div>
              <p className='text-danger'>{this.state.error}</p>
            </div>
          </div>
        </div>
        <div className="formContainer">
          <div className="text-left">
            <button className='btn btn-primary' style={{'marginRight': '10px'}} onClick={() => this.save()}>Add</button>
            <Link to='/' className='btn btn-danger'>Cancel</Link>
          </div>
        </div>
      </div>
    );
  }
  render() {
    let content = (<Loading />);
    if(this.state.loading === false)
      content = this.renderContent();
    return (
      <div>
        <PageHeader />
        {content}
      </div>
    );
  }
};

module.exports = CreateMember;