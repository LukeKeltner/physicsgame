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
		const topicsToFill = []
		API.getUser().then(function(user)
		{
			const correctdata = 
			{
				table: "correctlookup",
				id: user.data[0].id
			}

			API.findAnsweredQuestions(correctdata).then(function(corrects)
			{
				const wrongdata = 
				{
					table: "wronglookup",
					id: user.data[0].id
				}

				API.findAnsweredQuestions(wrongdata).then(function(wrongs)
				{
					console.log(corrects.data)
					console.log(wrongs.data)

					API.getAllTopics().then(function(result)
					{
						for (let i=0; i<result.data.length; i++)
						{
							API.getAllSubtopics(result.data[i].topic).then(function(result2)
							{
								const subtopics = []

								result2.data.forEach(element =>
								{
									API.findAllQuestions(element.subtopic).then(function(allQuestions)
									{
										const subtopic = []
										const correctsArray = []
										const wrongsArray = []
										subtopic.push(element.subtopic)
										subtopic.push(allQuestions.data.length)

										console.log("-------------------------------")
										console.log(allQuestions.data)
										allQuestions.data.forEach(question =>
										{
											let correctBoolean = false;
											let wrongBoolean = false;
											
											for (let j=0; j<corrects.data.length; j++)
											{
												console.log("Looking to see if question #"+question.id+" is the same as as the correctsloopup id of "+corrects.data[j].questionid)
												if (corrects.data[j].questionid === question.id)
												{
													correctBoolean = true;
													console.log("Question number "+question.id+" is correct!")
													break;	
												}										
											}

											if (!correctBoolean)
											{
												for (let j=0; j<wrongs.data.length; j++)
												{
													console.log("Looking to see if question #"+question.id+" is the same as as the wrongsloopup id of "+corrects.data[j].questionid)

													if (wrongs.data[j].questionid === question.id)
													{
														wrongBoolean = true;
														console.log("Question number "+question.id+" is wrong!")
														break;
														
													}								
												}
											}

											if (correctBoolean)
											{
												correctsArray.push(1)
												wrongsArray.push(0)
											}

											else if (wrongBoolean)
											{
												correctsArray.push(0)
												wrongsArray.push(1)
											}

											else
											{
												correctsArray.push(0)
												wrongsArray.push(0)																						
											}
											//console.log(question.id)
										})
										subtopic.push(correctsArray)
										subtopic.push(wrongsArray)

										subtopics.push(subtopic)
									})
								})

								result.data[i].subtopics = subtopics
								topicsToFill.push(result.data[i])
							})
						}
					})
				})
			})

			setTimeout(function()
			{
				console.log(topicsToFill)
				This.setState({id: user.data[0].id, name: user.data[0].name, coins: user.data[0].coins, allTopics: topicsToFill})
			}, 3000)
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