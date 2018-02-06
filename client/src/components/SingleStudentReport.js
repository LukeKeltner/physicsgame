import React, { Component } from 'react';
import '../assets/styles/grades.css'
import SingleStudentGrades from './SingleStudentGrades';


class SingleStudentReport extends Component 
{
	state =
	{

	}

	render()
	{
		return(
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.grade}</td>
			</tr>
		)
	}
}

export default SingleStudentReport;