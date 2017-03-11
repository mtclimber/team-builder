'use strict';

const React = require('react');
const _ = require('lodash');
const d3 = require('d3');
const c3 = require('c3');
import PageHeader from '../../shared/PageHeader.jsx';
import HappinessChart from './HappinessChart.jsx';
import Loading from '../../shared/Loading.jsx';
import TeamApi from '../../../api/TeamApi.js';
import ChurchApi from '../../../api/ChurchApi.jsx';
import config from '../../../../../lib/config.js';

class Report extends React.Component{

  constructor() {
    super();
    this.state = {
      dataPoints: [],
      loading: true,
      focusedId: config.loggedInId
    }
  }

  convertDataPointToPercentage(dp) {
    var total = dp.sad + dp.mad + dp.good + dp.great;
    dp.sad = Math.floor(100 * (dp.sad / total));
    dp.mad = Math.floor(100 * (dp.mad / total));
    dp.good = Math.ceil(100 * (dp.good / total));
    dp.great = Math.ceil(100 * (dp.great / total));

    while(dp.sad + dp.mad + dp.good + dp.great > 100)
      dp.great -= 1;

    while(dp.sad + dp.mad + dp.good + dp.great < 100)
      dp.great += 1;

    return dp;
  }

  componentDidMount() {
    ChurchApi.getChartData(this.state.focusedId, (response) => {
      this.state.loading = false;
      for(var i = 0; i < response.length; i++) {
        this.state.dataPoints.push(this.convertDataPointToPercentage(response[i]));
      }
      this.setState(this.state);
    });
  }

  clicked(index) {
    var dp = this.state.dataPoints[index];
    if(dp.hasTeamMembers) {
      this.state.focusedId = dp.id;
      ChurchApi.getChartData(this.state.focusedId, (response) => {
        this.state.loading = false;
        this.state.dataPoints = [];
        for(var i = 0; i < response.length; i++) {
          this.state.dataPoints.push(this.convertDataPointToPercentage(response[i]));
        }
        this.setState(this.state);
      });

      this.state.loading = true;
      this.setState(this.state);
    } else {
      console.log('listen');
      window.location='/partnerships/' + dp.name;
    }
  }
  
  renderContent() {
    return (
      <div className='row'>
          <div className='col-xs-12'>
            <HappinessChart clicked={(index) => this.clicked(index)} categories={this.state.dataPoints} />
          </div>
        </div>
    );
  }
  
  render() {
    let loading = (<Loading />);
    if(this.state.loading === false) {
      loading = this.renderContent();
    }
    return (
      <div>
        <PageHeader />
        {loading}
      </div>
    );
  }
};

module.exports = Report;
