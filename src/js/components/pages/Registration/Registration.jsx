'use strict';

const React = require('react');

import PageHeader from '../../shared/PageHeader.jsx';

class Registration extends React.Component{
  render() {
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
                    <h3 className="panel-title">Member Registration</h3>
                  </div>
                  <div className="panel-body">
                    <div className="form-group">
                      <label htmlFor="inputUsername" className="control-label">Username</label>
                      <input type="text" className="form-control" id="inputUsername" placeholder="" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputPassword" className="control-label">Password</label>
                      <input type="text" className="form-control" id="inputPassword" placeholder="" password />
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label" />
            <div className="text-left">
              <div
                id="buttonAddGroup"
                className="btn-group"
                role="group"
                aria-label>
                <button
                  type="submit"
                  id="buttonAdd"
                  name="buttonAdd"
                  className="btn btn-primary"
                  aria-label="Add">Add</button>
                <button
                  type="reset"
                  id="buttonCancel"
                  name="buttonCancel"
                  className="btn btn-danger"
                  aria-label="Reset">Cancel</button>
              </div>
            </div>
          </div>
          </form>
          </div>
        </div>

    );
  }
};

module.exports = Registration;
