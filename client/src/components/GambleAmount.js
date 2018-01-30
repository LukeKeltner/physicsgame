import React, { Component } from 'react';
import '../assets/styles/gambleAmount.css'

class Topic extends Component 
{
	render()
	{
		return(
			<div className="row">
				<div className="col-md-12">
					<div className="topicContainer text-center" onClick={this.props.gambleSelected}>
						{this.props.amount}
					</div>
				</div>
			</div>
		)
	}
}

export default Topic;