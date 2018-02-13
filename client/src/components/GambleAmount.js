import React, { Component } from 'react';
import '../assets/styles/gambleAmount.css'

class Topic extends Component 
{
	state =
	{
		styles: []
	}

	componentWillMount = () =>
	{
		const newStyles = 
		{
			borderColor: this.props.theme
		}

		const array = []
		array.push(newStyles)
		this.setState({styles: array})
	}

	componentWillReceiveProps = nextProps =>
	{
		const newStyles = 
		{
			borderColor: nextProps.theme
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
					<div className={this.props.className} onClick={this.props.gambleSelected} style={this.state.styles[0]}>
						{this.props.amount}
					</div>
				</div>
			</div>
		)
	}
}

export default Topic;