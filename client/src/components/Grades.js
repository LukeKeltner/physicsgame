import React, { Component } from 'react';
import '../assets/styles/grades.css'
import API from "../utils/API";
import SingleClassReport from './SingleClassReport';


class Grades extends Component 
{
	state =
	{
		id: 0,
		name: "",
		classes: []
	}

	componentWillMount = () =>
	{
		const This = this;
		const token = sessionStorage.getItem('token');

		API.getUser(token).then(function(user)
		{
			if (user.data[0].teacher !== "yes")
			{
				alert("Hey!  You aren't a teacher, get out of here!")
				window.location = "/hub"
			}

			else
			{
				API.findAllStudents(user.data[0].lastname).then(result =>
				{
					result.data.forEach(thing =>
					{
						console.log(thing)
					})
					This.setState({classes: result.data})
				})
			}
		})
	}

	render()
	{
		return(
			<div className="container">
				{this.state.classes.map((oneclass, i) =>
					{
						return <SingleClassReport key={i} section={oneclass.section} students={oneclass.students} totalGrades={oneclass.totalGrades}/>
					})
				}
			</div>
			)
	}

}

export default Grades;