const express = require('express');
const bodyParser = require("body-parser");
const routes = require("./routes");
const port = process.env.PORT || 3001;

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