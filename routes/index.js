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

router.route(`/resetSubtopic/`).post(questionController.deleteAnswers)

router.route(`/getLeaderboard`).get(userController.getLeaderboard)

router.route(`/updateQuestion`).post(questionController.updateQuestion)

router.route(`/determineResult`).post(userController.determineResult)

router.route(`/headerColorChange`).post(userController.headerColorChange)

router.route(`/findAllStudents/:teacher`).get(userController.findAllStudents)


router.use(function(req, res) 
{
  	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;