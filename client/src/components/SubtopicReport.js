import React, { Component } from 'react';
import '../assets/styles/report.css'
import API from "../utils/API";
import QuestionIcon from './QuestionIcon';



class Report extends Component 
{
	state =
	{
		quesitons: []
	}

	componentWillMount = () =>
	{
		const array = []
		for (let i=0; i<this.props.amount; i++)
		{
			array.push(0)
		}

		this.setState({questions: array})
	}

	render()
	{
		return(

			<div className="row">
				<div className="col-md-1">
				</div>
				<div className="col-md-10 subtopic">
					{this.props.name}
					<br></br>
					<span>
					{this.state.questions.map((element, i) => 
						{
							return <QuestionIcon key={i} />
						})}
					</span>
					<div className="float-right">
						90%
					</div>
				</div>
				<div className="col-md-1">
				</div>
			</div>
		)
	}
}

export default Report;