import React, { Component } from 'react';
import '../assets/styles/store.css'
import API from "../utils/API";
import { ChromePicker } from 'react-color';
import HeaderTest from './HeaderTest'
import challenge from '../assets/images/icons/challenge.svg'

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

import game1 from '../assets/images/icons/game1.svg'
import game2 from '../assets/images/icons/game2.svg'
import game3 from '../assets/images/icons/game3.svg'
import game4 from '../assets/images/icons/game4.svg'
import game5 from '../assets/images/icons/game5.svg'
import game6 from '../assets/images/icons/game6.svg'
import game7 from '../assets/images/icons/game7.svg'
import game8 from '../assets/images/icons/game8.svg'
import game9 from '../assets/images/icons/game9.svg'
import game10 from '../assets/images/icons/game10.svg'

import animal1 from '../assets/images/icons/animal1.svg'
import animal2 from '../assets/images/icons/animal2.svg'
import animal3 from '../assets/images/icons/animal3.svg'
import animal4 from '../assets/images/icons/animal4.svg'
import animal5 from '../assets/images/icons/animal5.svg'
import animal6 from '../assets/images/icons/animal6.svg'
import animal7 from '../assets/images/icons/animal7.svg'
import animal8 from '../assets/images/icons/animal8.svg'
import animal9 from '../assets/images/icons/animal9.svg'
import animal10 from '../assets/images/icons/animal10.svg'


class Store extends Component 
{
	state = 
	{
		id: 0,
		name: "",
		coins: "",
	    background: 'red',
	    iconPicked: "",
	    icon: "",
	    challengeTokens: 0
	}

	componentWillMount = () =>
	{

		const This = this;
		const token = sessionStorage.getItem('token');

		API.getUser(token).then(function(user)
		{
			console.log(user.data[0])
			This.setState({id: user.data[0].id, name: user.data[0].firstname, coins: user.data[0].coins, icon: user.data[0].icon, challengeTokens: user.data[0].challengetokens})
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

	buyChallengeToken = event =>
	{
		const newTokens = this.state.challengeTokens + 1;
		const data = 
		{
			userid: this.state.id,
			columnName: "challengetokens",
			columnValue: newTokens,
			coins: this.state.coins
		}

		API.buyChallengeToken(data).then(result =>
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
						<div className="row">
							<div className="col-md-6">
								<h3 className="item-name">Challenge Tokens</h3>
							</div>
							<div className="col-md-6">
								<div className="float-right">
									{this.state.challengeTokens === 1 
										?
										<div>You currently have {this.state.challengeTokens} Challenge Token</div>
										:
										<div>You currently have {this.state.challengeTokens} Challenge Tokens</div>
									}
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6 text-center">
								<img className="challenge" alt="challenge" src={challenge}/>
							</div>
							<div className="col-md-6">
								Find yourself on a question that you'd like to challenge a classmate?  Use a Challenge Token!
								The Rules for challenging on a given question:
								<ul>
									<li>You can only have two open challenges per user at a given time</li>
									<li>You cannot challenge a user who currently has the question correct</li>
									<li>You cannot challenge a user who is currently being challenged on that question</li>
									<li>If the user you challenge gets the question wrong, you get 150 of their coins!</li>
									<li>However, if the user gets the question right, they get 150 of your coins!</li>
								</ul>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								{this.state.coins >= 100
									?
										<button type="button" className="btn btn-success btn-lg float-right" onClick={this.buyChallengeToken}>Buy Challenge Token! 100</button>
									:
										<button type="button" className="btn btn-success btn-lg float-right"  disabled>Buy Challenge Token! 100</button>
								}
							</div>
						</div>
					</div>




					<div className="item-container">
						<div>
							<h3 className="item-name">Theme Color Picker</h3>
						</div>

						<div className="row">
							<div className="col-md-8">
								<HeaderTest name={this.state.name} coins={this.state.coins} background={this.state.background} icon={this.state.icon}/>
							</div>
							<div className="col-md-4">
								<ChromePicker color={this.state.background} onChange={this.handleChangeComplete}/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								{this.state.coins >= 50
									?
										<button type="button" className="btn btn-success btn-lg float-right" onClick={this.buyColor}>Buy Color! 50</button>
									:
										<button type="button" className="btn btn-success btn-lg float-right" disabled>Buy Color! 50</button>
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
								<img className="icons" alt="icon" id="girl-7.svg" src={girl7} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="girl-10.svg" src={girl10} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="girl-14.svg" src={girl14} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="girl-20.svg" src={girl20} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="girl-25.svg" src={girl25} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="girl.svg" src={girl} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="girl-2.svg" src={girl2} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="girl-13.svg" src={girl13} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="girl-8.svg" src={girl8} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="girl-6.svg" src={girl6} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								
							</div>
							<div className="col-md-1">
								
							</div>
						</div>

						<div className="row icon-row">
							<div className="col-md-1">
								<img className="icons" alt="icon" id="boy-6.svg" src={boy6} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="boy-10.svg" src={boy10} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="boy-12.svg" src={boy12} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="boy-20.svg" src={boy20} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="boy-22.svg" src={boy22} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="boy.svg" src={boy} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="boy-3.svg" src={boy3} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="boy-13.svg" src={boy13} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="boy-14.svg" src={boy14} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="boy-16.svg" src={boy16} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								
							</div>
							<div className="col-md-1">
								
							</div>
						</div>


						<div className="row icon-row">
							<div className="col-md-1">
								<img className="icons" alt="icon" id="pride1.svg" src={pride1} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="pride2.svg" src={pride2} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="pride3.svg" src={pride3} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="pride4.svg" src={pride4} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="pride5.svg" src={pride5} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="pride6.svg" src={pride6} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="pride7.svg" src={pride7} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="pride8.svg" src={pride8} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="pride9.svg" src={pride9} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="pride10.svg" src={pride10} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								
							</div>
							<div className="col-md-1">
								
							</div>
						</div>

						<div className="row icon-row">
							<div className="col-md-1">
								<img className="icons" alt="icon" id="game1.svg" src={game1} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="game2.svg" src={game2} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="game3.svg" src={game3} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="game4.svg" src={game4} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="game5.svg" src={game5} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="game6.svg" src={game6} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="game7.svg" src={game7} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="game8.svg" src={game8} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="game9.svg" src={game9} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="game10.svg" src={game10} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								
							</div>
							<div className="col-md-1">
								
							</div>
						</div>

						<div className="row icon-row">
							<div className="col-md-1">
								<img className="icons" alt="icon" id="animal1.svg" src={animal1} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="animal2.svg" src={animal2} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="animal3.svg" src={animal3} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="animal4.svg" src={animal4} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="animal5.svg" src={animal5} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="animal6.svg" src={animal6} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="animal7.svg" src={animal7} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="animal8.svg" src={animal8} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="animal9.svg" src={animal9} onClick={this.setActive}/>
							</div>
							<div className="col-md-1">
								<img className="icons" alt="icon" id="animal10.svg" src={animal10} onClick={this.setActive}/>
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
										<button type="button" className="btn btn-success btn-lg float-right" disabled>Buy Icon! 50</button>
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