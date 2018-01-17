import React, { Component } from 'react';

class Answer extends Component 
{
	state =
	{
		type:this.props.type
	}

	clicked = event =>
	{
		console.log("clicked")
	}

	render()
	{
		return(
			<div className="row">
				<div className="col-md-1">
				</div>
				<div className="col-md-11 answerContainer answer1" id={this.props.id}>
					{this.props.text}
				</div>
			</div>
		)
	}
}

export default Answer;