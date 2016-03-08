/**
 * Created by branden on 3/3/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, SqootService, $rootScope, DealService, $location, $sce){
        var vm = this;
        var dealId = $routeParams.dealId;
        var currentUser = $rootScope.currentUser;

        vm.dealFavoritesByUsers = null;
        vm.favorited = false;

        vm.favoriteDeal = favoriteDeal;

        function init(){
            SqootService
                .getDealById(dealId)
                .then(function(response){
                   vm.data = response.data.deal;
                    vm.data.description = $sce.trustAsHtml(vm.data.description);
                });

            DealService
                .findDealFavorites(dealId)
                .then(function(response){
                    if (response.data){
                        vm.dealFavoritesByUsers = response.data;
                        if (currentUser) {
                            checkUserFavorite();
                        }
                    }
                });
        }
        init();

        function favoriteDeal(deal){
            if(currentUser){
                if(!vm.favorited) {
                    vm.favorited = true;
                    DealService
                        .userFavoritesDeal(currentUser._id, deal);
                }
                else {
                    vm.favorited = false;
                    DealService
                        .userUnfavoritesDeal(currentUser._id, deal);
                }
            }
            else {
                $location.url("/login");
            }
        }


        function checkUserFavorite(){
            for(var i=0; i <  vm.dealFavoritesByUsers.length; i++){
                if(vm.dealFavoritesByUsers[i].username == currentUser.username) {
                    vm.favorited = true;
                }
            }
        }

    }
})();