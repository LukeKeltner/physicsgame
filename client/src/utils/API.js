import axios from "axios";

export default {

	login: function(data)
	{
		return axios.get(`/login/${data.email}/${data.password}`);
	},

	getQuestion: function()
	{
		return axios.get(`/question`);
	},

	getUser: function()
	{
		return axios.get(`/user`)
	},

	getAllTopics: function()
	{
		return axios.get(`/findAllTopics`)
	},

	getAllSubtopics: function(data)
	{
		return axios.get(`/findAllSubtopics/${data}`)
	}
};