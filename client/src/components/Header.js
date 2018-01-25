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
		sessionStorage.removeItem('token');
		window.location = "/"
	}

	render()
	{
		return(
			
			<div className="container-fluid header-container">
				<div className="row">
					<div className="col-md-4">
						<div className="logo">
							<i className="fas fa-user"></i>Hi {this.props.name}!
						</div>
					</div>
					<div className="col-md-4 coins text-center">
						{this.props.coins}
					</div>
					<div className="col-md-4">
						<div className="row">
							<div className="col-md-4 text-center">
								<i className="fas fa-question-circle fa-3x header-button" onClick={this.toHub}></i>
								<br></br>
								New Question
							</div>
							<div className="col-md-4 text-center">
								<i className="fas fa-list-alt fa-3x header-button" onClick={this.toStatus}></i>
								<br></br>
								Status
							</div>
							<div className="col-md-4 text-center">
								<i className="fas fa-arrow-alt-circle-right fa-3x header-button" onClick={this.logout}></i>
								<br></br>
								Logout
							</div>
						</div>
					</div>
				</div>
			</div>
			)
	}

}

export default Header;