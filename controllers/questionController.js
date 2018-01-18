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
		console.log(topic)
		questionModel.findDistinctWhere("subtopic", "topic", topic, function(result)
		{
			res.send(result)
		})
	}
}