const express = require('express');
const usersModel = require('../models/usersModel.js');
const questionModel = require('../models/questionModel.js');
const bcrypt = require('bcrypt');
const http = require("http");

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
		usersModel.getUser(req.params.token, function(result)
		{
			res.send(result)
		})
	},

	registerNewUser: function(req, res)
	{
		let leaderboard = 0;

		if (req.body.leaderboard === "Yes")
		{
			leaderboard = 1
		}

		const hawkenCheck = req.body.email.substr(req.body.email.length - 11)

		if (hawkenCheck === '@hawken.edu')
		{
			hawkenUserName = req.body.email.slice(0, -11);
			const studentFullName = `http://sas.hawken.edu/api/student/${hawkenUserName}/fullname`;

			http.get(studentFullName, httpres => 
			{
				httpres.setEncoding("utf8");

				let body = "";

				httpres.on("data", data => 
				{
				    body += data;
				});

				httpres.on("end", () => 
				{
				  	if (body === "NULL")
				  	{
				  		res.send("No Hawken Student")
				  	}

				  	else
				  	{
					  	const hawkenName = body

						const teacherName = `http://sas.hawken.edu/api/student/${hawkenUserName}/getteacherlastname/Physics_9`;

						http.get(teacherName, httpres2 => 
						{
							httpres2.setEncoding("utf8");

							let body2 = "";

							httpres2.on("data", data => 
							{
							    body2 += data;
							});

							httpres2.on("end", () => 
							{
							  	const teacher = body2
								const name = hawkenName
								const email = req.body.email
								const password = req.body.password
								const token = createToken()

								usersModel.findAll(function(allUsers)
								{
									let okay = true;

									allUsers.forEach(user =>
									{
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
											usersModel.registerNewUser(name, email, hash, token, leaderboard, teacher, function(result)
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
							});
						});
					}
				});
			});
		}

		else
		{
			const name = req.body.name
			const email = req.body.email
			const password = req.body.password
			const teacher = ""
			const token = createToken()

			usersModel.findAll(function(allUsers)
			{
				let okay = true;

				allUsers.forEach(user =>
				{
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
						usersModel.registerNewUser(name, email, hash, token, leaderboard, teacher, function(result)
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
		}
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
	},

	getLeaderboard: function(req, res)
	{
		usersModel.getLeaderboard(function(result)
		{
			res.send(result)
		})
	},

	determineResult: function(req, res)
	{
		let correct = true;
		const userid = req.body.userid;
		const questionid = req.body.questionid;
		const currentgamble = req.body.currentgamble;
		const coins = req.body.coins;

		for (let i=0; i<req.body.answers.length; i++)
		{
			if ((req.body.answers[i].type === "correct" && !req.body.answers[i].selected) || (req.body.answers[i].type === "wrong" && req.body.answers[i].selected))
			{
				correct = false;
				break;
			}
		}

		if (correct)
		{
			const expression = 'totalcorrect = totalcorrect + 1';

			questionModel.updateQuestion(expression, questionid, function(result)
			{
				questionModel.insert("correctlookup", "userid", "questionid", "coins", userid, questionid, currentgamble, function(result2)
				{
					usersModel.updateUser("currentquestion", 0, "id", userid, function(result3)
					{
						const newCoins = coins+currentgamble
						usersModel.updateUser("coins", newCoins, "id", userid, function(result4)
						{
							res.send("correct")
						})
					})
				})
			})
		}

		else
		{
			const expression = 'totalwrong = totalwrong + 1';

			questionModel.updateQuestion(expression, questionid, function(result)
			{
				questionModel.insert("wronglookup", "userid", "questionid", "coins", userid, questionid, currentgamble, function(result2)
				{
					usersModel.updateUser("currentquestion", 0, "id", userid, function(result3)
					{
						const newCoins = coins-currentgamble
						usersModel.updateUser("coins", newCoins, "id", userid, function(result4)
						{
							res.send("incorrect")
						})
					})
				})
			})
		}
	},

	headerColorChange: function(req, res)
	{

		const newCoins = req.body.coins - 50;
		
		usersModel.updateUser("coins", newCoins, "id", req.body.userid, function(result)
		{
			usersModel.updateUser(req.body.headercolor, req.body.color, "id", req.body.userid, function(result)
			{
				res.end()
			})
		})		

	}
}