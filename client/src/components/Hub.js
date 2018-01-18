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
		API.getUser().then(function(user)
		{
			API.getAllTopics().then(function(result)
			{
				This.setState({id: user.data[0].id, name: user.data[0].name, coins: user.data[0].coins, allTopics: result.data})
			})
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
		const data = 
		{
			topic: this.state.topic,
			subtopic: this.state.subtopic,
			userid: this.state.id
		}

		API.getNewQuestion(data).then(function(result)
		{
			console.log(result)
		})
	}

	render()
	{
		return(
			<div>
				<Header name={this.state.name} coins={this.state.coins}/>
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