/**
 * Created by branden on 3/1/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("LoginController", loginController);

    function loginController($location) {
        var vm = this;

        vm.errorMessage = null;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            console.log("Logged in: " + user.username);
            $location.url("/profile");
        }
    }
})();