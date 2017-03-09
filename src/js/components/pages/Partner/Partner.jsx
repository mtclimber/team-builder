'use strict';

const React = require('react');

import PageHeader from '../../shared/PageHeader.jsx';

class Partner extends React.Component{
  render() {
    return (
      <div>
        <PageHeader />
          <div className="partnerForm">
            <form>
              <div className="form-group">
                  <label for="inputName">Name</label>
                  <input type="text" className="form-control" id="inputName" placeholder="Name"></input>
              </div>
              <div className="form-group">
                  <label for="inputCity">City</label>
                  <input type="text" className="form-control" id="inputCity" placeholder="City"></input>
              </div>
              <div className="form-group">
                  <label for="inputState">State</label>
                  <input type="text" className="form-control" id="inputState" placeholder="State"></input>
              </div>
              <div className="form-group">
                  <label for="inputCity">Email</label>
                  <input type="email" className="form-control" id="inputCity" placeholder="Email"></input>
              </div>
              <div className="checkbox">
                  <label><input type="checkbox"></input> Remember me</label>
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }
};

module.exports = Partner;
