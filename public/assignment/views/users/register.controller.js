/**
 * Created by branden on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService){

        $scope.register = register;

        function register(){
            var userInfo = {
                username: $scope.inputUName,
                password: $scope.inputPwd
            };

            UserService.createUser(userInfo, function(newUser){
                $rootScope.currentUser = newUser;
                $location.url("/profile");
            });

        }
    }

})();
