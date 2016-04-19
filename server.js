// simple express server
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var multer = require('multer');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session       = require('express-session');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var connectionString = 'mongodb://127.0.0.1:27017/webdev2016';
// use remote connection string if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
multer();
app.use(cookieParser());
app.use(session({
    secret: process.env.PASSPORT_SECRET || "My Secret",
    resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://webdevspring2016-rodgersbranden.rhcloud.com');

    // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function(req, res){
    res.sendfile((__dirname + '/index.html'));
});

// Had to do this for the passport issues
var userProjectModel = require("./public/project/cheapeats/server/models/user.model.server.js")(db, mongoose);
var userAssignmentModel = require("./public/assignment/server/models/user.model.server.js")(db, mongoose);

require('./public/assignment/server/app.js')(app, db, mongoose, userAssignmentModel);
require('./public/project/cheapeats/server/app.js')(app, db,mongoose, userProjectModel);
require('./public/experiments/telestrations/server/app.js')(app);
require('./public/security/security.js')(app, userAssignmentModel, userProjectModel);

app.listen(port, ipaddress, function(){
    console.log('listening on: ' + ipaddress + ':' + port);
});