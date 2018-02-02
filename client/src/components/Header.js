import React, { Component } from 'react';
import '../assets/styles/header.css'
//import coin from '../assets/images/coin.png'


class Header extends Component 
{
	state =
	{
		name: this.props.name,
		coins: this.props.coins,
		styles: [],
		currentColor: this.props.background
	}

	componentWillMount = () =>
	{
		if (this.props.background !== "")
		{
			const newStyles = 
			{
				backgroundColor: this.props.background
			}

			const array = []
			array.push(newStyles)
			this.setState({styles: array})
		}
	}

	componentWillReceiveProps  = nextProps =>
	{
		const newStyles = 
		{
			backgroundColor: nextProps.background
		}
		const array = []
		array.push(newStyles)
		this.setState({styles: array})
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

	toGrades = () =>
	{
		window.location="/grades"
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
						{this.props.teacher === "yes"
							?
								<button type="button" className="btn btn-info" onClick={this.toGrades}>Check Grades</button>
							:
								""
						}
					</div>
					<div className="col-md-2 coins text-center">
						{/*<img className="coin" alt="coins" src={coin} />*/}
						{this.props.coins.toLocaleString()}
					</div>
					<div className="col-md-5">
						<div className="row">
							<div className="col-md-2 text-center">

							</div>
							<div className="col-md-2 text-center">
								<i className="fas fa-question-circle fa-2x header-button" onClick={this.toHub}></i>
								<br></br>
								<div className="icon-name">Coins!</div>
							</div>
							<div className="col-md-2 text-center">
								<i className="fas fa-list-alt fa-2x header-button" onClick={this.toStatus}></i>
								<br></br>
								<div className="icon-name">Status</div>
							</div>
							<div className="col-md-2 text-center">
								<i className="fas fa-shopping-cart fa-2x header-button" onClick={this.toStore}></i>
								<br></br>
								<div className="icon-name">Store</div>
							</div>
							<div className="col-md-2 text-center">
								<i className="fas fa-trophy fa-2x header-button" onClick={this.toLeaderboard}></i>
								<br></br>
								<div className="icon-name">Leaders</div>
							</div>
							<div className="col-md-2 text-center">
								<i className="fas fa-arrow-alt-circle-right fa-2x header-button" onClick={this.logout}></i>
								<br></br>
								<div className="icon-name">Logout</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			)
	}

}

export default Header;