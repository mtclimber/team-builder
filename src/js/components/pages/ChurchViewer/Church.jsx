'use strict';

const React = require('react');
import ChurchOverview from './ChurchOverview.jsx';
import ChurchApi from '../../../api/ChurchApi.jsx';
import AudienceTypes from '../../../enums/AudienceTypes.js';
import InteractionTypes from '../../../enums/InteractionTypes.js';

class BackCard extends React.Component{
  constructor() {
    super();
    this.state = {
      audience: null,
      interaction: null,
      notes: '',
      error: ''
    }
  }

  audienceClick(name) {
    this.state.audience = name;
    this.setState(this.state);
  }
  
  interactionClick(name) {
    this.state.interaction = name;
    this.setState(this.state);
  }
  
  save() {
    const at = AudienceTypes.indexOf(this.state.audience);
    const it = InteractionTypes.indexOf(this.state.interaction);
    if(at < 0 || it < 0) {
      this.state.error = 'Choosing an audience and interaction method is required.';
      this.setState(this.state);
    } else {
      ChurchApi.addChurchContact(this.props.id, at, it, this.state.notes, () => {
        this.props.flipCard(false);
        this.state = {
          audience: null,
          interaction: null,
          notes: '',
          error: ''
        }

        this.setState(this.state);
      });
    }
  }

  cancel() {
    this.props.flipCard(false);
  }

  updateNotes(notes) {
    this.state.notes = notes;
    this.setState(this.state); 
  }

  render() {
    return (
      <div>
        <p className='church-title' style={{'textAlign': 'center', 'marginBottom': '0'}}>Contact Form</p>
        <p style={{'textAlign': 'center'}}>{this.props.name}</p>
        <div className='row' style={{'margin': '0 -15px 10px -15px'}}>
          <div className='col-xs-12 col-sm-12 col-md-6'>
            <p style={{'fontWeight': 'bold'}}>What Kind of Audience?</p>
            <div className="list-group">
              {AudienceTypes.map((item) => {
                let className = 'list-group-item';
                if(item === this.state.audience)
                className += ' active';

                return (
                  <a key={item} className={className} onClick={() => this.audienceClick(item)} style={{'cursor': 'hand'}}>{item}</a>
                )
              })}
            </div>
            <p style={{'fontWeight': 'bold'}}>How Did You Interact?</p>
            <div className="list-group">
              {InteractionTypes.map((item) => {
                let className = 'list-group-item';
                if(item === this.state.interaction)
                className += ' active';

                return (
                  <a key={item} className={className} onClick={() => this.interactionClick(item)} style={{'cursor': 'hand'}}>{item}</a>
                )
              })}
            </div>
          </div>
          <div className='col-xs-12 col-sm-12 col-md-6'>
            <p style={{'fontWeight': 'bold'}}>Additional Comments? (Optional)</p>
            <textarea value={this.state.notes} className="form-control" style={{'resize': 'none'}} rows="6" onChange={(e) => this.updateNotes(e.target.value)}></textarea>
          </div>
        </div>
        <div>
          <p className='text-danger'>{this.state.error}</p>
          <button className='btn btn-primary' style={{'marginRight': '10px'}} onClick={() => this.save()}>Save</button>
          <button className='btn btn-danger' onClick={() => this.cancel()}>Cancel</button>
        </div>
      </div>
    );
  }
}

class Church extends React.Component{
  constructor() {
    super();
    this.state = {
      flipped: false
    }
  }

  flipCard(flipped) {
    this.state.flipped = flipped;
    this.setState(this.state);
    if(flipped === true)
      this.props.setFocused(this.props.name);
    else
      this.props.setFocused(null);
  }

  render() {
    const churchSize = '75px';
    let flipclass = 'flip-container';
    if(this.state.flipped === true)
      flipclass += ' flipped';

    return (
      <div className={flipclass}>
        <div className="flipper">
          <div className="front">
            <ChurchOverview id={this.props.id} name={this.props.name} healthIndex={this.props.healthIndex} lastContacted={this.props.lastContacted} flipCard={(flipped) => this.flipCard(flipped)} />
          </div>
          <div className="back">
            <BackCard id={this.props.id} name={this.props.name} flipCard={(flipped) => this.flipCard(flipped)} />
          </div>
        </div>
      </div>
    );
  }
};

module.exports = Church;