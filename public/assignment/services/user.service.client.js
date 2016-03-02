/**
 * Created by branden on 2/22/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope){
        var currentUsers = [];

        currentUsers = [
            {"_id":123, "firstName":"Alice", "lastName":"Wonderland", "username":"alice", "password":"alice", "roles": ["student"]},
            {"_id":234, "firstName":"Bob", "lastName":"Hope", "username":"bob", "password":"bob", "roles": ["admin"]},
            {"_id":345, "firstName":"Charlie", "lastName":"Brown", "username":"charlie","password":"charlie", "roles": ["faculty"]},
            {"_id":456, "firstName":"Dan", "lastName":"Craig", "username":"dan", "password":"dan", "roles": ["faculty", "admin"]},
            {"_id":567, "firstName":"Edward", "lastName":"Norton", "username":"ed", "password":"ed", "roles": ["student"]}
        ];

        var service = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser
        };

        return service;

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function getCurrentUser(){
            return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password, callback){
            var result = null;
            for (var i=0; i < currentUsers.length; i++){
                if (currentUsers[i].username === username && currentUsers[i].password === password) {
                    result = currentUsers[i];
                    break;
                }
            }
            callback(result);
        }

        function findAllUsers(callback){
            callback(currentUsers);
        }

        function createUser(user, callback){
            user._id = (new Date).getTime();
            currentUsers.push(user);
            console.log("created new users: " + user.username);
            callback(user);
        }

        function deleteUser(userId, callback){
            for (var i=0; i < currentUsers.length; i++){
                if (currentUsers[i]._id == userId){
                    currentUsers.splice(i, 1);
                    break;
                }
            }
            callback(currentUsers);
        }

        function updateUser(userId, user, callback){
            for (var i=0; i < currentUsers.length; i++){
                if (currentUsers[i]._id == userId){
                    currentUsers[i] = user;
                    break;
                }
            }
            callback(user);
        }

    }

})();