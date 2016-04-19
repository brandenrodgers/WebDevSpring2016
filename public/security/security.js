/**
 * Created by branden on 4/19/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, userAssignmentModel, userProjectModel) {
    passport.use('assignment', new LocalStrategy(localAssignmentStrategy));
    passport.use('project', new LocalStrategy(localProjectStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localAssignmentStrategy(username, password, done) {
        userAssignmentModel
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

    function localProjectStrategy(username, password, done) {
        userProjectModel
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

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        if (user.type == "assignment") {
            userAssignmentModel
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
        else if (user.type == "project") {
            userProjectModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        delete user.password;
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
    }


};