import React, { Component } from 'react';

class Answer extends Component 
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
				{this.props.clicked === false
				?
					<div className="col-md-11 answerContainer answer" id={this.props.id} onClick={this.props.selected}>
						{this.props.text}
					</div>
				:
					<div className="col-md-11 answerContainer selected-answer" id={this.props.id} onClick={this.props.selected}>
						{this.props.text}
					</div>			
				}
			</div>
		)
	}
}

export default Answer;