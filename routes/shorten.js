var express = require('express');
var router = express.Router();
var Url = require('../models/url.js');
var app = express();


router.get('/:id', function (req,res){
	var id = req.params.id;
	console.log(id);
	var shortUrl =  "http://localhost:3000/shorten/" + id;
	Url.findOne({short_url: shortUrl}, function(err, url){
		if(err){
			console.log(err);
			var obj = {
				original_url: "error",
				short_url: "error"
			}
			res.send(obj);
		}
		console.log("This is from id: " + url);
		res.redirect(url.original_url);
	});
});
module.exports = router;
