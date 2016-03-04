/**
 * Created by branden on 3/3/16.
 */
var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
    };
    return api;

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function updateUser(userId, user) {
        for(var u in mock) {
            if( mock[u]._id === userId ) {
                mock[u] = user;
                return;
            }
        }
    }

    function findUserById(userId) {
        console.log("length of mock;" +  mock.length);
        for(var u in mock) {
            if( mock[u]._id === userId ) {
                return mock[u];
            }
        }
        return null;
    }

    function findUsersByIds(userIds) {
        var users = [];
        for (var u in userIds) {
            var user = findUserById(userIds[u]);
            if (user) {
                users.push(user);
            }
        }
        return users;
    }

    function findUserByCredentials(credentials) {
        for(var u in mock) {
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }
};