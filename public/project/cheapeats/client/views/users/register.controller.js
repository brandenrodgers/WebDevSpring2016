/**
 * Created by branden on 3/1/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location) {
        var vm = this;

        vm.errorMessage = null;
        vm.usernameBox = false;
        vm.passwordBox = false;
        vm.password2Box = false;

        vm.register = register;

        function init() {
        }
        init();

        function register(user) {
            var validForm = checkFormInputs(user);
            if (validForm) {
                UserService
                    .createUser({
                        username: user.username,
                        password: user.password,
                        email: user.email,
                        city: user.city,
                        state: user.state
                    })
                    .then(function (response) {
                        if (response.data) {
                            UserService.setCurrentUser(response.data);
                            vm.errorMessage = null;
                            $location.url("/profile");
                        }
                        else {
                            vm.errorMessage = "Error creating account"
                        }
                    });
            }
        }

        function checkFormInputs(user){
            var validForm = true;
            vm.usernameBox = false;
            vm.passwordBox = false;
            vm.password2Box = false;
            if(!user) {
                vm.usernameBox = true;
                vm.passwordBox = true;
                vm.password2Box = true;
                validForm = false;
                return validForm;
            }
            if (!user.username){
                vm.usernameBox = true;
                validForm = false;
            }
            if(!user.password){
                vm.passwordBox = true;
                validForm = false;
            }
            if(!user.password2){
                vm.password2Box = true;
                validForm = false;
            }
            if(user.password !== user.password2){
                vm.passwordBox = true;
                vm.password2Box = true;
                vm.errorMessage = "Passwords do not match";
                validForm = false;
            }

            return validForm;
        }
    }
})();