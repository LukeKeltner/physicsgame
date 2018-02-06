import React, { Component } from 'react';
import '../assets/styles/grades.css'
import API from "../utils/API";
import SingleClassReport from './SingleClassReport';


class Grades extends Component 
{
	state =
	{
		id: 0,
		lastname: "",
		classes: [],
		sections: [],
		currentSection: ""
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
				API.findSections(user.data[0].lastname).then(sections =>
				{
					const sectionsArray = []
					sections.data.forEach(section =>
					{
						sectionsArray.push(section.section)
					})
					
					This.setState({currentSection:sectionsArray[0],  sections: sectionsArray, lastname: user.data[0].lastname})
				})
			}
		})
	}

	viewSection = event =>
	{
		this.setState({currentSection: event.target.id})
	}

	render()
	{
		return(
			<div className="container">
				<div className="row">
					<div className="col-md-2">
						<div className="row">
							<div className="col-md-12">
							View: 
							</div>
						</div>
						<br></br>
						{this.state.sections.map((section, i) =>
							{
								return(
									<div key={i}>
										<div className="row">
											<div className="col-md-12">
												<button type="button" className="btn btn-primary" id={section} onClick={this.viewSection}>Section {section}</button>
											</div>
										</div>
										<br></br>
									</div>
								)
							})}
					</div>
						
					<div className="col-md-10">	
						<SingleClassReport section={this.state.currentSection} teacher={this.state.lastname}/>
					</div>
				</div>
			</div>
			)
	}

}

export default Grades;