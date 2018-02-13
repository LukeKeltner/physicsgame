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
		wrongSound: new Audio(wrongSound),
		newQuestion: 0
	}

	componentDidMount = () =>
	{
		const This = this;
		const token = sessionStorage.getItem('token');

		API.getUser(token).then(function(user)
		{
			console.log(user.data[0])
			if (user.data[0].currentquestion === 0)
			{
				alert("Please select a question")
				window.location = "/hub"
			}

			else
			{
				API.getQuestion(user.data[0].currentquestion).then(function(result)
				{
					if (result.data.question.img)
					{
						This.setState({img: require("../assets/images/"+result.data.question.img)})
					}

					if (result.data.totalcorrect === 0 && result.data.totalwrong === 0)
					{
						This.setState({successRate: "You're the first to try this question!"})
					}

					else
					{
						const rate = (result.data.totalcorrect/(result.data.totalcorrect+result.data.totalwrong)*100).toFixed(0)
						This.setState({successRate: rate+"%"})
					}

					This.setState(
					{
						id: user.data[0].id,
						name: user.data[0].name,
						coins: user.data[0].coins,
						currentgamble: user.data[0].currentgamble,
						currentquestion: user.data[0].currentquestion,
						topic:result.data.topic,
						subtopic:result.data.subtopic,
						text:result.data.question.text,
						correct:result.data.question.correct,
						wrong:result.data.question.wrong,
						answers:result.data.shuffledAnswers,
						numberCorrect:result.data.question.correct.length,
					})
				})
			}
		})
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

		console.log(tempAnswers)

		this.setState({answers:tempAnswers})
	}

	submit = event =>
	{
		const cover = document.getElementsByClassName("cover-container")
		cover[0].classList.add("display");
		const This = this;

		const datatest =
		{
			answers: this.state.answers,
			userid: this.state.id,
			questionid: this.state.currentquestion,
			currentgamble: this.state.currentgamble,
			coins: this.state.coins
		}

		API.determineResult(datatest).then(result =>
		{
			if (result.data === "correct")
			{
				This.state.correctSound.play()
				This.setState({result: `Correct!  +${This.state.currentgamble}`})
			}

			else
			{
				This.state.wrongSound.play()
				This.setState({result: `Incorrect!  -${This.state.currentgamble}`})
			}

			const data = 
			{
				topic: This.state.topic,
				subtopic: This.state.subtopic,
				userid: This.state.id
			}

			API.getNewQuestion(data).then(function(result)
			{
				console.log("Here's the question!")
				console.log(result)

				if (result.data.length !== 0)
				{
					This.setState({newQuestion: result.data[0].id})
				}

			});
		})
	}

	back = event =>
	{
		window.location="/hub"
	}

	newQuestion = event =>
	{
		const data3 =
		{
			column: "currentquestion",
			value: this.state.newQuestion,
			whereField: "id",
			whereValue: this.state.id
			}
					
		API.updateUser(data3).then(function(result3)
		{
			window.location="/question"
		})
	}

	render()
	{
		return(
			<div>
					<div className="cover-container">
						<div className="cover">
							<div className="cover-result">
								{this.state.result}
								<br></br>
								{this.state.newQuestion === 0
									?
									<div>
										<p className="result-text">You have finished this subtopic!</p>
										<button type="button" class="btn btn-primary" onClick={this.back}>Back</button>
									</div>
									:
									<div>
										<button type="button" class="btn btn-success" onClick={this.newQuestion}>Give me another question!</button>
										<br></br>
										<button type="button" class="btn btn-primary" onClick={this.back}>Back</button>
									</div>
								}
							</div>
						</div>
					</div>
						<div className="container">
							<div className="row">

								<div className="col-md-2 stats">
									<div className="stats-topic">Topic: </div>
										<div className="stats-value float-right">{this.state.topic}</div>
									<br></br>
									<div className="stats-topic">Subtopic: </div>
										<div className="stats-value float-right">{this.state.subtopic}</div>
									<br></br>
									<div className="stats-topic">Wager: </div>
										<div className="stats-value float-right">{this.state.currentgamble} coins</div>
									<br></br>
									<div className="stats-topic">Success Rate: </div>
										<div className="stats-value float-right">{this.state.successRate}</div>
									<br></br>
									<div className="stats-topic">Number of Correct Answers:</div>
										<div className="stats-value float-right">{this.state.correct.length}</div>
									<br></br>

								</div>
									{this.state.img !== ""

										?
										<div className="col-md-6 questionContainer-image">
											<div className="row questionText-image">
												<div className="col-md-12">
													{this.state.text}
													<br></br>
													<img className="question-pic" alt="question-img" src={this.state.img} />
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