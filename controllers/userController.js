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
				  		const teacherLastName = `http://sas.hawken.edu/api/teacher/${hawkenUserName}/fullname`;
				  		http.get(teacherLastName, httpres3 =>
				  		{
				  			httpres3.setEncoding("utf8");

				  			let body3 = "";

				  			httpres3.on("data", data =>
				  			{
				  				body3 += data;
				  			});

				  			httpres3.on("end", () =>
				  			{

				  				if (body3 === "NULL")
				  				{
				  					res.send("No Hawken Account")
				  				}

				  				else
				  				{
				  					const nameArray = body3.split(" ");
				  					const firstname = nameArray[0]
				  					const lastname = nameArray[1]
				  					const teacher = "yes"
				  					const email = req.body.email
				  					const password = req.body.password
				  					const token = createToken()
				  					const section = ""

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
												usersModel.registerNewUser(firstname, lastname, email, hash, token, leaderboard, teacher, section, function(result)
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
				  			})
				  		})
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

								const getSection = `http://sas.hawken.edu/api/student//${hawkenUserName}/getsection/Physics_9`;

								http.get(getSection, httpres4 =>
								{
									httpres4.setEncoding("utf8");

									let body4 = "";

									httpres4.on("data", data =>
									{
										body4 += data;
									})

									httpres4.on("end", () =>
									{
										const nameArray = body.split(" ");
				  						const firstname = nameArray[0]
				  						const lastname = nameArray[1]
									  	const teacher = body2
										const name = hawkenName
										const email = req.body.email
										const password = req.body.password
										const section = body4
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
													usersModel.registerNewUser(firstname, lastname, email, hash, token, leaderboard, teacher, section, function(result)
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
									})
								})
							});
						});
					}
				});
			});
		}

		else
		{
			const firstname = req.body.firstname
			const lastname = req.body.lastname
			const email = req.body.email
			const password = req.body.password
			const teacher = ""
			const section = ""
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
						usersModel.registerNewUser(firstname, lastname, email, hash, token, leaderboard, teacher, section, function(result)
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
	},

	findAllStudents: function(req, res)
	{

		usersModel.findDistinctWhere("section", "users", "teacher", req.params.teacher, function(sections)
		{
			console.log(sections)
			usersModel.findAllStudents(req.params.teacher, function(students)
			{
				const classes = []

				sections.forEach(section =>
				{
					idArray = []
					studentArray = []

					students.forEach(student =>
					{
						if (section.section === student.section)
						{
							idArray.push(student.id)
							studentArray.push(student.firstname+" "+student.lastname)
						}
					})

					classes.push({section: section.section, ids: idArray, students: studentArray})
				})

				console.log(classes)
			})
		})
	},
}