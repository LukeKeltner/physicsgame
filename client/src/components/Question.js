import React, { Component } from 'react';
import '../assets/styles/question.css'
import API from "../utils/API";
import Answer from './Answer'
import Header from './Header'

class Question extends Component 
{
	state =
	{
		text: "",
		answers:[],
		correct: [],
		wrong: [],
		numberCorrect: 0,
		result: ""

	}

	componentDidMount = () =>
	{
		const This = this;
		API.getQuestion().then(function(result)
		{
			const question = JSON.parse(result.data[0].question)
			const answers = []
			question.correct.forEach(answer => answers.push({text: answer, type: "correct", selected: false}))
			question.wrong.forEach(answer => answers.push({text: answer, type: "wrong", selected: false}))
			const shuffledAnswers = This.shuffle(answers)

			This.setState(
			{
				text:question.text,
				correct:question.correct,
				wrong:question.wrong,
				answers: shuffledAnswers,
				numberCorrect:question.correct.length
			})
		})
	}

	shuffle = array =>
	{
			for (let i = array.length - 1; i > 0; i--)
			{
		        const j = Math.floor(Math.random() * (i + 1));
		        [array[i], array[j]] = [array[j], array[i]];
	    	}
	    return array;
	}

	selected = event =>
	{
		const tempAnswers = this.state.answers;

		if (tempAnswers[event.target.id].selected)
		{
			tempAnswers[event.target.id].selected = false;
		}

		else
		{
			tempAnswers[event.target.id].selected = true;
		}

		this.setState({answers:tempAnswers})
	}

	submit = event =>
	{
		let correct = true;
		console.log(this.state.answers)
		
		for (let i=0; i<this.state.answers.length; i++)
		{
			console.log()
			if ((this.state.answers[i].type === "correct" && !this.state.answers[i].selected) || (this.state.answers[i].type === "wrong" && this.state.answers[i].selected))
			{
				correct = false;
				break;
			}
		}

		if(correct)
		{
			this.setState({result: "Correct!"})
		}

		else
		{
			this.setState({result: "Incorrect!"})
		}
	}

	render()
	{
		return(

			<div>
				<Header />
				<div className="container">
					<div className="row">
						<div className="col-md-8 questionContainer">
							<div className="questionText">
							{this.state.result === "" 
							? this.state.text
							: this.state.result
							}
							</div>
						</div>
						<div className="col-md-4">
							{this.state.answers.map((answer, i) =>
								{
									return <Answer key={i} text={answer.text} id={i} selected={this.selected} clicked={answer.selected}/>
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
									<button type="button" className="btn btn-primary btn-lg btn-block submit" onClick={this.submit}>Submit</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Question;