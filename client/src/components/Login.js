import React, { Component } from 'react';
import '../assets/styles/login.css'
import coin from '../assets/images/coin.png'

class Login extends Component 
{
	state =
	{
		loginEmail: "",
		loginPassword: "",
		registerName: "",
		registerEmail: "",
		registerPassword1: "",
		registerPassword2: "",
		badName: false
	}

	handleChange = event =>
	{
		const badNames = ["fuck", "ass", "shit", "pussy", "vagina", "penis", "head", "cum", "jizz", "bitch", "nipple", "cunt", "sick", "dick", "cock", "balls", "slut", "whore", "suck", "anal", "blow", "tit", "diarrhea", "boob", "stain", "moist", "hairy"]
		this.setState({badName: false})
		badNames.forEach(word =>
		{
			const programmingReg = new RegExp(word)
			if (programmingReg.test([event.target.value][0].toLowerCase()) && [event.target.id][0] === 'registerName')
			{
				this.setState({badName: true})
			}
		})
		this.setState({[event.target.id]: event.target.value})
		console.log(this.state.badName)
	}

	register = event =>
	{
		event.preventDefault()
		console.log("hit!")
		const string = "motherfucker fucking"
		const check = "fucking"
		const programmingReg = new RegExp(check)
		console.log(programmingReg.test(string))
	}

	render()
	{
		return(
			<div className="container-fluid">
				<div className="row text-center intro">
					<div className="col-md-12">
						<h1>Welcome to Whadaya Know</h1>
						<hr></hr>
						<h3>The site that rewards your knowledge of physics</h3>
					</div>
				</div>
				<div className="row explanation">
					<div className="col-md-6">
						<h3>Pick a topic, bet some coins, get coins for all questions you get right!</h3>
						<br></br>
						<hr></hr>
						<br></br>
						<h3 className="text-right">What out though, you'll lose coins if you get the question wrong!</h3>
					</div>
					<div className="col-md-6 text-center">
						<img alt="Hey!" src={coin}/>
					</div>
				</div>
				<div className="row what-coins-do">
					<div className="col-md-6">
						<h3>Login</h3>
						<form>
							<div className="form-group">
								<label htmlFor="loginEmail">Email address</label>
								<input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.loginEmail} onChange={this.handleChange}></input>
							</div>
							<div className="form-group">
								<label htmlFor="loginPassword">Password</label>
								<input type="password" className="form-control" id="loginPassword" placeholder="Password" onChange={this.handleChange}></input>
							</div>
							<button type="submit" className="btn btn-primary">Welcome back!</button>
						</form>
					</div>
					<div className="col-md-6">
						<h3>Register</h3>
						<form>
							<div className="form-group">
								<label htmlFor="registerName">Name</label>
								{!this.state.badName
								?	<input type="test" className="form-control" id="registerName" placeholder="Enter your name" required onChange={this.handleChange}></input>
								:   <input type="test" className="form-control is-invalid" id="registerName" placeholder="Enter your name" required onChange={this.handleChange}></input>
								}
								<small id="emailHelp" className="form-text text-muted">This name will appear on the Leaderboard if you choose.</small>
							</div>
							<div className="form-group">
								<label htmlFor="registerEmail">Email address</label>
								<input type="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}></input>
							</div>
							<div className="form-group">
								<label htmlFor="registerPassword1">Password</label>
								<input type="password" className="form-control" id="registerPassword1" placeholder="Password" onChange={this.handleChange}></input>
							</div>
							<div className="form-group">
								<label htmlFor="registerPassword2">Re-enter Password</label>
								<input type="password" className="form-control is-invalid" id="registerPassword2" placeholder="Password" onChange={this.handleChange}></input>
							</div>
							<label htmlFor="leaderboard">Would you like to be visable on the Leaderboard?</label>
								<select className="form-control" id="leaderboard">
									<option>Yes</option>
									<option>No</option>
								</select>
							<br></br>
							<button type="submit" className="btn btn-primary" onClick={this.register}>Submit</button>
						</form>
					</div>
				</div>
			</div>
			)
	}

}

export default Login;