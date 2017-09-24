var express = require('express');
var mongoose = require('mongoose');
var validUrl = require('valid-url');
mongoose.connect('mongodb://localhost:27017/url');
var bodyParser = require('body-parser');
var db = mongoose.connection;

var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));


//Body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())
var url_shorten = require('./routes/url_shorten.js');
app.use('/new', url_shorten);
var shorten = require('./routes/shorten.js');
app.use('/shorten', shorten);
//DB
db.on('error', function (err){
	if(err){ throw err}
});

db.on('open', function (err){
	if(err){ throw err}
	console.log("Connected to db");
});

var Url = require('./models/url.js');

app.get('/', function (req, res){
	res.render('mainpage');
});

app.listen(process.env.PORT || 3000, function(){
	console.log('listening on port 3000');
})
