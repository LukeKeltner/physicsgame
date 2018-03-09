import React, { Component } from 'react';
import '../assets/styles/hub.css'
import API from "../utils/API";
import Report from './Report';


class Status extends Component 
{
	state =
	{
		allTopics: [],
		totalScore: [],
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

					const challengedata = 
					{
						table: "challengelookup",
						id: user.data[0].id
					}

					API.findChallenges(challengedata).then(challenges =>
					{
						console.log(challenges)
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
											const challengesArry = []
											subtopic.push(element.subtopic)
											subtopic.push(allQuestions.data.length)

											allQuestions.data.forEach(question =>
											{
												let correctBoolean = false;
												let wrongBoolean = false;
												let challengeBoolean = false;
													
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

												if (!correctBoolean && !wrongBoolean)
												{
													for (let j=0; j<challenges.data.length; j++)
													{
														if (challenges.data[j].questionid === question.id)
														{
															challengeBoolean = true;
															break;	
														}								
													}													
												}

												if (correctBoolean)
												{
													correctsArray.push(1)
													wrongsArray.push(0)
													challengesArry.push(0)
												}

												else if (wrongBoolean)
												{
													correctsArray.push(0)
													wrongsArray.push(1)
													challengesArry.push(0)
												}

												else if (challengeBoolean)
												{
													correctsArray.push(0)
													wrongsArray.push(0)
													challengesArry.push(1)
												}

												else
												{
													correctsArray.push(0)
													wrongsArray.push(0)	
													challengesArry.push(0)																					
												}
											})

											subtopic.push(correctsArray)
											subtopic.push(wrongsArray)
											subtopic.push(challengesArry)
											subtopics.push(subtopic)
											finished2.push(i)


											if (finished1.length === result.data.length && finished2.length === totalSubtopics)
											{

												//Finding total percentage in each topic
												topicsToFill.forEach(element =>
												{
													let rights = 0;
													let total = 0;
													element.subtopics.forEach(subtopic =>
													{
														subtopic[2].forEach(question =>
														{
															rights = rights + question;
															total = total + 1;
														})
													})

													const totalPercent = (100*rights/total).toFixed(0)
													element.totalPercent = totalPercent;
												})

												console.log(topicsToFill)

												This.setState({id: user.data[0].id, name: user.data[0].name, coins: user.data[0].coins, allTopics: topicsToFill})		
											}
										})
									})

									result.data[i].subtopics = subtopics
									topicsToFill.push(result.data[i])
									finished1.push(i)
								})
							}
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
				<div className="container">
					{this.state.allTopics.map((topic, i) =>
						{
							return <Report key={i} id={i} userid={this.state.id} coins={this.state.coins} topic={topic.topic} subtopics={topic.subtopics} totalPercent={topic.totalPercent}/>
						})}
				</div>
			</div>
		)
	}
}

export default Status;