'use strict';

const React = require('react');

import PageHeader from '../../shared/PageHeader.jsx';

class Partner extends React.Component{
  render() {
    return (
      <div>
        <PageHeader />
          <form>
                  <fieldset>
                    <div className="formContainer">
                      <h2>Partner Info</h2>
                      <div className="form-group">
                        <label htmlFor="inputPartner" className="control-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputPartner"
                          placeholder=""
                          required />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="inputAddress"
                          className="control-label">
                          Street Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder="Street address, P.O. box, company name, c/o" />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="inputStreet2"
                          className="control-label" />
                        <input
                          type="text"
                          className="form-control"
                          id="inputStreet2"
                          placeholder="Apartment, suite, unit, building, floor, etc." />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="inputCity"
                          className="control-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputCity"
                           />
                      </div>
                      <div className="form-group">
                    		<label for="state_id" className="control-label">State</label>
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
                              type="button"
                              id="buttonCancel"
                              name="buttonCancel"
                              className="btn btn-primary"
                              aria-label="Add">Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>


          </form>
      </div>
    );
  }
};

module.exports = Partner;
