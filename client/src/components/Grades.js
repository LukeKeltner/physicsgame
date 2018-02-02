import React, { Component } from 'react';
import '../assets/styles/grades.css'
import API from "../utils/API";
//import coin from '../assets/images/coin.png'


class Grades extends Component 
{
	state =
	{
		id: 0,
		name: ""
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
					console.log(result)
				})
			}
		})
	}

	render()
	{
		return(
			<div>
				Coming soon!
			</div>
			)
	}

}

export default Grades;