import React, { Component } from 'react';
import '../assets/styles/login.css'
import coin from '../assets/images/coin.png'

class Header extends Component 
{
	state =
	{

	}

	render()
	{
		return(
			<div className="container-fluid">
				<div className="row text-center intro">
					<div className="col-md-12">
						<h1>Welcome to Whadaya Know</h1>
						<hr></hr>
						<h3>The site that rewards your knowledge of physics</h3>
					</div>
				</div>
				<div className="row explanation">
					<div className="col-md-6">
						<h3>Pick a topic, bet some coins, get coins for all questions you get right!</h3>
						<br></br>
						<hr></hr>
						<br></br>
						<h3 className="text-right">What out though, you'll lose coins if you get the question wrong!</h3>
					</div>
					<div className="col-md-6 text-center">
						<img src={coin}/>
					</div>
				</div>
				<div className="row what-coins-do">
					<div className="col-md-6 text-center">
						<img src={coin}/>
					</div>
					<div className="col-md-6 text-center">
						<h3>Use coins to buy items in the store or even steal coins from friends!</h3>
					</div>
				</div>
			</div>
			)
	}

}

export default Header;