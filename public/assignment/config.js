/**
 * Created by branden on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl: "./views/home/home.view.html"
            })
            .when("/forms", {
                templateUrl: "./views/forms/forms.view.html"
            })
            .when("/register", {
                templateUrl: "./views/users/register.view.html"
            })
            .when("/login", {
                templateUrl: "./views/users/login.view.html"
            })
            .when("/profile", {
                templateUrl: "./views/users/profile.view.html"
            })
            .when("/admin", {
                templateUrl: "./views/admin/admin.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

})();