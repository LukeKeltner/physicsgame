import React, { Component } from 'react';
import '../assets/styles/report.css'
import QuestionIcon from './QuestionIcon';



class Report extends Component 
{
	state =
	{
		quesitons: [],
		percent: 0
	}

	componentWillMount = () =>
	{
		const array = []

		for (let i=0; i<this.props.amount; i++)
		{
			const element = 
			{
				correct: false,
				wrong: false,
			}

			if (this.props.corrects[i] === 1)
			{
				element.correct = true
			}

			else if (this.props.wrongs[i] === 1)
			{
				element.wrong = true
			}

			array.push(element)
		}

		const reducer = (accumulator, currentValue) => accumulator + currentValue;
		const rights = this.props.corrects.reduce(reducer)
		const percent = (rights/this.props.amount).toFixed(2)*100

		this.setState({questions: array, percent: percent})
	}

	reset = event =>
	{
		console.log("----------------------")
		console.log(event.target.getAttribute("userid"))
		console.log(event.target.getAttribute("topic"))
		console.log(event.target.getAttribute("subtopic"))
	}

	render()
	{
		return(

			<div>
				<div className="row subtopic">
					<div className="col-md-1">
					</div>
					<div className="col-md-10">
						{this.props.name}
						<br></br>
						<span>
						{this.state.questions.map((element, i) => 
							{
								return <QuestionIcon key={i} correct={element.correct} wrong={element.wrong}/>
							})}
						</span>
						<div className="float-right">
							{this.state.percent}%
						</div>
					</div>
					<div className="col-md-1">
						<div className="reset float-right" userid={this.props.userid} topic={this.props.topic} subtopic={this.props.name} onClick={this.reset}>
							Reset
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Report;