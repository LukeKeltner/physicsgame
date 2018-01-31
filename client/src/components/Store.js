import React, { Component } from 'react';
import '../assets/styles/store.css'
import API from "../utils/API";
import { HuePicker } from 'react-color';
import HeaderTest from './HeaderTest'


class Store extends Component 
{
	state = 
	{
		id: 0,
		name: "",
		coins: "",
	    background: '#42f480',
	}

	componentWillMount = () =>
	{

		const This = this;
		const token = sessionStorage.getItem('token');

		API.getUser(token).then(function(user)
		{
			This.setState({id: user.data[0].id, name: user.data[0].name, coins: user.data[0].coins})
		})
	}

	handleChangeComplete = (color) => 
	{
		this.setState({ background: color.hex });
	};


	render()
	{
		return(
			<div>
				<div className="container">





					<div className="item-container">
						<div>
							<h3 className="item-name">Color Picker</h3>
						</div>

						<div className="row">
							<div className="col-md-8">
								<HeaderTest name={this.state.name} coins={this.state.coins} background={this.state.background}/>
							</div>
							<div className="col-md-4">
								<HuePicker color={this.state.background} onChange={this.handleChangeComplete}/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<button type="button" class="btn btn-success btn-lg float-right">Buy Color! 50</button>
							</div>
						</div>
					</div>









				</div>
			</div>

		)
	}
}

export default Store;