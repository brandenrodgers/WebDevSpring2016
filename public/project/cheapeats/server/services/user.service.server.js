/**
 * Created by branden on 3/3/16.
 */
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, dealModel, userModel) {

    app.post("/api/cheapeats/login", passport.authenticate('project'), loginUser);
    app.post("/api/cheapeats/logout", logout);
    app.post("/api/cheapeats/register", register);
    app.put("/api/cheapeats/update/:userId", update);
    app.get("/api/cheapeats/loggedin", loggedIn);
    app.get("/api/cheapeats/profile/:userId", profile);


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
        newUser.favorites = [];
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