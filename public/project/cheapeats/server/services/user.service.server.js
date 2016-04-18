/**
 * Created by branden on 3/3/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, dealModel, userModel) {
    passport.use('project', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post("/api/cheapeats/login", passport.authenticate('project'), loginUser);
    app.post("/api/cheapeats/logout", logout);
    app.post("/api/cheapeats/register", register);
    app.put("/api/cheapeats/update/:userId", update);
    app.get("/api/cheapeats/loggedin", loggedIn);
    app.get("/api/cheapeats/profile/:userId", profile);

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

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loginUser(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
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

    function register(req, res) {
        var newUser = req.body;
        console.log(newUser);
        if (!newUser.roles) {
            newUser.roles = ["customer"];
        }
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

    function update(req, res) {
        var newUser = req.body;
        var userId = req.params.userId;
        delete newUser._id;

        if (newUser.password) {
            newUser.password = bcrypt.hashSync(newUser.password);
        }

        userModel.updateUser(userId, newUser)
            .then(
                function (user) {
                    return userModel.findUserById(userId);
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

    function profile(req, res) {
        var userId = req.params.userId;
        userModel.findUserById(userId).then(
            function (doc) {
                res.json(doc);
            },
            function ( err ) {
                res.status(400).send(err);
            }
        );
    }


};