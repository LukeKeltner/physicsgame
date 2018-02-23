const express = require('express');
const questionModel = require('../models/questionModel.js');
const usersModel = require('../models/usersModel.js');
const math = require('mathjs');
const connection = require('../config/connection.js');


const shuffle = array =>
{
	for (let i = array.length - 1; i > 0; i--)
	{
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

const randomVariable = (min, max, range) =>
{
	return (Math.random()*(max-min)+min).toFixed(range)
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

	findAllQuestions: function(req, res)
	{
		questionModel.findAllWhere("questions", "subtopic", req.params.subtopic, function(result)
		{
			res.send(result)
		})
	},

	findDistinctTopicsAndSubtopics: function(req, res)
	{
		questionModel.findDistinct("topic, subtopic", function(result)
		{
			res.send(result)
		})
	},

	findDistinctTopics: function(req, res)
	{
		questionModel.findDistinct("topic", function(result)
		{
			res.send(result)
		})
	},

	findDistinctSubTopics: function(req, res)
	{
		const topic = req.params.topic;
		questionModel.findDistinctWhere("subtopic", "topic", topic, function(result)
		{
			res.send(result)
		})
	},

	getNewQuestion: function(req, res)
	{
		const topic = req.params.topic;
		const subtopic = req.params.subtopic;
		const userid = req.params.userid;

		questionModel.getNewQuestion(topic, subtopic, userid, function(result)
		{
			res.send(result)
		})
	},

	getQuestion: function(req, res)
	{
		questionModel.findQuestion(req.params.id, function(result)
		{
			const string = "Here is a test string with test words."
			const string2 = string.replace(/test/g, "bear")

			const question = JSON.parse(result[0].question)

			if (question.random)
			{
				const randoms = []
				for (let i=0; i<question.random; i++)
				{
					const randomNumber = randomVariable(question["rand"+i][0], question["rand"+i][1], question["rand"+i][2])
					randoms.push(randomNumber)
					const currentRandom = "rand"+i
					question.text = question.text.replace(new RegExp(currentRandom, "g"), randomNumber)
				}

				for (let i=0; i<question.correct.length; i++)
				{
					for (j=0; j<randoms.length; j++)
					{
						const currentRandom = "rand"+j
						let answerString =  question.correct[i].replace(new RegExp(currentRandom, "g"), randoms[j])		

						if (j === randoms.length-1)
						{
							answerString = math.eval(answerString)

							if (!Number.isInteger(answerString))
							{
								answerString = answerString.toFixed(2)
							}
						}

						question.correct[i] = answerString					
					}
				}

				for (let i=0; i<question.wrong.length; i++)
				{
					for (j=0; j<randoms.length; j++)
					{
						const currentRandom = "rand"+j
						let answerString = question.wrong[i].replace(new RegExp(currentRandom, "g"), randoms[j])

						if (j === randoms.length-1)
						{
							answerString = math.eval(answerString)

							if (!Number.isInteger(answerString))
							{
								answerString = answerString.toFixed(2)
							}
						}

						question.wrong[i] = answerString				
					}
				}
			}

			const answers = []
			question.correct.forEach(answer => answers.push({text: answer, type: "correct", selected: false}))
			question.wrong.forEach(answer => answers.push({text: answer, type: "wrong", selected: false}))
			const shuffledAnswers = shuffle(answers)
			result[0].question = question;
			result[0].shuffledAnswers = shuffledAnswers
			res.send(result[0])
		})
	},

	insertLookup: function(req, res)
	{
		questionModel.insert(req.body.table, req.body.column1, req.body.column2, req.body.column3, req.body.value1, req.body.value2, req.body.value3, function(result)
		{
			res.send(result)
		})
	},

	deleteAnswers: function(req, res)
	{
		questionModel.getCoinsFromLookup("correctlookup", req.body.userid, req.body.topic, req.body.subtopic, function(correctcoins)
		{
			questionModel.getCoinsFromLookup("wronglookup", req.body.userid, req.body.topic, req.body.subtopic, function(wrongcoins)
			{
				questionModel.deleteAnswers("correctlookup", req.body.userid, req.body.topic, req.body.subtopic, function(result)
				{
					questionModel.deleteAnswers("wronglookup", req.body.userid, req.body.topic, req.body.subtopic, function(result3)
					{
						const newCoins = req.body.coins - correctcoins[0].totalcoins + wrongcoins[0].totalcoins;
						usersModel.updateUser("coins", newCoins, "id", req.body.userid, function(result3)
						{
							res.send("done")
						})
					})
				})
			})
		})
	},

	updateQuestion: function(req, res)
	{
		questionModel.updateQuestion(req.body.expression, req.body.id, function(result)
		{
			res.end()
		})
	},

	deleteChallenge: function(req, res)
	{
		console.log("About to delete challenge!")
		connection.query(`delete from challengelookup where id = ?`, [req.body.id], function(err, result)
		{
			if (err){throw err}
			res.send()
		})
	}
}