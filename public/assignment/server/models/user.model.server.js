/**
 * Created by branden on 3/16/16.
 */
var q = require('q');

module.exports = function(db, mongoose) {

    //load user schema
    var userSchema = require('./user.schema.server.js')(mongoose);

    //create user model from schema
    var UserModel = mongoose.model('User', userSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();

        // Insert new object
        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findUserByCredentials(credentials){
        var deferred = q.defer();

        // Retrieve one document
        UserModel.findOne(
            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            function(err, doc) {

                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        UserModel.update(userId, user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();

        UserModel.findByIdAndRemove(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }


};