import React, { Component } from 'react';
import '../assets/styles/hub.css'
import API from "../utils/API";
import Header from './Header';
import Topic from './Topic';


class Hub extends Component 
{
	state =
	{
		topic: "",
		subtopic: "",
		gamble: 0,
		allTopics: [],
		allSubtopics: []
	}

	componentDidMount = () =>
	{
		const This = this;
		API.getAllTopics().then(function(result)
		{
			console.log(result.data)
			This.setState({allTopics: result.data})
		})
	}

	topicSelected = event =>
	{
		API.getAllSubtopics(event.target.innerHTML).then(function(result)
		{
			console.log(result)
		})
	}

	render()
	{
		return(
			<div>
				<Header />
				<div className="container">
					<div className="row">
						<div className="col-md-5">
							<div className="topic-container">
								<div className="topic-header">
									Topic
								</div>
								{this.state.allTopics.map((topic, i) =>
									{
										return <Topic key={i} name={topic.topic} topicSelected={this.topicSelected}/>
									})}
							</div>
						</div>
						<div className="col-md-5">
							<div className="topic-container">
								<div className="topic-header">
									Subtopic
								</div>

							</div>
						</div>
						<div className="col-md-2">
							<div className="choice-container">
								Topic: {this.state.topic}
								Subtopic: {this.state.subtopic}
								Gamble: {this.state.gamble}
							</div>
						</div>
					</div>
				</div>
			</div>

		)
	}
}

export default Hub;