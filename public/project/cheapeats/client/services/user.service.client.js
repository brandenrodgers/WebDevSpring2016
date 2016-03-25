/**
 * Created by branden on 3/3/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            login: login,
            logout: logout,
            updateUser: updateUser,
            createUser: createUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            getProfile: getProfile,
        };
        return api;

        function login(credentials) {
            return $http.post("/api/cheapeats/login", credentials);
        }

        function logout() {
            return $http.post("/api/cheapeats/logout");
        }

        function updateUser(user) {
            return $http.put("/api/cheapeats/update", user);
        }

        function createUser(user) {
            return $http.post("/api/cheapeats/register", user);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/cheapeats/loggedin");
        }

        function getProfile() {
            return $http.get("/api/cheapeats/profile/" + $rootScope.currentUser._id);
        }

    }
})();