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
		this.createSubtopicReport()
	}

	createSubtopicReport = () =>
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
				const correctdata = 
				{
					table: "correctlookup",
					id: user.data[0].id
				}

				API.findAnsweredQuestions(correctdata).then(corrects =>
				{
					const wrongdata = 
					{
						table: "wronglookup",
						id: user.data[0].id
					}

					API.findAnsweredQuestions(wrongdata).then(wrongs =>
					{
						API.getAllTopics().then(result =>
						{
							const finished1 = []
							const finished2 = []
							let totalSubtopics = 0;
							for (let i=0; i<result.data.length; i++)
							{
								API.getAllSubtopics(result.data[i].topic).then(result2 =>
								{
									totalSubtopics = totalSubtopics + result2.data.length
									const subtopics = []

									result2.data.forEach(element =>
									{
										API.findAllQuestions(element.subtopic).then(allQuestions =>
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
											})

											subtopic.push(correctsArray)
											subtopic.push(wrongsArray)
											subtopics.push(subtopic)
											console.log("Adding 1 to finished 2")
											finished2.push(i)

											console.log("FIRST FOR LOOP")
											console.log(finished1.length+" and "+result.data.length)
											console.log("SECOND FOR LOOP")
											console.log(finished2.length+" and "+totalSubtopics)


											if (finished1.length === result.data.length && finished2.length === totalSubtopics)
											{
												This.setState({id: user.data[0].id, name: user.data[0].name, coins: user.data[0].coins, allTopics: topicsToFill})		
											}
										})
									})

									result.data[i].subtopics = subtopics
									topicsToFill.push(result.data[i])
									console.log("Adding 1 to finished 1")
									finished1.push(i)
								})
							}
						})
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