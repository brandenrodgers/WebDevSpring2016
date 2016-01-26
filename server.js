// simple express server
var express = require('express');
var app = express();

var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var IPADDRESS = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendfile((__dirname + '/index.html'));
});

app.listen(PORT, IPADDRESS, function(){
    console.log('listening on: ' + IPADDRESS + ':' + PORT);
});