const path = require("path");
const router = require("express").Router();
const userController = require("../controllers/userController")
const questionController = require("../controllers/questionController")
const connection = require('../config/connection.js');


router.route("/user/:token").get(userController.getUser)

router.route(`/updateUser`).post(userController.updateUser)

router.route(`/getQuestion/:id`).get(questionController.getQuestion)

router.route("/findAllTopics").get(questionController.findDistinctTopics)

router.route(`/findAllSubtopics/:topic`).get(questionController.findDistinctSubTopics)

router.route(`/getNewQuestion/:topic/:subtopic/:userid`).get(questionController.getNewQuestion)

router.route(`/findAllQuestions/:subtopic`).get(questionController.findAllQuestions)

router.route(`/findAnsweredQuestions/:table/:id`).get(userController.findAnsweredQuestions)

router.route(`/register`).post(userController.registerNewUser)

router.route(`/login/:email/:password`).get(userController.login)

router.route(`/insertLookup`).post(questionController.insertLookup)

/*router.route(`/getQuestion`).get(function(req, res)
{
	connection.query("SELECT * FROM questions", function(err, result)
	{
		if(err){throw err}
		res.send(result)
	})
})*/

/*router.route("/user/:token").get(function(req, res)
{
	connection.query("SELECT * FROM users", function(err, result)
	{
		if(err){throw err}
		res.send(result)
	})	
})*/

router.use(function(req, res) 
{
  	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;