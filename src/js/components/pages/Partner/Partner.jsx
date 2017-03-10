'use strict';

const React = require('react');

import PageHeader from '../../shared/PageHeader.jsx';
import ChurchApi from '../../../api/ChurchApi.jsx';
import CommFrequency from '../../../enums/CommFrequencyTypes.js';

class Partner extends React.Component{
  constructor() {
    super();
    this.state = {
      partnerName: '',
      address: '',
      address2: '',
      commFreq: null,
      partnerRating: null,
      city: '',
      state: '',
      contactName: '',
      contactEmail: '',
      contactPhone: ''
    }
  }

  save() {
    const freq = CommFrequency.indexOf(this.state.commFreq);
    if(this.state.partnerName.length == 0) {
      this.state.error = 'A partner name is required.';
      this.setState(this.state);
    } else {
      ChurchApi.createPartner(this.state.partnerName, this.state.commFreq,
        this.state.partnerRating, this.state.city, this.state.state,
        this.state.contactName, this.state.contactEmail, this.state.contactPhone,
        () => {
          window.location="/";
      });
    }
}

  updatePartnerName(value) {
    this.state.partnerName = value;
    this.setState(this.state);
  }

    updateAddress1(value) {
      this.state.address = value;
      this.setState(this.state);
    }

      updateAddress2(value) {
        this.state.address2 = value;
        this.setState(this.state);
      }
updateRating(value){
  this.state.partnerRating = value;
  this.setState(this.state);
}
updateFreq(value){
  this.state.commFreq = value;
  this.setState(this.state);
}
      updateState(value) {
        this.state.state = value;
          this.setState(this.state);
      }
      updateCity(value) {
        this.state.city = value;
          this.setState(this.state);
      }

      updateContactName(value) {
        this.state.contactName = value;
          this.setState(this.state);
      }

      updateContactEmail(value) {
        this.state.contactEmail = value;
          this.setState(this.state);
      }

      updateContactPhone(value) {
        this.state.contactPhone = value;
          this.setState(this.state);
      }

  cancel() {
    alert("reset");
  }

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
                    <h3 className="panel-title">Partner Information</h3>
                  </div>
                  <div className="panel-body">
                    <div className="form-group">
                      <label htmlFor="inputPartner" className="control-label">Name</label>
                      <input value={this.state.partnerName} type="text" className="form-control" id="inputPartner" placeholder="" required onChange={(e) => this.updatePartnerName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputAddress" className="control-label">Street Address</label>
                      <input value={this.state.address} type="text" className="form-control" id="inputAddress" placeholder="Street address, P.O. box, company name, c/o" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputStreet2" className="control-label" />
                      <input value={this.state.address2} type="text" className="form-control" id="inputStreet2" placeholder="Apartment, suite, unit, building, floor, etc." />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputCity" className="control-label">City</label>
                      <input value={this.state.city} type="text" className="form-control" id="inputCity" onChange={(e) => this.updateCity(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <div className="form-group">
                        <label htmlFor="state_id" className="control-label" onChange={(e) => this.updateState(e.target.value)}>State</label>
                        <select className="select form-control" id="state_id" placeholder="State">
                          <option value="NA">Other</option>
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="AR">Arkansas</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DE">Delaware</option>
                          <option value="DC">District Of Columbia</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="HI">Hawaii</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="IA">Iowa</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="ME">Maine</option>
                          <option value="MD">Maryland</option>
                          <option value="MA">Massachusetts</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MS">Mississippi</option>
                          <option value="MO">Missouri</option>
                          <option value="MT">Montana</option>
                          <option value="NE">Nebraska</option>
                          <option value="NV">Nevada</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NY">New York</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="UT">Utah</option>
                          <option value="VT">Vermont</option>
                          <option value="VA">Virginia</option>
                          <option value="WA">Washington</option>
                          <option value="WV">West Virginia</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WY">Wyoming</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading clearfix">
                    <i className="icon-calendar" />
                    <h3 className="panel-title">Primary Contact</h3>
                  </div>
                  <div className="panel-body">
                    <div className="form-group">
                      <label htmlFor="inputContact" className="control-label">Name</label>
                      <input value={this.state.contactName} type="text" className="form-control" id="inputContact" onChange={(e) => this.updateContactName(e.target.value)}/>
                     </div>
                     <div className="form-group">
                      <label htmlFor="inputEmail" className="control-label">Email</label>
                      <input value={this.state.contactEmail} type="email" className="form-control" id="inputEmail" onChange={(e) => this.updateContactEmail(e.target.value)}/>
                     </div>
                     <div className="form-group">
                      <label htmlFor="inputPhone" className="control-label">Phone</label>
                      <input value={this.state.contactPhone} type="phone" className="form-control" id="inputPhone" onChange={(e) => this.updateContactPhone(e.target.value)}/>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label" />
            <div className="text-left">
              <button className='btn btn-primary' style={{'marginRight': '10px'}} onClick={() => this.save()}>Add</button>
              <button className='btn btn-danger' onClick={() => this.cancel()}>Cancel</button>
            </div>
          </div>
          </form>
          </div>
        </div>

    );
  }
};

module.exports = Partner;
