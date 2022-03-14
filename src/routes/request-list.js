import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Headline,
  Pane,
  Paneset,
  MultiColumnList,
  Icon,
} from '@folio/stripes/components';

/* Request List component that renders
*/

export default class RequestList extends React.Component {
  static propTypes = {
    resources: PropTypes.shape({
      requests: PropTypes.shape({
        hasLoaded: PropTypes.bool.isRequired,
        records: PropTypes.any,
      }),
      locations: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      checkIn: PropTypes.shape({
        POST: PropTypes.func,
      }),
    }).isRequired, 
  }

  static manifest = Object.freeze({
    requests: {
      type: 'okapi',
      path: 'circulation/requests?query=%28status%3D%3D%22Open%20-%20Not%20yet%20filled%22%20and%20requestType%3D%3D%22Page%22%29%20sortby%20requestDate'
    },
    checkIn: {
      type: 'okapi',
      path: '/circulation/check-in-by-barcode',
      /* cf. Scan.js in Checkin app */
      fetch: false,
      throwErrors: false,
    },
    locations: {
      type: 'okapi',
      path: '/locations?query=servicePointIds=="*\\":{sp:-}\\"*"',
    }
  });

  constructor(props) {
    super(props);
    console.log("0", this);
  }

  renderRequestList() {
    return (
      <MultiColumnList contentData={this.buildRequestListRows()}>
      </MultiColumnList>
    );
  }

  buildRequestListRows() {
    const csp = this.determineCurrentServicePoint();
    const requests = this.props.resources.requests.records[0].requests.filter(request => !csp || request.item.location.code == csp);
    console.log("b", requests);

    return requests.map((request) => {
      return {
        callNumber: this.formatCallNumber(request.item.callNumberComponents),
        title: request.item.title,
        barcode: request.item.barcode,
        pickupServicePoint: request.pickupServicePoint.name,
        //checkin: <Button>Checkin</Button>,
        checkin: <Button onClick={() => this.checkIn(request.item.barcode)} >Checkin</Button>,
      }
    });
  }
  
  determineCurrentServicePoint() {
    const pn = this.props.location.pathname;
    return pn.startsWith('/stackrequests/') ? pn.substring(15) : '';
  }

  formatCallNumber(cnc) {
    console.log("d", cnc);
    return ( 
        (cnc.prefix ? cnc.prefix + '/' : '')
      + cnc.callNumber
      + (cnc.suffix ? ' ' + cnc.suffix : '')
    );
  }

  checkIn(barcode) {
    alert(`Checking in ${barcode}`); 
  }

  render() {
    const { health, requests } = this.props.resources;
    const healthResourceAvaliable = health && health.hasLoaded;
    const requestsAvailable = requests && requests.hasLoaded; 
    console.log("a", requestsAvailable, requests);

    return (
      <Paneset static>
        <Pane defaultWidth="100%" paneTitle="List of Requests">
          {requestsAvailable
            ? this.renderRequestList()
            : <Icon icon="spinner-ellipsis" />
          }
        </Pane>
      </Paneset>
    );
  }
}

