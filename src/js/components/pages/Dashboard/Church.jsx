'use strict';

const React = require('react');

class FrontCard extends React.Component {
  getProgressBar() {
    var healthIndex = Number(this.props.healthIndex);
    
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
    var healthIndex = Number(this.props.healthIndex);

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
    const days = this.props.lastContacted;
    if(days === '1')
      return `${days} day ago`;
      
    return `${days} days ago`;
  }

  contact() {
    this.props.flipCard(true);
  }

  render() {
    const churchSize = '75px';
    return (
      <div style={{'textAlign': 'center'}}>
        <img style={{'height': churchSize, 'width': churchSize}} src={`/images/${this.getImageSource()}.png`} />
        <div className="progress" style={{'margin': '10px auto 15px auto'}}>
          <div className={`progress-bar progress-bar-${this.getProgressBar()}`} role="progressbar" aria-valuenow={this.props.healthIndex} aria-valuemin="0" aria-valuemax="100" style={{'width': `${this.props.healthIndex}%`}}>
            <span className="sr-only">{`${this.props.healthIndex}%`}</span>
          </div>
        </div>
        <p className='church-title'>{this.props.name}</p>
        <div style={{'position': 'absolute', 'bottom': '10px', 'left': '0px', 'width': '100%'}}>
          <button className='btn btn-primary' style={{'float': 'left', 'marginLeft': '10px'}} onClick={() => this.contact()}>Contact</button>
          <p style={{'marginTop': '6px', 'float': 'right', 'marginRight': '10px'}}>{this.getDaysAgoText()}</p>
        </div>
      </div>
    );
  }
}

class BackCard extends React.Component{
  constructor() {
    super();
    this.state = {
      audience: null,
      interaction: null
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
    this.props.flipCard(false);
  }

  cancel() {
    this.props.flipCard(false);
  }

  render() {
    var audienceTypes = [
      'Church',
      'Group',
      'Individual'
    ]

    var interactionTypes = [
      'Text',
      'Live Chat',
      'Recorded Message',
      'Face to Face'
    ]

    return (
      <div>
        <p className='church-title' style={{'textAlign': 'center', 'marginBottom': '0'}}>Contact Form</p>
        <p style={{'textAlign': 'center'}}>{this.props.name}</p>
        <p style={{'fontWeight': 'bold'}}>What Kind of Audience?</p>
        <div className="list-group">
          {audienceTypes.map((item) => {
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
          {interactionTypes.map((item) => {
            let className = 'list-group-item';
            if(item === this.state.interaction)
             className += ' active';

            return (
              <a key={item} className={className} onClick={() => this.interactionClick(item)} style={{'cursor': 'hand'}}>{item}</a>
            )
          })}
        </div>
        <div>
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
            <FrontCard name={this.props.name} healthIndex={this.props.healthIndex} lastContacted={this.props.lastContacted} flipCard={(flipped) => this.flipCard(flipped)} />
          </div>
          <div className="back">
            <BackCard name={this.props.name} flipCard={(flipped) => this.flipCard(flipped)} />
          </div>
        </div>
      </div>
    );
  }
};

module.exports = Church;