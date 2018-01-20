import React, { Component } from 'react';
import '../assets/styles/report.css'
import API from "../utils/API";
import SubtopicReport from './SubtopicReport';


class Report extends Component 
{

	render()
	{
		return(
			<div>
				<div className="row">
					<div className="col-md-12 topic">
						{this.props.topic}
						<div className="float-right">
							85%
						</div>
					</div>
				</div>
				{this.props.subtopics.map((subtopic,i) =>
					{
						return <SubtopicReport key={i} name={subtopic} />
					})}
			</div>
		)
	}
}

export default Report;