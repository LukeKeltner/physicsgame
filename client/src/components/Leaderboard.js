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
			if (user.data.length === 0)
			{
				alert("Please log back in")
				window.location = "/"
			}

			else
			{
				API.getLeaderboard().then(users =>
				{
					This.setState({users: users.data, userid: user.data[0].id})
				})
			}
		})
	}

	render()
	{
		return(
			<div className="container">
				<div className="row text-center">
					<div className="col-md-2 leaderboard-heading">
						Place
					</div>
					<div className="col-md-5 leaderboard-heading">
						Name
					</div>
					<div className="col-md-5 leaderboard-heading">
						Coins
					</div>

				</div>
				{this.state.users.map((user, i) =>
					{
						return <User key={i} userid={this.state.userid} id={user.id} name={user.name} coins={user.coins} leaderboard={user.leaderboard} place={i} />
					})}

			</div>

		)
	}
}

export default Leaderboard;