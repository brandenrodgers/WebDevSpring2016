/**
 * Created by branden on 3/1/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("ProfileController", profileController);

    function profileController($rootScope, UserService, DealService, $location) {
        var vm = this;

        vm.update = update;
        vm.currentUser = $rootScope.currentUser;
        vm.customer = vm.currentUser.roles.indexOf('customer') > -1;
        vm.deals = [];
        vm.errorMessage = null;

        function init() {
            delete vm.currentUser.password;
            if (vm.customer){
                DealService
                    .getUserFavorites(vm.currentUser.favorites)
                    .then(
                        function(response) {
                            vm.deals = response.data;
                        },
                        function(err) {
                            vm.errorMessage = "Could not get deals";
                        }
                    );
            } else {
                DealService
                    .getUserLocalDeals(vm.currentUser._id)
                    .then(
                        function(response) {
                            vm.deals = response.data;
                        },
                        function(err) {
                            vm.errorMessage = "Could not get deals";
                        }
                    );
            }
        }
        init();

        function update(){
            UserService
                .updateUser(vm.currentUser)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                });
        }


    }
})();