import React, { Component } from 'react';
import '../assets/styles/grades.css'
import API from "../utils/API";
import SingleStudentGrades from './SingleStudentGrades';


class SingleStudentReport extends Component 
{
	state =
	{
		id: this.props.id,
		name: "",
		topicsAndSubtopics: this.props.topicsAndSubtopics
	}

	componentWillMount = () =>
	{
		const This = this;

		API.getUserById(this.props.id).then(user =>
		{
			This.setState({name: user.data[0].firstname+" "+user.data[0].lastname})
		})		
	}

	componentWillReceiveProps = nextProps =>
	{
		const This = this;

		API.getUserById(nextProps.id).then(user =>
		{
			This.setState({id: nextProps.id, topicsAndSubtopics: nextProps.topicsAndSubtopics, name: user.data[0].firstname+" "+user.data[0].lastname})
		})
	}

	render()
	{
		return(
			<tr>
				<td>{this.state.name}</td>
				{this.state.topicsAndSubtopics.map((topicAndSubtopic, i) =>
					{
						return <SingleStudentGrades key={i} id={this.state.id} topic={topicAndSubtopic.topic} subtopic={topicAndSubtopic.subtopic}/>
					})}
			</tr>
		)
	}
}

export default SingleStudentReport;