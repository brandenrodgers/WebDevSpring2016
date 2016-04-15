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
            loginUser: loginUser,
            logoutUser: logoutUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            registerUser: registerUser,
            deleteUser: deleteUser,
            updateUserAdmin: updateUserAdmin,
            updateUserProfile: updateUserProfile
        };

        return service;

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function logoutUser(){
            return $http.post("/api/assignments/logout");
        }

        function loginUser(user){
            return $http.post("/api/assignments/login", user);
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

        function registerUser(user){
            return $http.post("/api/assignments/register", user);
        }

        function createUser(user){
            return $http.post("/api/assignments/user", user);
        }

        function deleteUser(userId){
            return $http.delete("/api/assignments/user/" + userId);
        }

        function updateUserAdmin(userId, user){
            return $http.put("/api/assignments/user/" + userId, user);
        }

        function updateUserProfile(userId, user){
            return $http.put("/api/assignments/userprofile/" + userId, user);
        }

    }

})();