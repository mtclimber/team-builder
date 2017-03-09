'use strict';

const React = require('react');

class Church extends React.Component{
  getBackgroundColor() {
    var healthIndex = this.props.healthIndex;
    
    if(healthIndex === '3')
      return "lightseagreen";
    else if(healthIndex === '2')
      return "lightsalmon";
    else if(healthIndex === '1')
      return "lightslategrey";
    else if(healthIndex === '0')
      return "lightcoral";
  }

  getImageSource() {
    var healthIndex = this.props.healthIndex;

    if(healthIndex === '3')
      return "great";
    else if(healthIndex === '2')
      return "good";
    else if(healthIndex === '1')
      return "sad";
    else if(healthIndex === '0')
      return "mad";
  }

  render() {
    const churchSize = '75px';
    return (
      <div className='church-card'>
        <img style={{'height': churchSize, 'width': churchSize}} src={`/images/${this.getImageSource()}.png`} />
        <p className='church-title'>{this.props.name}</p>
        <div style={{'position': 'absolute', 'bottom': '10', 'left': '10'}}>
          <button className='btn btn-primary' style={{'float': 'left', 'marginRight': '5px'}}>Contacted!</button>
          <p>Last Contacted: Dec. 25</p>
        </div>
      </div>
    );
  }
};

module.exports = Church;