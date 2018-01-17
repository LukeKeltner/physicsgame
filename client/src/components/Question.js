import React, { Component } from 'react';
import '../assets/question.css'
import API from "../utils/API";
import Answer from './Answer'

class Question extends Component 
{
	state =
	{
		text: "boop",
		answers:[],
		correct: [],
		wrong: [],
		numberCorrect: 0
	}

	componentDidMount = () =>
	{
		const This = this;
		console.log("Hey!")
		API.getQuestion().then(function(result)
		{
			const question = JSON.parse(result.data[0].question)
			const answers = []
			question.correct.forEach(answer => answers.push({text: answer, type: "correct"}))
			question.wrong.forEach(answer => answers.push({text: answer, type: "wrong"}))

			console.log(answers)
			This.setState(
			{
				text:question.text,
				correct:question.correct,
				wrong:question.wrong,
				answers: answers,
				numberCorrect:question.correct.length
			})
		})

		setTimeout(function()
		{
			console.log(This.state)
		}, 1000)
	}

	render()
	{
		return(
			<div className="container">
				<div className="row">
					<div className="col-md-8 questionContainer">
						<div className="questionText">
							{this.state.text}
						</div>
					</div>
					<div className="col-md-4">
						{this.state.answers.map((answer, i) =>
							{
								return <Answer key={i} text={answer.text}/>
							})
						}
					</div>
				</div>

				<div className="row">
					<div className="col-md-8">
					</div>
					<div className="col-md-4">
						<div className="row">
							<div className="col-md-1">
							</div>
							<div className="col-md-11">
								<button type="button" className="btn btn-primary btn-lg btn-block submit">Submit</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Question;