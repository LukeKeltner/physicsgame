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
		currentColor: this.props.background,
		icon: ""
	}

	componentWillReceiveProps  = nextProps =>
	{
		if (nextProps.icon !== "")
		{
			this.setState({icon: require("../assets/images/icons/"+nextProps.icon)})
		}
		const newStyles = 
		{
			backgroundColor: nextProps.background
		}
		const array = []
		array.push(newStyles)
		this.setState({styles: array})
	}


	render()
	{
		return(
			<div className="container-fluid header-container" style={this.state.styles[0]}>
				<div className="row header-row">
					<div className="col-md-5">
						<div className="logo">
							<img className="user-icon" alt="icon" src={this.state.icon} />Hi {this.props.name}!
						{this.props.teacher === "yes"
							?
								<button type="button" className="btn btn-info" onClick={this.toGrades}>Check Grades</button>
							:
								""
						}
						</div>
					</div>
					<div className="col-md-2 text-center">
						<span>
							<div className="coins">{this.props.coins.toLocaleString()}</div>
						</span>

					</div>
					<div className="col-md-5">
					<div className="icon-container">
						<div className="row">
							
								<div className="col-2 text-center">

								</div>
								<div className="col-2 text-center">
									<i className="fas fa-question-circle fa-2x header-button" onClick={this.toHub}>
										<span className="header-tooltip" style={{fontSize:"20px"}}>New question</span>
									</i>
								</div>
								<div className="col-2 text-center">
									<i className="fas fa-list-alt fa-2x header-button" onClick={this.toStatus}>
										<span className="header-tooltip" style={{fontSize:"20px"}}>Status</span>
									</i>
								</div>
								<div className="col-2 text-center">
									<i className="fas fa-shopping-cart fa-2x header-button" onClick={this.toStore}>
										<span className="header-tooltip" style={{fontSize:"20px"}}>Store</span>
									</i>
								</div>
								<div className="col-2 text-center">
									<i className="fas fa-trophy fa-2x header-button" onClick={this.toLeaderboard}>
										<span className="header-tooltip" style={{fontSize:"20px"}}>Leaderboard</span>
									</i>
								</div>
								<div className="col-2 text-center">
									<i className="fas fa-arrow-alt-circle-right fa-2x header-button" onClick={this.logout}>
										<span className="header-tooltip" style={{fontSize:"20px"}}>Logout</span>
									</i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			)
	}

}

export default Header;