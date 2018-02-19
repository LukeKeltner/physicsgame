const path = require("path");
const router = require("express").Router();
const userController = require("../controllers/userController")
const questionController = require("../controllers/questionController")
const connection = require('../config/connection.js');


router.route("/user/:token").get(userController.getUser)

router.route(`/updateUser`).post(userController.updateUser)

router.route(`/getUserById/:id`).get(userController.getUserById)

router.route(`/getQuestion/:id`).get(questionController.getQuestion)

router.route(`/findDistinctTopicsAndSubtopics`).get(questionController.findDistinctTopicsAndSubtopics)

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

router.route(`/iconChange`).post(userController.iconChange)

router.route(`/buyChallengeToken`).post(userController.buyChallengeToken)

router.route(`/findAllStudents/:section/:teacher`).get(userController.findAllStudents)

router.route(`/findSections/:teacher`).get(userController.findSections)

router.route(`/findCorrectQuestionsFromTopicAndSubtopic/:userid/:topic/:subtopic`).get(userController.findCorrectQuestionsFromTopicAndSubtopic)

router.route(`/getChallengers/:questionid`).get(userController.getChallengers)

router.route(`/challengeUser`).post(userController.challengeUser)

router.route(`/getChallenges/:userid`).get(userController.getChallenges)


router.use(function(req, res) 
{
  	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;