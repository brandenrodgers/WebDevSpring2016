// simple express server
var express = require('express');
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendfile((__dirname + '/index.html'));
});

require('./public/project/cheapeats/server/app.js')(app);

app.listen(port, ipaddress, function(){
    console.log('listening on: ' + ipaddress + ':' + port);
});