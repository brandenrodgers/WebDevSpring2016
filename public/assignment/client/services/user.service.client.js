/**
 * Created by branden on 2/22/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope){

        var service = {
            setCurrentUser: setCurrentUser,
            logoutUser: logoutUser,
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

        function logoutUser(){
            return $http.post("/api/assignments/logout");
        }

        function getCurrentUser(){
            return $http.get("/api/assignments/loggedin");
        }

        function findUserByCredentials(username, password){
            var credentials = {
                username: username,
                password: password
            };
            return $http.post("/api/assignments/creds", credentials);
        }

        function findAllUsers(){
            return $http.get("/api/assignments/user");
        }

        function createUser(user){
            return $http.post("/api/assignments/user", user);
        }

        function deleteUser(userId){
            return $http.delete("/api/assignments/user/" + userId);
        }

        function updateUser(userId, user){
            return $http.put("/api/assignments/user/" + userId, user);
        }

    }

})();