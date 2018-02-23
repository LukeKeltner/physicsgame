import axios from "axios";

export default {

	getQuestion: function(id)
	{
		return axios.get(`/getQuestion/${id}`);
	},

	getUser: function(token)
	{
		return axios.get(`/user/${token}`)
	},

	getUserById: function(id)
	{
		return axios.get(`/getUserById/${id}`)
	},

	updateUser: function(data)
	{
		return axios.post(`/updateUser`, data)
	},

	findDistinctTopicsAndSubtopics: function()
	{
		return axios.get(`/findDistinctTopicsAndSubtopics`)
	},

	getAllTopics: function()
	{
		return axios.get(`/findAllTopics`)
	},

	getAllSubtopics: function(data)
	{
		return axios.get(`/findAllSubtopics/${data}`)
	},

	getNewQuestion: function(data)
	{
		return axios.get(`/getNewQuestion/${data.topic}/${data.subtopic}/${data.userid}`)
	},

	findAllQuestions: function(data)
	{
		return axios.get(`/findAllQuestions/${data}`)
	},

	findAnsweredQuestions: function(data)
	{
		return axios.get(`/findAnsweredQuestions/${data.table}/${data.id}`)
	},

	findChallenges: function(data)
	{
		return axios.get(`/findChallenges/${data.table}/${data.id}`)
	},

	register: function(data)
	{
		return axios.post(`/register`, data)
	},

	login: function(data)
	{
		return axios.get(`/login/${data.email}/${data.password}`)
	},

	insertLookup: function(data)
	{
		return axios.post(`/insertLookup`, data)
	},

	resetSubtopic: function(data)
	{
		return axios.post(`/resetSubtopic`, data)
	},

	getLeaderboard: function()
	{
		return axios.get(`/getLeaderboard`)
	},

	updateQuestion: function(data)
	{
		return axios.post(`/updateQuestion`, data)
	},

	determineResult: function(data)
	{
		return axios.post(`/determineResult`, data)
	},

	determineChallengeResult: function(data)
	{
		return axios.post(`/determineChallengeResult`, data)
	},

	headerColorChange: function(data)
	{
		return axios.post(`/headerColorChange`, data)
	},

	iconChange: function(data)
	{
		return axios.post(`/iconChange`, data)
	},

	buyChallengeToken: function(data)
	{
		return axios.post(`/buyChallengeToken`, data)
	},

	findSections: function(teacher)
	{
		return axios.get(`/findSections/${teacher}`)
	},

	findAllStudents: function(data)
	{
		return axios.get(`/findAllStudents/${data.section}/${data.teacher}`)
	},

	findCorrectQuestionsFromTopicAndSubtopic: function(data)
	{
		return axios.get(`/findCorrectQuestionsFromTopicAndSubtopic/${data.userid}/${data.topic}/${data.subtopic}`)
	},

	getChallengers: function(data)
	{
		return axios.get(`getChallengers/${data.questionid}/${data.userid}`)
	},

	challengeUser: function(data)
	{
		return axios.post(`/challengeUser`, data)
	},

	getChallenges: function(data)
	{
		return axios.get(`/getChallenges/${data.userid}`)
	},

	deleteChallenge: function(data)
	{
		return axios.post(`/deleteChallenge`, data)
	}
};