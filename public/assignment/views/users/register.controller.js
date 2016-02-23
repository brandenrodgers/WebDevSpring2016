/**
 * Created by branden on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService){

        $scope.errorMessage = null;

        $scope.register = register;

        function register(user){

            if(!user.username){
                $scope.errorMessage = "Please provide a username";
                return;
            }
            if(!user.password || !user.password2){
                $scope.errorMessage = "Please provide a password";
                return;
            }
            if(user.password !== user.password2){
                $scope.errorMessage = "Passwords must match";
                return;
            }

            UserService.createUser(user, function(newUser){
                UserService.setCurrentUser(newUser);
                $location.url("/profile");
            });

        }
    }

})();
