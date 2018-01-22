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
		id: 0,
		testArray: [1,2,3,4,5]
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
						const subtopics = []

						result2.data.forEach(element =>
						{
							subtopics.push(element.subtopic)
						})

						result.data[i].subtopics = subtopics
					})
				}

				setTimeout(function()
				{
					This.setState({id: user.data[0].id, name: user.data[0].name, coins: user.data[0].coins, allTopics: result.data})
				}, 1000)
			})
		})
	}

	render()
	{
		return(
			<div>
				<Header name={this.state.name} coins={this.state.coins}/>
				<div className="container">
					{this.state.allTopics.map((topic, i) =>
						{
							return <Report key={i} topic={topic.topic} subtopics={topic.subtopics}/>
						})}
				</div>
			</div>

		)
	}
}

export default Status;