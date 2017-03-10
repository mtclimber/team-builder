'use strict';

const React = require('react');
const d3 = require('d3');
const c3 = require('c3');
import PageHeader from '../../shared/PageHeader.jsx';
import HappinessChart from './HappinessChart.jsx';

class Report extends React.Component{

  getDataItem(great, good, sad, mad, name) {
    return {
      name: name,
      great: great,
      good: good,
      sad: sad,
      mad: mad
    };
  }
  render() {
    let data = [
      this.getDataItem(20, 50, 20, 10, 'Tokyo'),
      this.getDataItem(5, 5, 10, 80, 'Takasaki'),
      this.getDataItem(80, 10, 5, 5, 'Yokohama'),
      this.getDataItem(25, 25, 25, 25, 'Nagoya'),
    ];

    return (
      <div>
        <PageHeader />
        <div className='row'>
          <div className='col-xs-12'>
            <HappinessChart categories={data} />
          </div>
        </div>
      </div>
    );
  }
};

module.exports = Report;
