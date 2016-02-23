/**
 * Created by branden on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService){

        $scope.login = login;

        function login(user){
            UserService.findUserByCredentials(user.username, user.password, function(result){
               if (result){
                   $rootScope.currentUser = result;
                   $location.url("/profile");
               }
                else {
                   $scope.errorMessage = "Invalid Credentials";
               }

            });
        }
    }

})();