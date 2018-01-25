const express = require('express');
const questionModel = require('../models/questionModel.js');

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

	findAllQuestions: function(req, res)
	{
		questionModel.findAllWhere("questions", "subtopic", req.params.subtopic, function(result)
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
			res.send(result)
		})
	},

	insertLookup: function(req, res)
	{
		questionModel.insert(req.body.table, req.body.column1, req.body.column2, req.body.value1, req.body.value2, function(result)
		{
			res.send(result)
		})
	},

	deleteAnswers: function(req, res)
	{
		questionModel.deleteAnswers(req.body.table, req.body.userid, req.body.topic, req.body.subtopic, function(result)
		{
			res.send(result)
		})
	}
}