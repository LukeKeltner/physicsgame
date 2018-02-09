import React, { Component } from 'react';
import '../assets/styles/leaderboard.css'
import API from "../utils/API";
import User from './User';


class Leaderboard extends Component 
{
	state =
	{
		userid: 0,
		users: []
	}


	componentWillMount = () =>
	{
		const This = this;
		const token = sessionStorage.getItem('token');

		API.getUser(token).then(function(user)
		{
			API.getLeaderboard().then(users =>
			{
				console.log(users)
				This.setState({users: users.data, userid: user.data[0].id})
			})
		})
	}

	render()
	{
		return(
			<div className="container">
				<div className="row text-center">
					<div className="col-2 leaderboard-heading">
						Place
					</div>
					<div className="col-5 leaderboard-heading">
						Name
					</div>
					<div className="col-5 leaderboard-heading">
						Coins
					</div>

				</div>
				{this.state.users.map((user, i) =>
					{
						return <User key={i} userid={this.state.userid} id={user.id} name={user.firstname+" "+user.lastname} coins={user.coins} leaderboard={user.leaderboard} place={i} icon={user.icon} theme={user.headercolor}/>
					})}

			</div>

		)
	}
}

export default Leaderboard;