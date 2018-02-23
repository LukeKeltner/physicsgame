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

	findOne: function(table, whereField, whereValue, cb)
	{
		connection.query(`SELECT * FROM ${table} WHERE ${whereField}=?`, [whereValue], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	findAllWhere: function(table, whereField, whereValue, cb)
	{
		const query = connection.query(`SELECT * FROM ${table} WHERE ${whereField} = ?`, [whereValue], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})

		console.log(query.sql)
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
		const query = connection.query(`SELECT * FROM questions WHERE topic=? and subtopic=? and questions.id not in (select questionid from correctlookup where userid=?) and questions.id not in (select questionid from wronglookup where userid=?) and questions.id not in (select questionid from challengelookup where challengedid=?) order by rand() limit 1;`, [topic, subtopic, userid, userid, userid], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})

		console.log(query.sql)
	},

	registerNewUser: function(firstname, lastname, email, password, token, leaderboard, teacher, section, cb)
	{
		connection.query(`INSERT INTO users(firstname, lastname, email, password, token, leaderboard, teacher, section) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, [firstname, lastname, email, password, token, leaderboard, teacher, section], function(err, result)
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
	},

	updateQuestion: function(table, expression, whereField, whereValue, cb)
	{
		connection.query(`UPDATE ${table} SET ${expression} WHERE ${whereField} = ?`, [whereValue], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	insert: function(table, column1, column2, column3, value1, value2, value3, cb)
	{
		connection.query(`INSERT INTO ${table} (${column1}, ${column2}, ${column3}) VALUES (?, ?, ?)`, [value1, value2, value3], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	deleteAnswers: function(table, userid, topic, subtopic, cb)
	{
		connection.query(`DELETE FROM ${table} WHERE userid = ? and questionid in (select id from questions where topic = ? and subtopic = ?)`, [userid, topic, subtopic], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	getLeaderboard: function(cb)
	{
		connection.query(`select id,firstname,lastname,coins,leaderboard,icon,headercolor from users order by coins desc;`, function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	getCoinsFromLookup: function(table, userid, topic, subtopic, cb)
	{
		connection.query(`select sum(coins) as totalcoins from ${table} where userid = ? and questionid in (select id from questions where topic = ? and subtopic = ?)`, [userid, topic, subtopic], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	findAllStudents: function(section, teacher, cb)
	{
		connection.query(`SELECT id from users where section = ? and teacher = ? order by lastname asc;`, [section, teacher], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	findCorrectQuestionsFromTopicAndSubtopic: function(userid, topic, subtopic, cb)
	{
		connection.query(`select count(id) as correct from correctlookup where userid = ? and questionid in (select id from questions where topic = ? and subtopic = ?);`, [userid, topic, subtopic], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	findNumberOfQuestionsInSubtopic: function(topic, subtopic, cb)
	{
		connection.query(`select count(id) as questionAmount from questions where topic = ? and subtopic = ?;`, [topic, subtopic], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	}
}

module.exports = orm;