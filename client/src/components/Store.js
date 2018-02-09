import React, { Component } from 'react';
import '../assets/styles/store.css'
import API from "../utils/API";
import { HuePicker } from 'react-color';
import HeaderTest from './HeaderTest'

import defaulticon from '../assets/images/icons/default.svg'
import rainbowflag from '../assets/images/icons/rainbowflag.svg'


import girl from '../assets/images/icons/girl.svg'
import girl2 from '../assets/images/icons/girl-2.svg'
import girl7 from '../assets/images/icons/girl-7.svg'
import girl10 from '../assets/images/icons/girl-10.svg'
import girl8 from '../assets/images/icons/girl-8.svg'
import girl13 from '../assets/images/icons/girl-13.svg'
import girl20 from '../assets/images/icons/girl-20.svg'
import girl14 from '../assets/images/icons/girl-14.svg'
import girl25 from '../assets/images/icons/girl-25.svg'
import girl6 from '../assets/images/icons/girl-6.svg'


import boy from '../assets/images/icons/boy.svg'
import boy3 from '../assets/images/icons/boy-3.svg'
import boy6 from '../assets/images/icons/boy-6.svg'
import boy10 from '../assets/images/icons/boy-10.svg'
import boy12 from '../assets/images/icons/boy-12.svg'
import boy13 from '../assets/images/icons/boy-13.svg'
import boy20 from '../assets/images/icons/boy-20.svg'
import boy14 from '../assets/images/icons/boy-14.svg'
import boy22 from '../assets/images/icons/boy-22.svg'
import boy16 from '../assets/images/icons/boy-16.svg'

import pride1 from '../assets/images/icons/pride1.svg'
import pride2 from '../assets/images/icons/pride2.svg'
import pride3 from '../assets/images/icons/pride3.svg'
import pride4 from '../assets/images/icons/pride4.svg'
import pride5 from '../assets/images/icons/pride5.svg'
import pride6 from '../assets/images/icons/pride6.svg'
import pride7 from '../assets/images/icons/pride7.svg'
import pride8 from '../assets/images/icons/pride8.svg'
import pride9 from '../assets/images/icons/pride9.svg'
import pride10 from '../assets/images/icons/pride10.svg'










import cupcake from '../assets/images/icons/cupcake.svg'
import gameController from '../assets/images/icons/game-controller.svg'

const styles =
{
	defaulticon:
	{
		"backgroundColor":"#6400a8"
	}
}

class Store extends Component 
{
	state = 
	{
		id: 0,
		name: "",
		coins: "",
	    background: 'red',
	    iconPicked: ""
	}

	componentWillMount = () =>
	{

		const This = this;
		const token = sessionStorage.getItem('token');

		API.getUser(token).then(function(user)
		{
			This.setState({id: user.data[0].id, name: user.data[0].firstname, coins: user.data[0].coins})
		})
	}

	handleChangeComplete = (color) => 
	{
		this.setState({ background: color.hex });
	}

	buyColor = event =>
	{
		const data = 
		{
			userid: this.state.id,
			headercolor: "headercolor",
			color: this.state.background,
			coins: this.state.coins
		}

		API.headerColorChange(data).then(result =>
		{
			window.location.reload()
		})
	}

	setActive = event =>
	{
		for (let i=0; i<document.getElementsByClassName("icons").length; i++)
		{
			document.getElementsByClassName("icons")[i].classList.remove("active")
		}

		event.target.classList.add("active");

		this.setState({iconPicked: event.target.id})
		console.log(this.state)
	}

	removeActive = event =>
	{
		if (event.target.classList[0] !== "icons")
		{
			for (let i=0; i<document.getElementsByClassName("icons").length; i++)
			{
				document.getElementsByClassName("icons")[i].classList.remove("active")
			}

			this.setState({iconPicked: ""})
		}
	}

	buyIcon = event =>
	{
		const data = 
		{
			userid: this.state.id,
			icon: "icon",
			svg: this.state.iconPicked,
			coins: this.state.coins
		}

		API.iconChange(data).then(result =>
		{
			window.location.reload()
		})
	}


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
								{this.state.coins >= 50
									?
										<button type="button" className="btn btn-success btn-lg float-right" onClick={this.buyColor}>Buy Color! 50</button>
									:
										<button type="button" className="btn btn-success btn-lg float-right" onClick={this.buyColor} disabled>Buy Color! 50</button>
								}
							</div>
						</div>
					</div>




					<div className="item-container" onClick={this.removeActive}>
						<div>
							<h3 className="item-name">Icon Picker</h3>
						</div>

						<div className="row icon-row">
							<div className="col-md-1">
								<img className="icons" id="girl-7.svg" src={girl7} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="girl-10.svg" src={girl10} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="girl-14.svg" src={girl14} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="girl-20.svg" src={girl20} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="girl-25.svg" src={girl25} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="girl.svg" src={girl} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="girl-2.svg" src={girl2} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="girl-13.svg" src={girl13} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="girl-8.svg" src={girl8} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="girl-6.svg" src={girl6} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								
							</div>
							<div className="col-md-1">
								
							</div>
						</div>

						<div className="row icon-row">
							<div className="col-md-1">
								<img className="icons" id="boy-6.svg" src={boy6} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="boy-10.svg" src={boy10} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="boy-12.svg" src={boy12} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="boy-20.svg" src={boy20} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="boy-22.svg" src={boy22} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="boy.svg" src={boy} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="boy-3.svg" src={boy3} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="boy-13.svg" src={boy13} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="boy-14.svg" src={boy14} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="boy-16.svg" src={boy16} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								
							</div>
							<div className="col-md-1">
								
							</div>
						</div>


						<div className="row icon-row">
							<div className="col-md-1">
								<img className="icons" id="pride1.svg" src={pride1} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="pride2.svg" src={pride2} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="pride3.svg" src={pride3} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="pride4.svg" src={pride4} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="pride5.svg" src={pride5} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="pride6.svg" src={pride6} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="pride7.svg" src={pride7} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="pride8.svg" src={pride8} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="pride9.svg" src={pride9} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" id="pride10.svg" src={pride10} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								
							</div>
							<div className="col-md-1">
								
							</div>
						</div>



						<div className="row">
							<div className="col-md-12">
								{this.state.coins >= 50 && this.state.iconPicked !== ""
									?
										<button type="button" className="btn btn-success btn-lg float-right" onClick={this.buyIcon}>Buy Icon! 50</button>
									:
										<button type="button" className="btn btn-success btn-lg float-right" onClick={this.buyIcon} disabled>Buy Icon! 50</button>
								}
							</div>
						</div>
					</div>









				</div>
			</div>

		)
	}
}

export default Store;