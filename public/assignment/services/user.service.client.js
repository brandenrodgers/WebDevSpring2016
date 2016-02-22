/**
 * Created by branden on 2/22/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService(){
        var currentUsers = [];

        currentUsers = [
            {"_id":123, "firstName":"Alice", "lastName":"Wonderland", "username":"alice", "password":"alice", "roles": ["student"]},
            {"_id":234, "firstName":"Bob", "lastName":"Hope", "username":"bob", "password":"bob", "roles": ["admin"]},
            {"_id":345, "firstName":"Charlie", "lastName":"Brown", "username":"charlie","password":"charlie", "roles": ["faculty"]},
            {"_id":456, "firstName":"Dan", "lastName":"Craig", "username":"dan", "password":"dan", "roles": ["faculty", "admin"]},
            {"_id":567, "firstName":"Edward", "lastName":"Norton", "username":"ed", "password":"ed", "roles": ["student"]}
        ];

        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser
        };

        return service;

        function findUserByCredentials(username, password, callback){
            var result = null;
            for(var i=0; i < currentUsers.length; i++){
                if (currentUsers[i].username === username && currentUsers[i].password === password) {
                    result = currentUsers[i];
                    break;
                }
            }
            callback(result);
        }

        function findAllUsers(callback){

        }

        function createUser(user, callback){

        }

        function deleteUser(userId, callback){

        }

        function updateUser(userId, user, callback){

        }

    }

})();