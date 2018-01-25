import React, { Component } from 'react';
import '../assets/styles/hub.css'
import API from "../utils/API";
import Header from './Header';
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
		id: 0
	}

	componentWillMount = () =>
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

			else if (user.data[0].currentquestion !== 0)
			{
				alert("You haven't answered a question, go answer it!")
				window.location = "/question"
			}

			else
			{
				API.getAllTopics().then(function(result)
				{
					This.setState({id: user.data[0].id, name: user.data[0].name, coins: user.data[0].coins, allTopics: result.data})
				})
			}
		})
	}

	topicSelected = event =>
	{
		const This = this;
		const topic = event.target.innerHTML
		API.getAllSubtopics(topic).then(function(result)
		{
			This.setState({topic: topic, allSubtopics: result.data, subtopic: ""})
		})
	}

	subtopicSelected = event =>
	{
		this.setState({subtopic: event.target.innerHTML})
	}

	gambleSelected = event =>
	{
		this.setState({gamble: event.target.innerHTML})
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
			console.log("Here's the question!")
			console.log(result)

			if (result.data.length === 0)
			{
				alert("You've already answered all quesiton in this Subtopic!")
				window.location.reload()
			}

			else
			{
				const data2 =
				{
					column: "currentgamble",
					value: parseInt(This.state.gamble),
					whereField: "id",
					whereValue: This.state.id
				}

				console.log(data2)

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
						<div className="col-md-6">
							<div className="topic-container">
								<div className="topic-header">
									Topics
								</div>
								{this.state.allTopics.map((topic, i) =>
									{
										return <Topic key={i} name={topic.topic} topicSelected={this.topicSelected}/>
									})}
							</div>
						</div>
						<div className="col-md-6">
							<div className="topic-container">
								<div className="topic-header">
									Subtopics in  
									{this.state.topic === "" 
									? "..."
									: " "+this.state.topic
									}
								</div>
								{this.state.allSubtopics.map((topic, i) =>
									{
										return <Topic key={i} name={topic.subtopic} topicSelected={this.subtopicSelected}/>
									})}
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="gamble-container">
								<div className="topic-header">
									Gamble
								</div>
								<div className="row">
								{this.state.gambleAmounts.map((amount, i) =>
									{
										return <GambleAmount key={i} amount={amount} gambleSelected={this.gambleSelected}/>
									})}
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="choice-container">
								<div className="topic-header">
									Your Choices
								</div>
								Topic: {this.state.topic}
								<br></br>
								Subtopic: {this.state.subtopic}
								<br></br>
								Gamble: {this.state.gamble}
								{this.state.topic !== "" && this.state.subtopic !== "" && this.state.gamble !== 0
								?<button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.getNewQuestion}>Go for it!</button>
								:" "}
							</div>
						</div>
					</div>
				</div>
			</div>

		)
	}
}

export default Hub;