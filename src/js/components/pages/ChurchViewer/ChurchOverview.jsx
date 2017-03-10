'use strict';

const React = require('react');
import {Link} from 'react-router';
import Rater from 'react-rater'

class ChurchOverview extends React.Component {
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
    if(days === 1)
      return `${days} day ago`;

    if(days === 0)
      return 'Today';
    return `${days} days ago`;
  }

  contact() {
    this.props.flipCard(true);
  }

  render() {
    const churchSize = '75px';

    return (
      <div style={{'textAlign': 'center'}}>
        <div>
        <Rater interactive={false} rating={this.props.partnerRating} />
        </div>
        <img style={{'height': churchSize, 'width': churchSize}} src={`/images/${this.getImageSource()}.png`} />
        <div className="progress" style={{'margin': '10px auto 15px auto'}}>
          <div className={`progress-bar progress-bar-${this.getProgressBar()}`} role="progressbar" aria-valuenow={this.props.healthIndex} aria-valuemin="0" aria-valuemax="100" style={{'width': `${this.props.healthIndex}%`}}>
            <span className="sr-only">{`${this.props.healthIndex}%`}</span>
          </div>
        </div>
        <p className='church-title'>{this.props.name}</p>
        <div style={{'position': 'absolute', 'bottom': '10px', 'left': '0px', 'width': '100%'}}>
          <button className='btn btn-primary' style={{'float': 'left', 'marginLeft': '10px'}} onClick={() => this.contact()}>Report Contact</button>
          <Link to={'details/' + this.props.id} className='btn btn-primary' style={{'float': 'left', 'marginLeft': '5px'}}>Details</Link>
          <p style={{'marginTop': '6px', 'float': 'right', 'marginRight': '10px'}}>{this.getDaysAgoText()}</p>
        </div>
      </div>
    );
  }
}

module.exports = ChurchOverview;
