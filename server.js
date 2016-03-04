// simple express server
var express = require('express');
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var IPADDRESS = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://webdevspring2016-rodgersbranden.rhcloud.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res){
    res.sendfile((__dirname + '/index.html'));
});

require('./public/project/cheapeats/server/app.js')(app);

app.listen(PORT, IPADDRESS, function(){
    console.log('listening on: ' + IPADDRESS + ':' + PORT);
});