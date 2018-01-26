import React, { Component } from 'react';
import '../assets/styles/questionicon.css'

class Report extends Component 
{
	state =
	{

	}

	render()
	{
		return(
			<span>
			{this.props.correct 
				? <i className="fas fa-check-circle fa-2x correct"></i>
				: this.props.wrong
				? <i className="fas fa-times-circle fa-2x wrong"></i>
				: <i className="fas fa-circle fa-2x"></i>
			}
			</span>
		)
	}
}

export default Report;