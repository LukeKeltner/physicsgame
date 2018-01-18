const path = require("path");
const router = require("express").Router();
const userController = require("../controllers/userController")
const questionController = require("../controllers/questionController")
const connection = require('../config/connection.js');

router.route("/findall").get(userController.findAll)

router.route("/findAllTopics").get(questionController.findDistinctTopics)

router.route(`/findAllSubtopics/:topic`).get(questionController.findDistinctSubTopics)

router.route("/question").get(function(req, res)
{
	connection.query("SELECT * FROM questions", function(err, result)
	{
		if(err){throw err}
		res.send(result)
	})
})

router.route("/user").get(function(req, res)
{
	connection.query("SELECT * FROM users", function(err, result)
	{
		if(err){throw err}
		res.send(result)
	})	
})

router.use(function(req, res) 
{
  	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;