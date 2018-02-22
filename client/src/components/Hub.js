import React, { Component } from 'react';
import '../assets/styles/hub.css'
import API from "../utils/API";
import Topic from './Topic';
import GambleAmount from './GambleAmount';


class Hub extends Component 
{
	state =
	{
		topic: "",
		subtopic: "",
		gamble: 0,
		allTopics: [],
		allSubtopics: [],
		gambleAmounts: [1, 20, 50],
		name:"",
		coins: 0,
		id: 0,
		teacher: "",
		styles: [],
		theme: "",
		challanges: [],
		challengeQuestionId: 0,
		currentChallenger: 0,
		currentChallengeId: 0
	}

	componentWillMount = () =>
	{

		const This = this;
		const token = sessionStorage.getItem('token');

		API.getUser(token).then(function(user)
		{
			if (user.data[0].currentquestion !== 0 && user.data[0].challenging.data[0] === 0)
			{
				alert("You haven't answered a question, go answer it!")
				window.location = "/question"
			}

			else if (user.data[0].currentquestion !== 0 && user.data[0].challenging.data[0] !== 0)
			{
				alert("You have already accepted a challenge!")
				window.location = "/challengequestion"
			}

			else
			{
				API.getAllTopics().then(function(result)
				{
					const newStyles = 
					{
						backgroundColor: user.data[0].headercolor
					}

					const array = []
					array.push(newStyles)

					const data = 
					{
						userid: user.data[0].id
					}

					API.getChallenges(data).then(challanges =>
					{
						console.log(challanges.data)
						This.setState({id: user.data[0].id, name: user.data[0].name, coins: user.data[0].coins, teacher:user.data[0].teacher, allTopics: result.data, styles: newStyles, theme: user.data[0].headercolor, challanges: challanges.data})
					})
				})
			}
		})
	}

	topicSelected = event =>
	{
		const This = this;
		const topic = event.target.innerHTML
		const topics = document.getElementsByClassName("topics")

		for (let i=0; i<topics.length; i++)
		{
			topics[i].classList.remove("selected")
		}

		const subtopics = document.getElementsByClassName("subtopics")

		for (let i=0; i<subtopics.length; i++)
		{
			subtopics[i].classList.remove("selected")
		}

		event.target.classList.add("selected")

		API.getAllSubtopics(topic).then(function(result)
		{
			This.setState({topic: topic, allSubtopics: result.data, subtopic: ""})
		})
	}

	subtopicSelected = event =>
	{
		this.setState({subtopic: event.target.innerHTML})
		const subtopics = document.getElementsByClassName("subtopics")

		for (let i=0; i<subtopics.length; i++)
		{
			subtopics[i].classList.remove("selected")
		}

		event.target.classList.add("selected")
	}

	viewChallenges = event =>
	{
		this.setState({topic: "", subtopic: "", gamble: 0})
		const topics = document.getElementsByClassName("topicContainer")
		for (let i=0; i<topics.length; i++)
		{
			topics[i].classList.remove("selected")
		}

		const cover = document.getElementsByClassName("cover-challenge-view-container")
		cover[0].classList.add("display");		
	}

	back = event =>
	{
		const cover = document.getElementsByClassName("cover-challenge-view-container")
		cover[0].classList.remove("display");			
	}

	activeChallenge = event =>
	{
		for (let i=0; i<document.getElementsByClassName("challenger").length; i++)
		{
			document.getElementsByClassName("challenger")[i].classList.remove("challenger-active")
		}

		event.target.classList.add("challenger-active");
		this.setState({challengeQuestionId: event.target.id, currentChallenger:event.target.getAttribute("challenger"), currentChallengeId: event.target.getAttribute("challengeid")})
	}

	gambleSelected = event =>
	{
		this.setState({gamble: event.target.innerHTML})

		const gamble = document.getElementsByClassName("gamble")

		for (let i=0; i<gamble.length; i++)
		{
			gamble[i].classList.remove("selected")
		}

		event.target.classList.add("selected")
	}

	componentDidUpdate = () =>
	{
		if (this.state.topic !== "" && this.state.subtopic !== "" && this.state.gamble !== 0)
		{
			this.getNewQuestion()
		}
	}

	getNewQuestion = () =>
	{
		const This = this;
		const data = 
		{
			topic: this.state.topic,
			subtopic: this.state.subtopic,
			userid: this.state.id
		}

		API.getNewQuestion(data).then(function(result)
		{
			if (result.data.length === 0)
			{
				alert("You've already answered all quesitons in this Subtopic!")
				window.location.reload()
			}

			else
			{
				const data2 =
				{
					column: "currentgamble",
					value: parseInt(This.state.gamble, 10),
					whereField: "id",
					whereValue: This.state.id
				}

				API.updateUser(data2).then(function(result2)
				{

					const data3 =
					{
						column: "currentquestion",
						value: result.data[0].id,
						whereField: "id",
						whereValue: This.state.id
					}
					
					API.updateUser(data3).then(function(result3)
					{
						window.location="/question"
					})
				})
			}
		})
	}

	goToChallenge = event =>
	{
		const This = this
		const gambleAmountData =
		{
			column: "currentgamble",
			value: 150,
			whereField: "id",
			whereValue: this.state.id
		}

		API.updateUser(gambleAmountData).then(function(result2)
		{
			const challengeQuestion =
			{
				column: "currentquestion",
				value: This.state.challengeQuestionId,
				whereField: "id",
				whereValue: This.state.id
			}
					
			API.updateUser(challengeQuestion).then(function(result3)
			{
				const userChallenging = 
				{
					column: "challenging",
					value: 1,
					whereField: "id",
					whereValue: This.state.id
				}

				API.updateUser(userChallenging).then(function(result4)
				{

					const currentChallenger = 
					{
						column: "currentchallenger",
						value: This.state.currentChallenger,
						whereField: "id",
						whereValue: This.state.id
					}

					API.updateUser(currentChallenger).then(function(result5)
					{	

						const challengeId = 
						{
							column: "currentchallengeid",
							value: This.state.currentChallengeId,
							whereField: "id",
							whereValue: This.state.id
						}	

						API.updateUser(challengeId).then(function(result6)
						{	
							window.location="/challengequestion"
						})
					})
				})
			})
		})
	}

	render()
	{
		return(
			<div>
					<div className="cover-challenge-view-container">
						<div className="cover">
							<div className="cover-challenge-view-result">
								Your Challenges
								<br></br>
								<div className="challengers-container">
									{this.state.challanges.map((challenge, i) =>
										{
											return <div key={i} id={challenge.questionid} challenger={challenge.id} challengeid={challenge.challengeid} className="challenger" onClick={this.activeChallenge}>
														{challenge.firstname} {challenge.lastname}
														<br></br>
														{challenge.topic}: {challenge.subtopic}
													</div>
										})
									}
								</div>
								<div className="row">
									<div className="col-6">
										<button type="button" className="btn btn-primary" onClick={this.back}>Back</button>
									</div>
									<div className="col-6">
										<button type="button" className="btn btn-danger float-right challenge-button" onClick={this.goToChallenge}>Accept challenge!</button>
									</div>
								</div>
							</div>
						</div>
					</div>




				<div className="container">

					<div className="row">
						<div className="col-md-4">
							<div className="topic-container" style={this.state.styles}>
								<div className="topic-header">
									Topics
								</div>
							</div>
							{this.state.allTopics.map((topic, i) =>
								{
									return <Topic key={i} name={topic.topic} topicSelected={this.topicSelected} theme={this.state.theme} className="topicContainer topics"/>
								})
							}	
						</div>
						<div className="col-md-4">
							<div className="topic-container" style={this.state.styles}>
								<div className="topic-header">
									Subtopics
								</div>
							</div>
							{this.state.allSubtopics.map((topic, i) =>
								{
									return <Topic key={i} name={topic.subtopic} topicSelected={this.subtopicSelected} theme={this.state.theme} className="topicContainer subtopics"/>
								})
							}
							
						</div>
						<div className="col-md-4">
							<div className="topic-container" style={this.state.styles}>
								<div className="topic-header">
									Wager
								</div>
							</div>
							{this.state.gambleAmounts.map((amount, i) =>
								{
									return <GambleAmount key={i} amount={amount} gambleSelected={this.gambleSelected} theme={this.state.theme} className="topicContainer gamble text-center"/>
								})
							}

						</div>
					</div>

					<div className="row">
						<div className="col-md-4">
							<div className="topic-container" style={this.state.styles}>
								<div className="topic-header">
										Challenges
										<div className="float-right">{this.state.challanges.length}</div>
								</div>
							</div>

							<Topic name="View your challenges!" topicSelected={this.viewChallenges} theme={this.state.theme} className="topicContainer viewChallenges"/>
						</div>
					</div>
				</div>
			</div>

		)
	}
}

export default Hub;