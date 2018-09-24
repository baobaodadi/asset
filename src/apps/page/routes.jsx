/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import Back from './back/index.jsx';

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/back" component={Back}/>
        <Redirect from="/" to="back"/>
      </Switch>
    );
  }
}

export default Routes;