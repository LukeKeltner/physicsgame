import React, { Component } from 'react';
import '../assets/styles/report.css'
import SubtopicReport from './SubtopicReport';


class Report extends Component 
{
	render()
	{
		return(
			<div className="complete-topic">
				<div className="row">
					<div className="col-md-12 topic">
						{this.props.topic}
						<div className="float-right">
							{this.props.totalPercent}%
						</div>
					</div>
				</div>
				{this.props.subtopics.map((subtopic,i) =>
					{
						return <SubtopicReport key={i} id={this.props.id+i} userid={this.props.userid} coins={this.props.coins} topic={this.props.topic} name={subtopic[0]} amount={subtopic[1]} corrects={subtopic[2]} wrongs={subtopic[3]} challenges={subtopic[4]}/>
					})}
			</div>
		)
	}
}

export default Report;