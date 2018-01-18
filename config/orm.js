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
	}
}

module.exports = orm;