import React, { Component } from 'react';
import '../assets/styles/questionicon.css'
import API from "../utils/API";

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
				? <i className="fas fa-check-circle correct"></i>
				: this.props.wrong
				? <i className="fas fa-times-circle wrong"></i>
				: <i className="fas fa-circle"></i>
			}
			</span>
		)
	}
}

export default Report;