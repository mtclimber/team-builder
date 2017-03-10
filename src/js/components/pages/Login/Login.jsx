'use strict';

const React = require('react');

import PageHeader from '../../shared/PageHeader.jsx';
import Loading from '../../shared/Loading.jsx';
import MemberApi from '../../../api/MemberApi.jsx';

class Registration extends React.Component{
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      loading: false,
      err: ''
    }
  }
  render() {
    let button = <Loading />;
    if(this.state.loading === false) {
      button = (
        <button type="submit" id="buttonAdd" name="buttonAdd" className="btn btn-primary" aria-label="Add" onClick={() => {
                    MemberApi.login(this.state.username, this.state.password, (response) => {
                      if(response.err) {
                        this.state.err = 'Failed to login';
                        this.state.loading = false;
                        this.setState(this.state);
                      }
                    });
                    this.state.loading = true;
                    this.setState(this.state);
                  }}
        >Login</button>
      )
    }
    return (
      <div>
        <PageHeader />
        <div className="formContainer">
          <form className="col-xs-12 col-sm-8">
            <div className="row">
              <div>
                <div className="panel panel-default">
                  <div className="panel-heading clearfix">
                    <i className="icon-calendar" />
                    <h3 className="panel-title">Login</h3>
                  </div>
                  <div className="panel-body">
                    <div className="form-group">
                      <label htmlFor="inputUsername" className="control-label">Username</label>
                      <input id='username' type="text" className="form-control" id="inputUsername" value={this.state.username} placeholder="" required onChange={(e) => {this.state.username = e.target.value; this.setState(this.state);}} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputPassword" className="control-label">Password</label>
                      <input id='password' type="password" className="form-control" value={this.state.password} id="inputPassword" placeholder="" onChange={(e) => {this.state.password = e.target.value; this.setState(this.state);}} />
                    </div>
                  </div>
                </div>
            </div>
          </div>
          </form>
          <div className="col-xs-12 col-sm-8">
            <div id="buttonAddGroup" className="btn-group" role="group" aria-label>
              {button}
            </div>
            <p className='text-danger'>{this.state.err}</p>
          </div>
          </div>
        </div>

    );
  }
};

module.exports = Registration;
