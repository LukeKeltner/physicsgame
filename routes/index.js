const path = require("path");
const router = require("express").Router();
const userController = require("../controllers/userController")
const connection = require('../config/connection.js');

router.route("/findall").get(userController.findAll)

router.route("/question").get(function(req, res)
{
	connection.query("SELECT * FROM questions", function(err, result)
	{
		if(err){throw err}
		console.log(result)
		res.send(result)
	})
})

router.use(function(req, res) 
{
  	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;