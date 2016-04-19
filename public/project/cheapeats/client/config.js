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
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile/:username?", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/deals", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/local", {
                templateUrl: "views/localSearch/localSearch.view.html",
                controller: "LocalSearchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/deal/:dealId?", {
                templateUrl: "views/deal/deal.view.html",
                controller: "DealController",
                controllerAs: "model"
            })
            .when("/details/:dealId", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "model"
            })
            .when("/about", {
                templateUrl: "views/general/about.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/cheapeats/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };


    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/cheapeats/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();