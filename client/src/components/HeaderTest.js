import React, { Component } from 'react';
import '../assets/styles/header.css'
import coin from '../assets/images/coin.png'

class Header extends Component 
{
	state =
	{
		name: this.props.name,
		coins: this.props.coins,
		styles: [],
		currentColor: this.props.background
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


	render()
	{
		return(
			<div>
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
									<i className="fas fa-question-circle fa-2x header-button"></i>
								</div>
								<div className="col-md-2 text-center">
									<i className="fas fa-list-alt fa-2x header-button"></i>
								</div>
								<div className="col-md-2 text-center">
									<i className="fas fa-shopping-cart fa-2x header-button"></i>
								</div>
								<div className="col-md-2 text-center">
									<i className="fas fa-trophy fa-2x header-button"></i>
								</div>
								<div className="col-md-2 text-center">
									<i className="fas fa-arrow-alt-circle-right fa-2x header-button"></i>
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