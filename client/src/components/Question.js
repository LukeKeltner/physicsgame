import React, { Component } from 'react';
import '../assets/question.css'
import API from "../utils/API";

class Question extends Component 
{
	state =
	{
		text: ""
	}

	componentWillMount = () =>
	{
		console.log("Hey!")
		API.getQuestion().then(function(result)
		{
			console.log(result.data[0].object)
			console.log(JSON.parse(result.data[0].object))
		})
	}



	render()
	{
		return(
			<div className="container">
				<div className="row">
					<div className="col-md-8 questionContainer">
						<div className="questionText">
							What type of particles can fit into a foreverly small space?
						</div>
					</div>
					<div className="col-md-4">
						<div className="row">
							<div className="col-md-1">
							</div>
							<div className="col-md-11 answerContainer answer1">
								Here is answer 1
							</div>
						</div>
						<div className="row">
							<div className="col-md-1">
							</div>
							<div className="col-md-11 answerContainer middleAnswer answer2">
								Here is answer 2
							</div>
						</div>
						<div className="row">
							<div className="col-md-1">
							</div>
							<div className="col-md-11 answerContainer middleAnswer">
								Here is answer 3
							</div>
						</div>
						<div className="row">
							<div className="col-md-1">
							</div>
							<div className="col-md-11 answerContainer">
								Here is answer 4
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-8">
					</div>
					<div className="col-md-4">
						<div className="row">
							<div className="col-md-1">
							</div>
							<div className="col-md-11">
								<button type="button" className="btn btn-primary btn-lg btn-block submit">Submit</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Question;