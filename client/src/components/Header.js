import React, { Component } from 'react';
import '../assets/styles/header.css'
import coin from '../assets/images/coin.png'

let styles =
{
	background:
	{
		"backgroundColor":"#6400a8"
	}
}

class Header extends Component 
{
	state =
	{
		name: this.props.name,
		coins: this.props.coins,
		styles: [],
		currentColor: this.props.background
	}

	componentWillUpdate = () =>
	{
		if (this.props.background !== "")
		{
			console.log("Hi!!!")

			const newStyles = 
			{
				backgroundColor: this.state.currentColor
			}

			console.log(newStyles)

			const array = []
			array.push(newStyles)

			this.setState({styles: array})
			console.log(this.state)
		}
	}

	toStatus = () =>
	{
		window.location="/status"
	}

	toStore = () =>
	{
		window.location="/store"
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
			
			<div className="container-fluid header-container" style={this.state.styles[0]}>
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
							<div className="col-md-2 text-center">
								<i className="fas fa-list-alt fa-2x header-button" onClick={this.toStatus}></i>
								<br></br>
								Status
							</div>
							<div className="col-md-2 text-center">
								<i className="fas fa-shopping-cart fa-2x header-button" onClick={this.toStore}></i>
								<br></br>
								Store
							</div>
							<div className="col-md-2 text-center">
								<i className="fas fa-trophy fa-2x header-button" onClick={this.toLeaderboard}></i>
								<br></br>
								Leaderboard
							</div>
							<div className="col-md-2 text-center">
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