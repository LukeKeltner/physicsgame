import React, { Component } from 'react';
import '../assets/styles/topic.css'

class Topic extends Component 
{
	state =
	{
		type:this.props.type,
		clicked: this.props.clicked,
		styles: []
	}

	componentWillMount = () =>
	{
		const newStyles = 
		{
			borderColor: this.props.theme,
			backgroundColor: "white"
		}

		const array = []
		array.push(newStyles)
		this.setState({styles: array})
	}

	componentWillReceiveProps = nextProps =>
	{
		const newStyles = 
		{
			borderColor: nextProps.theme,
		}

		const array = []
		array.push(newStyles)
		this.setState({styles: array})
	}

	render()
	{
		return(
			<div className="row">
				<div className="col-md-12">
					<div className={this.props.className} onClick={this.props.topicSelected} style={this.state.styles[0]}>
						{this.props.name}
					</div>
				</div>
			</div>
		)
	}
}

export default Topic;