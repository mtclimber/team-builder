'use strict';

const React = require('react');
const d3 = require('d3');
const c3 = require('c3');

class HappinessChart extends React.Component{

  reformData() {
    let data = {
      cats: [],
      great: ['great'],
      good: ['good'],
      sad: ['sad'],
      mad: ['mad']
    }

    this.props.categories.map((cat) => {
      data.cats.push(cat.name);
      data.great.push(cat.great);
      data.good.push(cat.good);
      data.sad.push(cat.sad);
      data.mad.push(cat.mad);
    });

    return data;
  }

  componentDidMount() {
    const data = this.reformData();

    var chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
            data.great,
            data.good,
            data.sad,
            data.mad
        ],
      type: 'bar',
      order: null,
      groups: [
          ['mad', 'sad', 'good', 'great']
      ],
      colors: {
        'mad': 'red',
        'sad': 'orange',
        'good': 'blue',
        'great': 'green'
      }
    },
    axis: {
        x: {
            type: 'category',
            categories: data.cats
        }
    }
    });
  }

  render() {
    return (
     <div className='panel'>
       <h1 style={{'margin': '5px 0px 20px 15px'}}>Japan Team Report</h1>
       <div id="chart"></div>
     </div>
    );
  }
};

module.exports = HappinessChart;
