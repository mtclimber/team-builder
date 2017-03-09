'use strict';

const React = require('react');
const d3 = require('d3');
const c3 = require('c3');
import PageHeader from '../../shared/PageHeader.jsx';

class Report extends React.Component{

  componentDidMount() {
    var chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
            ['mad', 10, 80, 0, 25],
            ['sad', 20, 10, 10, 25],
            ['good', 50, 5, 10, 25],
            ['great', 20, 5, 80, 25]
        ],
      type: 'bar',
      order: null,
      groups: [
          ['mad', 'sad', 'good', 'great']
      ]
    },
    axis: {
        x: {
            type: 'category',
            categories: ['Tokyo', 'Takasaki', 'Yokohama', 'Nagoya']
        }
    }
    });
  }

  render() {
    return (
      <div>
        <PageHeader />
        <div className='row'>
          <div className='col-xs-12'>
        <div className='chart'>
          <div id="chart"></div>
        </div>
        </div>
        </div>
      </div>
    );
  }
};

module.exports = Report;
