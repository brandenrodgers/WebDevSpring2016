/**
 * Created by branden on 3/1/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;

        vm.errorMessage = null;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            if(!user) {
                vm.errorMessage = "Enter a username and password";
                return;
            }
            if (!user.username){
                vm.errorMessage = "Enter a username";
                return;
            }
            if(!user.password){
                vm.errorMessage = "Enter a password";
                return;
            }
            UserService
                .login(user)
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        vm.errorMessage = null;
                        $location.url("/profile/" + response.data.username);
                    }
                    else{
                        vm.errorMessage = "Unknown username or password"
                    }
                });
        }
    }
})();