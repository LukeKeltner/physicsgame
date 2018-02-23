import React, { Component } from 'react';
import '../assets/styles/questionicon.css'
import challenge from '../assets/images/icons/challenge.svg'

class Report extends Component 
{
	state =
	{

	}

	componentWillMount = () =>
	{
		console.log("HEY THERE!!!")
		console.log(this.props)
	}

	render()
	{
		return(
			<span>
			{this.props.correct 
				? <i className="fas fa-check-circle correct"></i>
				: this.props.wrong
				? <i className="fas fa-times-circle wrong"></i>
				: this.props.challenge
				? <img className="challenge-icon-status" alt="challenge" src={challenge}/>
				: <i className="fas fa-circle"></i>
			}
			</span>
		)
	}
}

export default Report;