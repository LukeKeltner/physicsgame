import React, { Component } from 'react';
import '../assets/styles/grades.css'
import SingleStudentReport from './SingleStudentReport';


class SingleClassReport extends Component 
{
	state =
	{

	}

	render()
	{
		return(
				<div className="row">
					<div className="col-2 text-center">
						<table>
						    <thead>
						        <tr>
						            <th>Section</th>
						        </tr>
						    </thead>
						    <tbody>
						        <tr>
						            <td>{this.props.section}</td>
						        </tr>
						    </tbody>
						</table>
					</div>
					<div className="col-10 text-center">
						<table>
						    <thead>
						        <tr>
						            <th>Name</th>
						            <th>Grade</th>
						        </tr>
						    </thead>
						    <tbody>
						    {this.props.students.map((student, i) =>
						    	{
						    		return <SingleStudentReport key={i} name={student} grade={i}/>
						    	})
						    }
						    </tbody>
						</table>
					</div>
				</div>
			)
	}

}

export default SingleClassReport;