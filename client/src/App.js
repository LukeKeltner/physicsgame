import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import logo from './logo.svg';
import './App.css';
import Hub from './components/Hub'
import Question from './components/Question'
import Status from './components/Status'
import NoMatch from './components/NoMatch'

class App extends Component {
  render() {
    return (

			<div>
			    <Router>
			        <Switch>
			            <Route exact path="/hub" component={Hub} />
			            <Route exact path="/question" component={Question} />
			            <Route exact path="/status" component={Status} />
			            <Route component={NoMatch} />
			        </Switch>
			    </Router>
			</div>
    );
  }
}

export default App;
