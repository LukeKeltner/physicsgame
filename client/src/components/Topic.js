import React, { Component } from 'react';
import '../assets/styles/topic.css'

class Topic extends Component 
{
	state =
	{
		type:this.props.type,
		clicked: this.props.clicked
	}

	render()
	{
		return(
			<div className="row">
				<div className="col-md-1">
				</div>
				<div className="col-md-10 topicContainer" onClick={this.props.topicSelected}>
					{this.props.name}
				</div>
				<div className="col-md-1">
				</div>
			</div>
		)
	}
}

export default Topic;