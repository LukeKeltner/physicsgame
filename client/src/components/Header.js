import React, { Component } from 'react';
import '../assets/styles/header.css'
import coin from '../assets/images/coin.png'


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

	toLeaderboard = () =>
	{
		window.location="/leaderboard"
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
					<div className="col-md-5">
						<div className="logo">
							<i className="fas fa-user avatar"></i>Hi {this.props.name}!
						</div>
					</div>
					<div className="col-md-2 coins text-center">
						<img className="coin" alt="coins" src={coin} />{this.props.coins.toLocaleString()}
					</div>
					<div className="col-md-5">
						<div className="row">
							<div className="col-md-3 text-center">
								<i className="fas fa-question-circle fa-2x header-button" onClick={this.toHub}></i>
								<br></br>
								Get coins!
							</div>
							<div className="col-md-3 text-center">
								<i className="fas fa-list-alt fa-2x header-button" onClick={this.toStatus}></i>
								<br></br>
								Status
							</div>
							<div className="col-md-3 text-center">
								<i className="fas fa-trophy fa-2x header-button" onClick={this.toLeaderboard}></i>
								<br></br>
								Leaderboard
							</div>
							<div className="col-md-3 text-center">
								<i className="fas fa-arrow-alt-circle-right fa-2x header-button" onClick={this.logout}></i>
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