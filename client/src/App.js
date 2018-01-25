import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import logo from './logo.svg';
import './App.css';
import API from "./utils/API";
import Header from './components/Header'
import Login from './components/Login'
import Hub from './components/Hub'
import Question from './components/Question'
import Status from './components/Status'
import NoMatch from './components/NoMatch'

class App extends Component 
{
	state =
	{
		login: false,
		id: 0,
		name: "",
		coins: ""
	}

	componentWillMount = () =>
	{

		if (window.location.pathname === "/")
		{
			this.setState({login: true})
		}

		else
		{
			const This = this;
			const token = sessionStorage.getItem('token');

			API.getUser(token).then(function(user)
			{
				This.setState({id: user.data[0].id, name: user.data[0].name, coins: user.data[0].coins})
			})				
		}
	}

  render() {
    return (

			<div>
				{!this.state.login
					?
					<Header name={this.state.name} coins={this.state.coins}/>
					:
					<div></div>
				}
			    <Router>
			        <Switch>
			        	<Route exact path="/" component={Login} />
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
