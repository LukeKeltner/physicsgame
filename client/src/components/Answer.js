import React, { Component } from 'react';

class Answer extends Component 
{
	state =
	{

	}

	render()
	{
		return(
			<div className="row">
				<div className="col-md-1">
				</div>
				<div className="col-md-11 answerContainer answer1">
					{this.props.text}
				</div>
			</div>
		)
	}
}

export default Answer;