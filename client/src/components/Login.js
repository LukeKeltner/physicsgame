import React, { Component } from 'react';
import '../assets/styles/login.css'
import coin from '../assets/images/coin.png'
import API from "../utils/API";

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
		leaderboard: "",
		badName: false,
		badRegisterEmail: false,
		badLoginEmail: false,
		loginError: "",
		registerError: ""
	}

	handleChange = event =>
	{

		if ([event.target.id][0] === "registerName")
		{
			const badNames = ["fuck", "ass", "shit", "pussy", "vagina", "penis", "head", "cum", "jizz", "bitch", "nipple", "cunt", "sick", "dick", "cock", "ball", "slut", "whore", "suck", "anal", "blow", "tit", "diarrhea", "boob", "stain", "moist", "hairy", "fag", "gay", "lesbian", "trans", "homo", "nigg", "dyke", "dike", "jew", "kike", "diddle", "sac", "sex", "hump", "butt", "munch", "dumb", "stupid", "god", "damn", "dammit"]

			this.setState({badName: false})
			badNames.forEach(word =>
			{
				const programmingReg = new RegExp(word)
				if ((programmingReg.test([event.target.value][0].toLowerCase()) || !(/^[a-zA-Z ]+$/).test([event.target.value][0].toLowerCase())) && [event.target.id][0] === 'registerName')
				{
					this.setState({badName: true})
				}
			})
		}

		else if ([event.target.id][0] === "registerEmail")
		{
			this.setState({badRegisterEmail: false})
			if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test([event.target.value][0].toLowerCase()) && [event.target.id][0] === 'registerEmail')
			{
				this.setState({badRegisterEmail: true})
			}
		}

		else if ([event.target.id][0] === "loginEmail")
		{
			this.setState({badLoginEmail: false})
			if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test([event.target.value][0].toLowerCase()) && [event.target.id][0] === 'loginEmail')
			{
				this.setState({badLoginEmail: true})
			}
		}

		this.setState({[event.target.id]: event.target.value})
	}

	register = event =>
	{
		const This = this;
		event.preventDefault()
		if (!this.state.badName && !this.state.badRegisterEmail && this.state.registerPassword1 === this.state.registerPassword2 && this.state.registerName !== "" && this.state.registerEmail !== "" && this.state.registerPassword1 !== "")
		{
			const leaderboard = document.getElementById("leaderboard").value
			const newUser =
			{
				name: this.state.registerName,
				email: this.state.registerEmail.toLowerCase(),
				password: this.state.registerPassword1,
				leaderboard: leaderboard
			}

			API.register(newUser).then(function(result)
			{
				if (result.data === "duplicate email")
				{
					This.setState({registerError: "This email is already in use"})
				}

				else
				{
					sessionStorage.setItem('token', result.data);
					window.location = "/hub"
				}
			})
		}
	}

	login = event =>
	{
		const This = this;
		event.preventDefault()

		const data = 
		{
			email: this.state.loginEmail,
			password: this.state.loginPassword
		}

		console.log(data)

		API.login(data).then(function(result)
		{
			console.log(result)

			if (result.data === "no email")
			{
				This.setState({loginError: "We don't have this email in our system"})
			}

			else if (result.data === "wrong password")
			{
				This.setState({loginError: "Wrong password"})
			}

			else
			{
				sessionStorage.setItem('token', result.data);
				window.location = "/hub"
			}
		})
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
						<hr className="hr-white"></hr>
						<br></br>
						<h3 className="text-right">Watch out though, you'll lose coins if you get the question wrong!</h3>
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
							{this.state.loginError === ""
							?	<div></div>
							:	<div className="alert alert-danger" role="alert">
  									<strong>Oops!</strong> {this.state.loginError}
								</div>
							}
							<button type="submit" className="btn btn-primary" onClick={this.login}>Welcome back!</button>
						</form>
					</div>
					<div className="col-md-6">
						<h3>Register</h3>
						<form>
							<div className="form-group">
								<label htmlFor="registerName">Name</label>
								{!this.state.badName || this.state.registerName === ""
								?	<input type="test" className="form-control" id="registerName" placeholder="Enter your name" required onChange={this.handleChange}></input>
								:   <div><input type="test" className="form-control is-invalid" id="registerName" placeholder="Enter your name" required onChange={this.handleChange}></input>
									<div className="invalid-feedback">
          								Certain words and characters are blocked
        							</div></div>
								}
								<small id="emailHelp" className="form-text text-muted">This name will appear on the Leaderboard if you choose.</small>
							</div>
							{!this.state.badRegisterEmail
							?
								<div className="form-group">
									<label htmlFor="registerEmail">Email address</label>
									<input type="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}></input>
								</div>
							:
								<div className="form-group">
									<label htmlFor="registerEmail">Email address</label>
									<input type="email" className="form-control is-invalid" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}></input>
								</div>

							}
							{this.state.registerPassword1 === this.state.registerPassword2
							?	<div><div className="form-group">
									<label htmlFor="registerPassword1">Password</label>
									<input type="password" className="form-control" id="registerPassword1" placeholder="Enter Password" onChange={this.handleChange}></input>
								</div>
								<div className="form-group">
									<label htmlFor="registerPassword2">Re-enter Password</label>
									<input type="password" className="form-control" id="registerPassword2" placeholder="Re-enter Password" onChange={this.handleChange}></input>
								</div></div>
							:
								<div><div className="form-group">
									<label htmlFor="registerPassword1">Password</label>
									<input type="password" className="form-control is-invalid" id="registerPassword1" placeholder="Enter Password" onChange={this.handleChange}></input>
								</div>
								<div className="form-group">
									<label htmlFor="registerPassword2">Re-enter Password</label>
									<input type="password" className="form-control is-invalid" id="registerPassword2" placeholder="Re-enter Password" onChange={this.handleChange}></input>
									<div className="invalid-feedback">
	          								Passwords do not match
	        						</div>
								</div></div>
							}
							<label htmlFor="leaderboard">Would you like to be visible on the Leaderboard?</label>
								<select className="form-control" id="leaderboard">
									<option>Yes</option>
									<option>No</option>
								</select>
							<br></br>
							{this.state.registerError === ""
							?	<div></div>
							:	<div className="alert alert-danger" role="alert">
  									<strong>Oops!</strong> {this.state.registerError}
								</div>
							}
							<button type="submit" className="btn btn-primary" onClick={this.register}>Submit</button>
						</form>
					</div>
				</div>
			</div>
			)
	}

}

export default Login;