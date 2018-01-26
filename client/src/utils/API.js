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

	updateUser: function(data)
	{
		return axios.post(`/updateUser`, data)
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
	}
};