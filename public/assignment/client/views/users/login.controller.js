/**
 * Created by branden on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService){
        var vm = this;
        vm.login = login;

        vm.errorMessage = null;

        function login(user){
            UserService
                .loginUser(user)
                .then(
                    function(response)
                    {
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    },
                    function(err) {
                        vm.errorMessage = "Invalid Credentials";
                    }
                );
        }
    }

})();