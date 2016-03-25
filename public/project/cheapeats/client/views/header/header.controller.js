/**
 * Created by branden on 3/1/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("HeaderController", headerController);

    function headerController(UserService, $location){
        var vm = this;

        vm.logout = logout;

        function init(){
            vm.location= $location;
        }
        init();

        function logout(){
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }

    }
})();