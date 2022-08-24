import React from 'react';
import { Route, Switch } from '@folio/stripes/core';
import PropTypes from 'prop-types';
import RequestList from './routes/request-list';

/*
  This is the main entry point into our brand new testing app.
*/

class StackRequests extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
    stripes: PropTypes.shape({
      connect: PropTypes.func
    })
  };

  constructor(props) {
    super(props);
    this.connectedRequestList = props.stripes.connect(RequestList);
  }

  render() {
    const {
      showSettings,
      match: {
        path
      }
    } = this.props;

    return (
      <Switch>
        <Route exact path={path} component={this.connectedRequestList} />
        <Route path={`${path}/:sp?`} component={this.connectedRequestList}>
        </Route>
      </Switch>
    );
  }
}

export default StackRequests;
