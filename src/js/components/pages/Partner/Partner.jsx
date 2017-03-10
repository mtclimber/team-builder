'use strict';

const React = require('react');

import PageHeader from '../../shared/PageHeader.jsx';
import ChurchApi from '../../../api/ChurchApi.jsx';
import CommFrequency from '../../../enums/CommFrequencyTypes.js';
import States from '../../../enums/States.js'
import Rater from 'react-rater'

class Partner extends React.Component{
  constructor() {
    super();
    this.state = {
      partnerName: '',
      address: '',
      address2: '',
      commFreq: 'Moderate',
      partnerRating: 3,
      city: '',
      state: 'N/A',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      error: ''
    }
  }

  save() {
    const freq = CommFrequency.indexOf(this.state.commFreq);
    if(this.state.partnerName.length == 0) {
      this.state.error = 'A partner name is required.';
      this.setState(this.state);
    } else {
      var comFreqIndex = CommFrequency.indexOf(this.state.commFreq);
      ChurchApi.createPartner(this.state.partnerName, comFreqIndex,
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
        this.state.partnerRating = Number(value);
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
    window.location = "/";
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
                    <h3 className="panel-title">Partner Information <Rater interactive={true} rating={this.state.partnerRating} onRate={(e) => this.updateRating(e.rating)} /></h3>
                  </div>
                  <div className="panel-body">
                    <div className="form-group">
                      <label htmlFor="inputPartner" className="control-label">Name</label>
                      <input value={this.state.partnerName} type="text" className="form-control" id="inputPartner" placeholder="" required onChange={(e) => this.updatePartnerName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputFreq" className="control-label">Communication Frequency</label>
                      <select className="select form-control" id="inputFreq" placeholder="Frequency" onChange={(e) => this.updateFreq(e.target.value)}>
                          {CommFrequency.map((item) => {
                            var selected = false;
                            if(item === this.state.commFreq)
                                selected = true;
                            return (
                              <option value={item} selected={selected} key={item}>{item}</option>
                            )
                          })}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputCity" className="control-label">City</label>
                      <input value={this.state.city} type="text" className="form-control" id="inputCity" onChange={(e) => this.updateCity(e.target.value)} />
                    </div>
                      <div className="form-group">
                        <label htmlFor="state_id" className="control-label">State</label>
                        <select className="select form-control" id="state_id" placeholder="State" value={this.state.state} onChange={(e) => this.updateState(e.target.value)}>
                          {States.map((item) => {
                            var selected = false;
                            if(item === this.state.state)
                                selected = true;
                            return (
                              <option value={item} selected={selected} key={item}>{item}</option>
                            )
                          })}
                        </select>
                    </div>
                  </div>
                  <div className="panel-heading clearfix">
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
              <p className='text-danger'>{this.state.error}</p>
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
