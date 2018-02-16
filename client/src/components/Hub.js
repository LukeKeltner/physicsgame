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
	}

	componentWillMount = () =>
	{

		const This = this;
		const token = sessionStorage.getItem('token');

		API.getUser(token).then(function(user)
		{
			if (user.data[0].currentquestion !== 0)
			{
				alert("You haven't answered a question, go answer it!")
				window.location = "/question"
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
					This.setState({id: user.data[0].id, name: user.data[0].name, coins: user.data[0].coins, teacher:user.data[0].teacher, allTopics: result.data, styles: newStyles, theme: user.data[0].headercolor})
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
		console.log("UPDATED!")
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

	render()
	{
		return(
			<div>
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
				</div>
			</div>

		)
	}
}

export default Hub;