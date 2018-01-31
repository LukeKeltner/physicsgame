const express = require('express');
const bodyParser = require("body-parser");
const routes = require("./routes");
const port = process.env.PORT || 3001;
const http = require("http");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("client/build"));

app.use(routes);

const https = require("http");

app.listen(port, function()
{
	console.log("Listening on port "+port)
});


			const studentFullName = `http://sas.hawken.edu/api/teacher/rshur/fullname`;

			http.get(studentFullName, httpres => 
			{
				httpres.setEncoding("utf8");

				let body = "";

				httpres.on("data", data => 
				{
				    body += data;
				});

				httpres.on("end", () => 
				{
					console.log(body)
				})
			})
