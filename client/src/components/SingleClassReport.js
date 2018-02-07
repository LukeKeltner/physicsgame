import React, { Component } from 'react';
import '../assets/styles/grades.css'
import API from "../utils/API";
import SingleStudentReport from './SingleStudentReport';


class SingleClassReport extends Component 
{
	state =
	{
		section: this.props.section,
		teacher: this.props.teacher,
		studentIds: [],
		topicsAndSubtopics: []
	}

	componentWillReceiveProps = nextProps =>
	{
		if (nextProps.section !== "")
		{
			const This = this;
			const data = 
			{
				section: nextProps.section,
				teacher: nextProps.teacher
			}

			this.setState({section: nextProps.section, teacher:nextProps.teacher})

			API.findDistinctTopicsAndSubtopics().then(subtopics =>
			{
				API.findAllStudents(data).then(students =>
				{
					if (Array.isArray(students.data))
					{
						This.setState({studentIds: students.data, topicsAndSubtopics: subtopics.data})
					}
				})
			})
		}
	}

	render()
	{
		return(
			<div className="container-fluid">
				<div className="row text-center">
					<div className="col-md-12">
						Section {this.state.section}'s Grades
							<table>
								<thead>
									<tr>
										<th>Name</th>
										{this.state.topicsAndSubtopics.map((topicAndSubtopic, i) =>
											{
												return (
													<th key={i}>
														{topicAndSubtopic.topic}<hr></hr>
														{topicAndSubtopic.subtopic}
													</th>)
											})}
									</tr>

								</thead>
								<tbody>
								{
									this.state.studentIds.map((student, i) =>
									{
										return <SingleStudentReport key={i} id={student.id} topicsAndSubtopics={this.state.topicsAndSubtopics} />
									})
								}
								</tbody>
							</table>
					</div>
				</div>
			</div>
			)
	}

}

export default SingleClassReport;