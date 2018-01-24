const orm = require("../config/orm.js");

const question = 
{
	findAll: function(cb)
	{
		orm.findAll("questions", function(result)
		{
			cb(result)
		});
	},

	findQuestion: function(id, cb)
	{
		orm.findOne("questions", "id", id, function(result)
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

	findDistinct: function(field, cb)
	{
		orm.findDistinct(field, "questions", function(result)
		{
			cb(result)
		})
	},

	findDistinctWhere: function(field, whereField, whereValue, cb)
	{
		orm.findDistinctWhere(field, "questions", whereField, whereValue, function(result)
		{
			cb(result)
		})
	},

	getNewQuestion: function(topic, subtopic, userid, cb)
	{
		orm.getNewQuestion(topic, subtopic, userid, function(result)
		{
			cb(result)
		})
	},

	insert: function(table, column1, column2, value1, value2, cb)
	{
		orm.insert(table, column1, column2, value1, value2, function(result)
		{
			cb(result)
		})
	}
}


module.exports = question;
