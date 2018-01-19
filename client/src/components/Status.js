import React, { Component } from 'react';
import '../assets/styles/hub.css'
import API from "../utils/API";
import Header from './Header';
import Report from './Report';


class Status extends Component 
{
	state =
	{
		allTopics: [],
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
				for (let i=0; i<result.data.length; i++)
				{
					API.getAllSubtopics(result.data[i].topic).then(function(result2)
					{
						result.data[i].subtopics = result2.data
						This.setState({id: user.data[0].id, name: user.data[0].name, coins: user.data[0].coins, allTopics: result.data})
					})
				}
			})
		})
	}

	test = event =>
	{
		console.log(this.state.allTopics[0].subtopics)
	}

	render()
	{
		return(
			<div>
				<Header name={this.state.name} coins={this.state.coins}/>
				<div className="container">
					{this.state.allTopics.map((topic, i) =>
						{
							const subtopics = []

							topic.subtopics.forEach(element =>
							{
								subtopics.push(element.subtopic)
							})
							console.log(topic.subtopics)
							return <Report key={i} topic={topic.topic}/>
						})}
				</div>

				<p onClick={this.test}>Boop</p>
			</div>

		)
	}
}

export default Status;