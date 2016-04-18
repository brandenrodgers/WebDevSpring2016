/**
 * Created by branden on 3/3/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, SqootService, $rootScope, DealService, UserService, $location, $sce){
        var vm = this;
        vm.id = $routeParams.dealId; //either a sqoot id or a db id
        vm.currentUser = $rootScope.currentUser;

        vm.dealFavoritesByUsers = null;
        vm.favorited = false;
        vm.data = {};

        vm.favoriteDeal = favoriteDeal;

        function init(){
            SqootService
                .getDealById(vm.id)
                .then(
                    function(response){
                        vm.data = response.data.deal;
                        vm.data.sceDescription = $sce.trustAsHtml(vm.data.description);
                        vm.data.sqootId = vm.data.id.toString();
                        DealService
                            .getDealBySqootId(vm.data.sqootId)
                            .then(
                                function (response) {
                                    if (response.data.length > 0) {
                                        vm.data._id = response.data[0]._id;
                                        if (vm.currentUser) {
                                            if (vm.currentUser.favorites.indexOf(vm.data._id) > -1) {
                                                vm.favorited = true;
                                            }
                                        }
                                        getFavorites(vm.data._id);
                                    }
                                },
                                function (err) {
                                    //deal doesn't exist in db yet
                                }
                            );
                    },
                    function (err){
                        DealService
                            .getDealById(vm.id)
                            .then(
                                function (response) {
                                    vm.data = response.data;
                                    vm.data.sceDescription = $sce.trustAsHtml(vm.data.description);
                                    if (!vm.data.image_url) {
                                    }
                                    if (vm.currentUser) {
                                        if (vm.currentUser.favorites.indexOf(vm.data._id) > -1) {
                                            vm.favorited = true;
                                        }
                                    }
                                    getFavorites(vm.data._id);
                                },
                                function (err) {
                                    //deal doesn't exist in sqoot or db yet
                                }
                            );
                    }

                );

        }
        init();


        function getFavorites(dealId){
            DealService
                .findDealFavorites(dealId)
                .then(function(response){
                    if (response.data){

                        vm.dealFavoritesByUsers = response.data;
                    }
                });
        }

        function favoriteDeal(deal){
            if(vm.currentUser){
                if(!vm.favorited) {
                    DealService
                        .userFavoritesDeal(vm.currentUser, deal)
                        .then(
                            function (response) {
                                vm.data._id = response.data.resultingId;
                                vm.currentUser.favorites.push(vm.data._id);
                                vm.favorited = true;
                            },
                            function (err) {
                                vm.errorMessage = "Error favoriting";
                            }
                        );
                }
                else {
                    var index = vm.currentUser.favorites.indexOf(deal._id);
                    if (index > -1) {
                        vm.currentUser.favorites.splice(index, 1);
                        UserService
                            .updateUser(vm.currentUser)
                            .then(
                                function (response) {
                                    vm.favorited = false;
                                },
                                function (err) {
                                    vm.errorMessage = "Error unfavoriting";
                                }
                            );
                    }
                }
            }
            else {
                $location.url("/login");
            }
        }


    }
})();