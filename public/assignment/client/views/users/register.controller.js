/**
 * Created by branden on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService){
        var vm = this;
        vm.errorMessage = null;

        vm.register = register;

        function register(user){

            if(!user.username){
                vm.errorMessage = "Please provide a username";
                return;
            }
            if(!user.password || !user.password2){
                vm.errorMessage = "Please provide a password";
                return;
            }
            if(user.password !== user.password2){
                vm.errorMessage = "Passwords must match";
                return;
            }

            UserService
                .registerUser(user)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });

        }
    }

})();
