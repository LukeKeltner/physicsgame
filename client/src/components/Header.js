import React, { Component } from 'react';
import '../assets/styles/header.css'
//import coin from '../assets/images/coin.png'

class Header extends Component 
{
	state =
	{
		name: this.props.name,
		coins: this.props.coins
	}

	toStatus = () =>
	{
		window.location="/status"
	}

	toHub = () =>
	{
		window.location="/hub"
	}

	logout = () =>
	{

	}

	render()
	{
		return(
			<div className="container-fluid header-container">
				<div className="row">
					<div className="col-md-4">
						<div className="logo">
							Welcome {this.props.name}
						</div>
					</div>
					<div className="col-md-4 coins text-center">
						{this.props.coins}
					</div>
					<div className="col-md-4">
						<div className="header-button text-center float-right" onClick={this.logout}>
							Log out
						</div>
						<div className="header-button text-center float-right" onClick={this.toStatus}>
							Status
						</div>
						<div className="header-button text-center float-right" onClick={this.toHub}>
							New Question
						</div>
					</div>
				</div>
			</div>
			)
	}

}

export default Header;