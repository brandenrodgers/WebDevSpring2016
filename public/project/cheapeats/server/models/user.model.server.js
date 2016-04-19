/**
 * Created by branden on 3/3/16.
 */
module.exports = function(db, mongoose) {

    //load user schema
    var userSchema = require('./user.schema.server.js')(mongoose);

    //create user model from schema
    var UserModel = mongoose.model('project.User', userSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findDealFavorites: findDealFavorites,
        removeDeletedDeal: removeDeletedDeal,
    };
    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function removeDeletedDeal(dealId){
        return UserModel.update({favorites: dealId}, {$pull: {favorites: dealId}}, {multi: true});
    }

    function findDealFavorites(dealId) {
        return UserModel.find({favorites: dealId});
    }

    function updateUser(userId, user) {
        return UserModel.update({_id: userId}, {$set: user});
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUsersByIds(userIds) {
        return UserModel.find({'_id': { $in: userIds}});
    }

    function findUserByCredentials(credentials) {
       return UserModel.findOne(
            { username: credentials.username,
                password: credentials.password });

    }

    function findUserByUsername(username){
        return UserModel.findOne({username: username});
    }
};