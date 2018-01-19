import React, { Component } from 'react';
import '../assets/styles/report.css'
import API from "../utils/API";



class Report extends Component 
{

	render()
	{
		return(

			<div className="row">
				<div className="col-md-2">
				</div>
				<div className="col-md-10">
					{this.props.name}
					<div className="float-right">
						grade
					</div>
				</div>
			</div>
		)
	}
}

export default Report;