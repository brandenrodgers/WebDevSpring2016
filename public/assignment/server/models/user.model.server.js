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
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        getMongooseModel: getMongooseModel
    };
    return api;

    function createUser(user) {
        console.log("creating user in model");
        return UserModel.create(user);
    }

    function getMongooseModel() {
        return UserModel;
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

    function findUserByUsername(username){
        return UserModel.findOne({username: username});
    }

    function findAllUsers() {
        return UserModel.find();
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function updateUser(userId, user) {
        return UserModel.update({_id: userId}, {$set: user});
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