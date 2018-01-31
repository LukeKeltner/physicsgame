import React, { Component } from 'react';
import '../assets/styles/user.css'


class User extends Component 
{
	state =
	{

	}

	componentDidMount = () =>
	{
		console.log(this.props.userid)
	}

	render()
	{
		return(

			<div>
			{this.props.leaderboard.data[0] === 1

				?

				this.props.userid === this.props.id

					?

						<div className="row you">
							<div className="col-2 text-center">
								{this.props.place+1}
							</div>
							<div className="col-5 text-center">
								{this.props.name}
							</div>
							<div className="col-5 text-center">
								{this.props.coins.toLocaleString()}
							</div>
						</div>

					:

						<div className="row user">
							<div className="col-2 text-center">
								{this.props.place+1}
							</div>
							<div className="col-5 text-center">
								{this.props.name}
							</div>
							<div className="col-5 text-center">
								{this.props.coins.toLocaleString()}
							</div>
						</div>

				:

				<div className="row hidden">
					<div className="col-2 text-center">
						{this.props.place+1}
					</div>
					<div className="col-10 text-center">
						This person chose not to be seen
					</div>
				</div>
			}
			</div>

		)
	}
}

export default User;