const express = require('express');
const questionModel = require('../models/questionModel.js');
const usersModel = require('../models/usersModel.js');
const math = require('mathjs');

const createToken = function()
{
	const inputs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	let token = "";
	const date = Date.now()

	for (var i=0; i<10; i++)
	{
		var r = math.floor(math.random()*(inputs.length-1));
		token = token + inputs[r];
	}

	return token+date
}

const shuffle = array =>
{
	for (let i = array.length - 1; i > 0; i--)
	{
		const j = math.floor(math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
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
			console.log("-------------------------------------------")
			const string = "Here is a test string with test words."
			const string2 = string.replace(/test/g, "bear")

			const question = JSON.parse(result[0].question)

			if (question.random)
			{
				const randoms = []
				for (let i=0; i<question.random; i++)
				{
					const randomNumber = math.floor(math.random() * 11)+1
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

				console.log(randoms)
				console.log(question.correct)
				console.log(question.wrong)
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
			console.log("Total coins correct from here = "+correctcoins[0].totalcoins)
			questionModel.getCoinsFromLookup("wronglookup", req.body.userid, req.body.topic, req.body.subtopic, function(wrongcoins)
			{
				console.log("Total coins incorrect from here = "+wrongcoins[0].totalcoins)
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
}