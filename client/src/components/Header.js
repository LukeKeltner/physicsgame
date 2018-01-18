import React, { Component } from 'react';
import '../assets/styles//header.css'
import API from "../utils/API";
//import coin from '../assets/images/coin.png'

class Header extends Component 
{
	state =
	{
		name: "",
		coins: 0
	}

	componentDidMount = () =>
	{
		const This = this;
		API.getUser().then(function(result)
		{
			This.setState({name: result.data[0].name, coins: result.data[0].coins})
		})
	}

	render()
	{
		return(
			<div className="container-fluid header-container">
				<div className="row">
					<div className="col-md-4">
						<div className="logo">
							Welcome {this.state.name}
						</div>
					</div>
					<div className="col-md-4 coins text-center">
						{this.state.coins}
					</div>
					<div className="col-md-4">
						<div className="status-button text-center float-right">
							Status
						</div>
					</div>
				</div>
			</div>
			)
	}

}

export default Header;