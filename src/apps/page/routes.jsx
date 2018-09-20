/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import Detail from './detail/index.jsx';
import Month from './month/index.jsx';
import Bill from './bill/index.jsx';

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/detail" component={Detail}/>
        <Route exact path="/month" component={Month}/>
        <Route exact path="/bill" component={Bill}/>
        <Redirect from="/" to="/month"/>
      </Switch>
    );
  }
}

export default Routes;