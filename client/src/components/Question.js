import React, { Component } from 'react';
import '../assets/styles/question.css'
import API from "../utils/API";
import Answer from './Answer'
import correctSound from '../assets/sounds/correct.mp3';
import wrongSound from '../assets/sounds/wrong.mp3';

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
		result: "",
		img: "",
		successRate: 0,
		correctSound: new Audio(correctSound),
		wrongSound: new Audio(wrongSound)
	}

	componentDidMount = () =>
	{
		const This = this;
		const token = sessionStorage.getItem('token');

		API.getUser(token).then(function(user)
		{
			if (user.data[0].currentquestion === 0)
			{
				alert("Please select a question")
				window.location = "/hub"
			}

			else
			{
				API.getQuestion(user.data[0].currentquestion).then(function(result)
				{
					console.log(result.data[0])
					const question = JSON.parse(result.data[0].question)
					const answers = []
					question.correct.forEach(answer => answers.push({text: answer, type: "correct", selected: false}))
					question.wrong.forEach(answer => answers.push({text: answer, type: "wrong", selected: false}))
					const shuffledAnswers = This.shuffle(answers)

					if (question.img)
					{
						This.setState({img: require("../assets/images/"+question.img)})
					}

					if (result.data[0].totalcorrect === 0 && result.data[0].totalwrong === 0)
					{
						This.setState({successRate: "You're the first to try this question!"})
					}

					else
					{
						const rate = (result.data[0].totalcorrect/(result.data[0].totalcorrect+result.data[0].totalwrong)*100).toFixed(0)
						This.setState({successRate: rate+"%"})
					}

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
						numberCorrect:question.correct.length,
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
			this.state.correctSound.play()

			const updateQuestionData = 
			{
				expression: 'totalcorrect = totalcorrect + 1',
				id: this.state.currentquestion
			}

			API.updateQuestion(updateQuestionData).then(result =>
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
					this.setState({result: `Correct!  +${this.state.currentgamble}`})	

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
							}, 1500)
						})					
					})
				})
			})
		}

		else
		{
			this.state.wrongSound.play()
			const updateQuestionData = 
			{
				expression: 'totalwrong = totalwrong + 1',
				id: this.state.currentquestion
			}

			API.updateQuestion(updateQuestionData).then(result =>
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
					this.setState({result: `Incorrect!  -${this.state.currentgamble}`})	

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
							}, 1500)
						})					
					})
				})
			})
		}
	}

	render()
	{
		return(
			<div>
				<div className="container">
					<div className="row">

						<div className="col-md-2 stats">
							<div className="stats-topic">Topic: </div>
								<div className="stats-value float-right">{this.state.topic}</div>
							<br></br>
							<div className="stats-topic">Subtopic: </div>
								<div className="stats-value float-right">{this.state.subtopic}</div>
							<br></br>
							<div className="stats-topic">Gambling: </div>
								<div className="stats-value float-right">{this.state.currentgamble} coins</div>
							<br></br>
							<div className="stats-topic">Success Rate: </div>
								<div className="stats-value float-right">{this.state.successRate}</div>
							<br></br>
							<div className="stats-topic">Number of Correct Answers:</div>
								<div className="stats-value float-right">{this.state.correct.length}</div>
							<br></br>

						</div>
							{this.state.result === "" 

							? 
								this.state.img !== ""

								?
								<div className="col-md-6 questionContainer-image">
									<div className="row questionText-image">
										<div className="col-md-12">
											{this.state.text}
											<br></br>
											<img className="question-pic" src={this.state.img} />
										</div>
									</div>
								</div>

								:
								<div className="col-md-6 questionContainer">
									<div className="row questionText">
										<div className="col-md-12">
											{this.state.text}
										</div>
									</div>
								</div>
							: 
								<div className="col-md-6 questionContainer">
									<div className="row questionText">
										<div className="col-md-12">
											{this.state.result}
										</div>
									</div>
								</div>
							}

						<div className="col-md-4">
							{this.state.answers.map((answer, i) =>
								{
									return <Answer key={i} text={answer.text} id={i} selected={this.selected} clicked={answer.selected}/>
								})
							}
							<div className="row">
								<div className="col-md-1">
									
								</div>
								<div className="col-md-11">
									<button type="button" className="btn btn-primary btn-lg btn-block submit float-right" onClick={this.submit}>Submit</button>
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