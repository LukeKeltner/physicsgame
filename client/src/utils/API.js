import axios from "axios";

export default {

	login: function(data)
	{
		return axios.get(`/login/${data.email}/${data.password}`);
	},

	getQuestion: function()
	{
		return axios.get(`/question`);
	}
};