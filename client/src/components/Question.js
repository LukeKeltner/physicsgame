import React, { Component } from 'react';
import '../assets/styles/question.css'
import API from "../utils/API";
import Answer from './Answer'
import Header from './Header'

class Question extends Component 
{
	state =
	{
		name: "",
		id: 0,
		coins: 0,
		currentgamble: 0,
		currentquestion: 0,
		topic: "",
		subtopic: "",
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
		const token = sessionStorage.getItem('token');

		API.getUser(token).then(function(user)
		{
			if (user.data.length === 0)
			{
				alert("Please log back in")
				window.location = "/"
			}

			else if (user.data.currentquestion === 0)
			{
				alert("Please select a question")
				window.location = "/hub"
			}

			else
			{
				API.getQuestion(user.data[0].currentquestion).then(function(result)
				{
					const question = JSON.parse(result.data[0].question)
					const answers = []
					question.correct.forEach(answer => answers.push({text: answer, type: "correct", selected: false}))
					question.wrong.forEach(answer => answers.push({text: answer, type: "wrong", selected: false}))
					const shuffledAnswers = This.shuffle(answers)

					This.setState(
					{
						id: user.data[0].id,
						name: user.data[0].name,
						coins: user.data[0].coins,
						currentgamble: user.data[0].currentgamble,
						currentquestion: user.data[0].currentquestion,
						topic:result.data[0].topic,
						subtopic:result.data[0].subtopic,
						text:question.text,
						correct:question.correct,
						wrong:question.wrong,
						answers: shuffledAnswers,
						numberCorrect:question.correct.length
					})
				})
			}
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
		const This = this;
		
		for (let i=0; i<this.state.answers.length; i++)
		{
			if ((this.state.answers[i].type === "correct" && !this.state.answers[i].selected) || (this.state.answers[i].type === "wrong" && this.state.answers[i].selected))
			{
				correct = false;
				break;
			}
		}

		if (correct)
		{
			const data = 
			{
				table: "correctlookup",
				column1: "userid",
				column2: "questionid",
				value1: parseInt(this.state.id),
				value2: parseInt(this.state.currentquestion)
			}

			API.insertLookup(data).then(result =>
			{
				this.setState({result: "Correct!"})	

				const data2 =
				{
					column: "currentquestion",
					value: 0,
					whereField: "id",
					whereValue: This.state.id
				}

				API.updateUser(data2).then(result2 =>
				{
					const newCoins = this.state.coins + this.state.currentgamble
					const data3 =
					{
						column: "coins",
						value: newCoins,
						whereField: "id",
						whereValue: This.state.id
					}

					API.updateUser(data3).then(result3 =>
					{
						setTimeout(() =>
						{
							window.location = "/hub"
						}, 1000)
					})					
				})
			})
		}

		else
		{
			const data = 
			{
				table: "wronglookup",
				column1: "userid",
				column2: "questionid",
				value1: parseInt(this.state.id),
				value2: parseInt(this.state.currentquestion)
			}

			API.insertLookup(data).then(result =>
			{
				this.setState({result: "Inorrect!"})	

				const data2 =
				{
					column: "currentquestion",
					value: 0,
					whereField: "id",
					whereValue: This.state.id
				}

				API.updateUser(data2).then(result2 =>
				{
					const newCoins = this.state.coins - this.state.currentgamble
					const data3 =
					{
						column: "coins",
						value: newCoins,
						whereField: "id",
						whereValue: This.state.id
					}

					API.updateUser(data3).then(result3 =>
					{
						setTimeout(() =>
						{
							window.location = "/hub"
						}, 1000)
					})					
				})
			})
		}
	}

	render()
	{
		return(

			<div>
				<Header name={this.state.name} coins={this.state.coins}/>
				<div className="container">
					<div className="row">
						<div className="col-md-8 questionContainer">
							<div className="float-right">You're gambling {this.state.currentgamble} coins!</div>
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
							<div>
								{this.state.topic}, {this.state.subtopic}
							</div>
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