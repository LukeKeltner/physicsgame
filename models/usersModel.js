const orm = require("../config/orm.js");

const user = 
{
	findAll: function(cb)
	{
		orm.findAll("users", function(result)
		{
			cb(result)
		});
	},

	getUser: function(token, cb)
	{
		orm.findOne("users", "token", token, function(result)
		{
			cb(result)
		})
	},

	getUserById: function(id, cb)
	{
		orm.findOne("users", "id", id, function(result)
		{
			cb(result)
		})
	},

	findAllWhere: function(table, whereField, whereValue, cb)
	{
		orm.findAllWhere(table, whereField, whereValue, function(result)
		{
			cb(result)
		})
	},

	findDistinctWhere: function(field, table, whereField, whereValue, cb)
	{
		orm.findDistinctWhere(field, table, whereField, whereValue, function(result)
		{
			cb(result)
		})
	},

	registerNewUser: function(firstname, lastname, email, password, token, leaderboard, teacher, section, cb)
	{
		orm.registerNewUser(firstname, lastname, email, password, token, leaderboard, teacher, section, function(result)
		{
			cb(result)
		})
	},

	login: function(email, cb)
	{
		orm.login(email, function(result)
		{
			cb(result)
		})
	},

	updateUser: function(column, value, whereField, whereValue, cb)
	{
		orm.update("users", column, value, whereField, whereValue, function(result)
		{
			cb(result)
		})
	},

	getLeaderboard: function(cb)
	{
		orm.getLeaderboard(function(result)
		{
			cb(result)
		})
	},

	findAllStudents: function(section, teacher, cb)
	{
		orm.findAllStudents(section, teacher, function(result)
		{
			cb(result)
		})
	},

	findCorrectQuestionsFromTopicAndSubtopic: function(userid, topic, subtopic, cb)
	{
		orm.findCorrectQuestionsFromTopicAndSubtopic(userid, topic, subtopic, function(result)
		{
			cb(result)
		})
	},

	findNumberOfQuestionsInSubtopic: function (topic, subtopic, cb)
	{
		orm.findNumberOfQuestionsInSubtopic(topic, subtopic, function(result)
		{
			cb(result)
		})
	}
}


module.exports = user;
