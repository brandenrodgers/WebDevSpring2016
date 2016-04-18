/**
 * Created by branden on 3/16/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

module.exports = function(app, userModel) {
    //passport.use('assignment', new LocalStrategy(localStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);

    var auth = authorized;
    app.post("/api/assignments/user", auth, createUser);
    app.get("/api/assignments/user", auth, findAllUsers);
    app.get("/api/assignments/user/:id", findUserById);
    app.post("/api/assignments/creds", findUserByCredentials);
    app.put("/api/assignments/user/:id", auth, updateUserAdmin);
    app.put("/api/assignments/userprofile/:id", auth, updateUserProfile);
    app.delete("/api/assignments/user/:id", auth, deleteUser);

    app.post("/api/assignments/register", registerUser);
    app.post("/api/assignments/logout", logoutUser);
   // app.post("/api/assignments/login", passport.authenticate('assignment'), loginUser);
    app.get("/api/assignments/loggedin", loggedIn);

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    // if the user exists, compare passwords with bcrypt.compareSync
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["user"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function registerUser (req, res) {
        var newUser = req.body;
        newUser.roles = ["user"];
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if (user) {
                        res.json(null);
                    } else {
                        // encrypt the password when registering
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                console.log(user);
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function findUserByCredentials(req, res){
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function findAllUsers(req, res) {
        if (isAdmin(req.user)) {
            userModel.findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserProfile(req, res) {
        var newUser = req.body;
        var userId = req.params.id;
        delete newUser._id;

        if (newUser.password) {
            newUser.password = bcrypt.hashSync(newUser.password);
        }

        userModel.updateUser(userId, newUser)
            .then(
                function (user) {
                    return userModel.findUserById(newUser._id);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateUserAdmin(req, res) {
        var newUser = req.body;
        var userId = req.params.id;
        delete newUser._id;

        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        if (newUser.password) {
            newUser.password = bcrypt.hashSync(newUser.password);
        }

        userModel.updateUser(userId, newUser)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        if (isAdmin(req.user)) {
            userModel.deleteUser(userId)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function isAdmin(user) {
        if (user.roles.indexOf("admin") > -1) {
            return true
        }
        return false;
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logoutUser(req, res) {
        req.logOut();
        res.send(200);
    }

    function loginUser(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    delete user.password;
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

};