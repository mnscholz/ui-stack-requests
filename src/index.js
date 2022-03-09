import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import RequestList from './routes/request-list';

/*
  STRIPES-NEW-APP
  This is the main entry point into your new app.
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
        <Route path={`${path}/:loc?`} component={this.connectedRequestList}>
        </Route>
      </Switch>
    );
  }
}

export default StackRequests;
