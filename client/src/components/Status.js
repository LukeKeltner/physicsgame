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
		const token = sessionStorage.getItem('token');
		const topicsToFill = []

		API.getUser(token).then(function(user)
		{
			if (user.data.length === 0)
			{
				alert("Please log back in")
				window.location = "/"
			}

			else
			{
				This.createSubtopicReport(user, topicsToFill)
/*				const correctdata = 
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

											allQuestions.data.forEach(question =>
											{
												let correctBoolean = false;
												let wrongBoolean = false;
												
												for (let j=0; j<corrects.data.length; j++)
												{
													if (corrects.data[j].questionid === question.id)
													{
														correctBoolean = true;
														break;	
													}										
												}

												if (!correctBoolean)
												{
													for (let j=0; j<wrongs.data.length; j++)
													{
														if (wrongs.data[j].questionid === question.id)
														{
															wrongBoolean = true;
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
				})*/
			}
		})
	}

	createSubtopicReport = async function(user, topicsToFill)
	{
		const This = this;
				const correctdata = 
				{
					table: "correctlookup",
					id: user.data[0].id
				}

				API.findAnsweredQuestions(correctdata).then(async(corrects) =>
				{
					const wrongdata = 
					{
						table: "wronglookup",
						id: user.data[0].id
					}

					API.findAnsweredQuestions(wrongdata).then(async(wrongs) =>
					{
						console.log(corrects.data)
						console.log(wrongs.data)

						API.getAllTopics().then(async(result) =>
						{
							for (let i=0; i<result.data.length; i++)
							{
								console.log(topicsToFill)
								API.getAllSubtopics(result.data[i].topic).then(async(result2) =>
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

											allQuestions.data.forEach(question =>
											{
												let correctBoolean = false;
												let wrongBoolean = false;
												
												for (let j=0; j<corrects.data.length; j++)
												{
													if (corrects.data[j].questionid === question.id)
													{
														correctBoolean = true;
														break;	
													}										
												}

												if (!correctBoolean)
												{
													for (let j=0; j<wrongs.data.length; j++)
													{
														if (wrongs.data[j].questionid === question.id)
														{
															wrongBoolean = true;
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

							setTimeout(function()
							{
								This.setState({id: user.data[0].id, name: user.data[0].name, coins: user.data[0].coins, allTopics: topicsToFill})

							}, 3000)
						})
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
							return <Report key={i} userid={this.state.id} topic={topic.topic} subtopics={topic.subtopics}/>
						})}
				</div>
			</div>

		)
	}
}

export default Status;