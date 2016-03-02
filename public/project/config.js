/**
 * Created by branden on 3/1/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "cheapeats/client/views/home/home.view.html"
            })
            .when("/login", {
                templateUrl: "cheapeats/client/views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "cheapeats/client/views/users/register.view.html"
            })
            .when("/profile", {
                templateUrl: "cheapeats/client/views/users/profile.view.html"
            })
            .when("/deals", {
                templateUrl: "cheapeats/client/views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

})();