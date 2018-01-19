import React, { Component } from 'react';
import '../assets/styles/report.css'
import API from "../utils/API";
import SubtopicReport from './SubtopicReport';


class Report extends Component 
{

	render()
	{
		return(

			<div className="row">
				<div className="col-md-12 topic">
					{this.props.topic}
					<div className="float-right">
						grade
					</div>
					{this.props.subtopics}
				</div>
{/*				{this.props.subtopics.map((subtopic,i) =>
					{
						return <SubtopicReport name={subtopic.subtopic} />
					})}*/}
			</div>
		)
	}
}

export default Report;