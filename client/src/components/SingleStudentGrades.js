import React, { Component } from 'react';
import '../assets/styles/grades.css'
import API from "../utils/API";


class SingleStudentGrades extends Component 
{
	state =
	{
		grade: 34
	}

	componentWillReceiveProps = nextProps =>
	{
		const This = this;
		const id = nextProps.id
		const topic = nextProps.topic
		const subtopic = nextProps.subtopic

		const data = 
		{
			userid: id,
			topic: topic,
			subtopic: subtopic
		}

		API.findCorrectQuestionsFromTopicAndSubtopic(data).then(grade =>
		{
			const gradeDisplay = grade.data.toFixed(0)
			This.setState({grade: gradeDisplay})
		})
	}

	render()
	{
		return(
			<td>{this.state.grade}%</td>
		)
	}
}

export default SingleStudentGrades;