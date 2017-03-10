'use strict';

const React = require('react');
const moment = require('moment');

import PageHeader from '../../shared/PageHeader.jsx';
import ChurchApi from '../../../api/ChurchApi.jsx';
import Loading from '../../shared/Loading.jsx';
import AudienceType from '../../../enums/AudienceTypes.js';
import InteractionType from '../../../enums/InteractionTypes.js';

class HistoryFeed extends React.Component{
  render() {
    return (
      <div>
        {this.props.history.map((item) => {
          const prettyDate = moment(item.date_created).format('MMMM Do YYYY');
          return (
            <div key={item.date}>
              <p style={{'fontWeight': 'bold', 'marginBottom': '0'}}>{prettyDate}</p>
              <div className='well well-sm'>{`${InteractionType[Number(item.interaction_type)]} communication with ${AudienceType[Number(item.audience_type)]}. ${item.note}`}</div>
            </div>
          );
        })}
      </div>
    );
  }
};

module.exports = HistoryFeed;