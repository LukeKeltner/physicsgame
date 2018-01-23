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
	findAll: function(req, res)
	{
		usersModel.findAll(function(result)
		{
			console.log(result)
		})
	},

	findAnsweredQuestions: function(req, res)
	{
		usersModel.findAllWhere(req.params.table, "userid", req.params.id, function(result)
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
			console.log(allUsers)

			allUsers.forEach(user =>
			{
				if (user.email === email)
				{
					res.send("email duplicate")
				}
			})

			const saltRounds = 10;
			bcrypt.hash(password, saltRounds, function(err, hash)
			{
				console.log("hashed password = "+hash)
			});
		})


		usersModel.registerNewUser(name, email, password, token, leaderboard, function(result)
		{
			res.send("done")
		})
	}
}