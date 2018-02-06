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
		studentIds: []
	}

	componentWillReceiveProps = nextProps =>
	{
		const This = this;
		this.setState({section: nextProps.section, teacher:nextProps.teacher})

		const data = 
		{
			section: nextProps.section,
			teacher: nextProps.teacher
		}

		API.findAllStudents(data).then(students =>
		{
			if (Array.isArray(students.data))
			{
				This.setState({studentIds: students.data})
				console.log(students.data)
			}
		})
	}

	render()
	{
		return(
			<div>
				{
					this.state.studentIds.map(student =>
					{
						return student.id
					})
				}
			</div>
			)
	}

}

export default SingleClassReport;