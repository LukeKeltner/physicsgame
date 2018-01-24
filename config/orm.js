const connection = require('../config/connection.js');

const orm = 
{
	findAll: function(table, cb)
	{
		connection.query(`SELECT * FROM ${table}`, function(err, result)
		{
			if(err){throw err;}
			cb(result);
		})
	},

	findAllWhere: function(table, whereField, whereValue, cb)
	{
		connection.query(`SELECT * FROM ${table} WHERE ${whereField} = ?`, [whereValue], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	findDistinct: function(field, table, cb)
	{
		connection.query(`SELECT DISTINCT ${field} FROM ${table}`, function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	findDistinctWhere: function(field, table, whereField, whereValue, cb)
	{
		connection.query(`SELECT DISTINCT ${field} FROM ${table} WHERE ${whereField} = ?`, [whereValue], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	getNewQuestion: function(topic, subtopic, userid, cb)
	{
		connection.query(`SELECT * FROM questions WHERE topic=? and subtopic=? and questions.id not in (select questionid from correctlookup where userid=?) and questions.id not in (select questionid from wronglookup where userid=?) order by rand() limit 1;`, [topic, subtopic, userid, userid], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	registerNewUser: function(name, email, password, token, leaderboard, cb)
	{
		connection.query(`INSERT INTO users(name, email, password, token, leaderboard) VALUES (?, ?, ?, ?, ?);`, [name, email, password, token, leaderboard], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	login: function(email, cb)
	{
		connection.query(`SELECT * FROM users WHERE email = ?`, [email], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	update: function(table, column, value, whereField, whereValue, cb)
	{
		connection.query(`UPDATE ${table} SET ${column} = ? WHERE ${whereField} = ?`, [value, whereValue], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	}
}

module.exports = orm;