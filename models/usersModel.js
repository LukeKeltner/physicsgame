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

	findAllWhere: function(table, whereField, whereValue, cb)
	{
		orm.findAllWhere(table, whereField, whereValue, function(result)
		{
			cb(result)
		})
	},

	registerNewUser: function(name, email, password, token, leaderboard, teacher, cb)
	{
		orm.registerNewUser(name, email, password, token, leaderboard, teacher, function(result)
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
	}
}


module.exports = user;
