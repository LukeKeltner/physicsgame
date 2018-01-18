import React, { Component } from 'react';
import '../assets/styles/gambleAmount.css'

class Topic extends Component 
{
	render()
	{
		return(
			<div className="col-md-4">
				<div className="gambleAmount-container text-center" onClick={this.props.gambleSelected}>
					{this.props.amount}
				</div>
			</div>
		)
	}
}

export default Topic;