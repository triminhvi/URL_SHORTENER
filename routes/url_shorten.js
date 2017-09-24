var express = require('express');
var mongoose = require('mongoose');
var Url = require('../models/url.js');
var validUrl = require('valid-url');
var router = express.Router();


router.get('/?*', function (req, res){
	var link = req.query.url;
	console.log("Query:" + link);
	// //res.send(link);
	// if(validUrl.isUri(link)){
	// 	console.log("valid");
	// 	res.send('valid');
	// } else {
	// 	console.log("invalid");
	// 	res.send('invalid');
	// }

	if(validUrl.isUri(link)){
		// console.log('valid');
		// res.send('true');
		Url.findOne({original_url: link}, {_id: 0, __v: 0}, function (err, url){
			if(err){
				throw err;
			}
			console.log(url);
			if(url){
				console.log("Found URL");
				res.send(url);
			} else if(!url){
				//Assign special id for short url based on number of documents in collection
				Url.count({}, function (err, count){
					if(err){
						throw err;
					} else {
						var newId = count;
						var newUrl = new Url({
							original_url: link,
							short_url: "http://localhost:3000/shorten/" + newId
						});
						newUrl.save(function (err){
							if(err){
								throw err;
							} 
							console.log('New Url has been saved');
							Url.findOne({original_url: link}, {_id: 0, __v: 0}, function (err, url){
								if(err){
									throw err;
								}
								res.send(url);
							});
						});
					}
				})
			}
		})
	} else {
		var obj = {
			original_link: "URL invalid",
			short_link: "URL invalid"
		}
		console.log("URL is invalid");
		res.send(obj);
	}
});

module.exports = router;