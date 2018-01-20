import React, { Component } from 'react';
import '../assets/styles/report.css'
import API from "../utils/API";



class Report extends Component 
{

	render()
	{
		return(

			<div className="row">
				<div className="col-md-1">
				</div>
				<div className="col-md-10 subtopic">
					{this.props.name}
					<div className="float-right">
						90%
					</div>
				</div>
				<div className="col-md-1">
				</div>
			</div>
		)
	}
}

export default Report;