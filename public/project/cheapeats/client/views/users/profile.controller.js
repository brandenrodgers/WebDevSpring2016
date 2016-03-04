/**
 * Created by branden on 3/1/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $location) {
        var vm = this;

        vm.update = update;

        function init() {
            UserService
                .getProfile()
                .then(function(response){
                    if (response.data) {
                        vm.profile = response.data;
                    }
                    else {
                        $location.url("/home");
                    }
                });
        }
        init();

        function update(){
            UserService
                .updateUser(vm.profile)
                .then(function(response){

                });
        }


    }
})();