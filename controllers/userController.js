const express = require('express');
const usersModel = require('../models/usersModel.js');
const bcrypt = require('bcrypt');

const createToken = function()
{
	const inputs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	let token = "";
	const date = Date.now()

	for (var i=0; i<10; i++)
	{
		var r = Math.floor(Math.random()*(inputs.length-1));
		token = token + inputs[r];
	}

	return token+date
}

module.exports = 
{
	updateUser: function(req, res)
	{
		usersModel.updateUser(req.body.column, req.body.value, req.body.whereField, req.body.whereValue, function(result)
		{
			res.end()
		})
	},

	findAnsweredQuestions: function(req, res)
	{
		usersModel.findAllWhere(req.params.table, "userid", req.params.id, function(result)
		{
			res.send(result)
		})
	},

	getUser: function(req, res)
	{
		console.log(req.params.token)
		usersModel.getUser(req.params.token, function(result)
		{
			res.send(result)
		})
	},

	registerNewUser: function(req, res)
	{
		const name = req.body.name
		const email = req.body.email
		const password = req.body.password
		const token = createToken()
		let leaderboard = 0;

		if (req.body.leaderboard === "Yes")
		{
			leaderboard = 1
		}

		usersModel.findAll(function(allUsers)
		{
			let okay = true;

			allUsers.forEach(user =>
			{
				console.log(user.email+" and "+email)
				if (user.email === email)
				{
					okay = false
				}
			})

			if (okay)
			{
				const saltRounds = 10;
				bcrypt.hash(password, saltRounds, function(err, hash)
				{
					usersModel.registerNewUser(name, email, hash, token, leaderboard, function(result)
					{
						res.send(token)
					})
				});
			}

			else
			{
				res.send("duplicate email")
			}
		})
	},

	login: function(req, res)
	{
		const email = req.params.email.toLowerCase()
		const password = req.params.password

		usersModel.login(email, function(result)
		{
			if (result.length === 0)
			{
				res.send("no email")
			}

			else
			{
				bcrypt.compare(password, result[0].password, function(err, result2)
				{
					if (result2)
					{
						const token = createToken();
						usersModel.updateUser("token", token, "id", result[0].id, function(result3)
						{
							res.send(token)
						})
					}

					else
					{
						res.send("wrong password")
					}
				})
			}
		})
	}
}