import React, { Component } from 'react';
import '../assets/styles//header.css'
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
						<div className="status-button text-center float-right" onClick={this.toStatus}>
							Status
						</div>
					</div>
				</div>
			</div>
			)
	}

}

export default Header;