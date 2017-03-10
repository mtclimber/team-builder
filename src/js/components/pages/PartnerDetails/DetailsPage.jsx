'use strict';

const React = require('react');
import PageHeader from '../../shared/PageHeader.jsx';
import ChurchApi from '../../../api/ChurchApi.jsx';
import Loading from '../../shared/Loading.jsx';

class DetailsPage extends React.Component{
  constructor() {
    super();
    this.state = {
      partner: null,
      loading: true,
      error: ''
    }
  }

  componentDidMount() {
    ChurchApi.getPartner(this.props.params.partnerId, (response) => {
      console.log(response);
      if(response.message !== null && response.message !== undefined) {
          this.state.error = 'The partner was not found.';
      } else {
        this.state.partner = response;
      }

      this.state.loading = false;
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
        rawr
        {loading}
        <h1 className='text-danger'>{this.state.error}</h1>
      </div>
    );
  }
};


module.exports = DetailsPage;