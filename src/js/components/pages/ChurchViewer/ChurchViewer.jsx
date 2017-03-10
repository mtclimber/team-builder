'use strict';

const React = require('react');
const _ = require('lodash');
import PageHeader from '../../shared/PageHeader.jsx';
import ChurchApi from '../../../api/ChurchApi.jsx';
import Churches from './Churches.jsx';
import Loading from '../../shared/Loading.jsx';
class Dashboard extends React.Component{
  constructor() {
    super();
    this.state = {
      partners: [],
      loading: true
    }
  }

  componentDidMount() {
    ChurchApi.getPartners((response) => {
      this.state.loading = false;
      response = _.sortBy(response, ['healthIndex']);
      this.state.partners = response;
      this.setState(this.state);
    });
  }

  render() {
    let loading = null;
    if(this.state.loading === true)
      loading = (<Loading />)
    return (
      <div>
        <PageHeader />
        <Churches churches={this.state.partners}/>  
        {loading}
      </div>
    );
  }
};


module.exports = Dashboard;