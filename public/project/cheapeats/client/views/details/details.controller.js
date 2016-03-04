/**
 * Created by branden on 3/3/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, SqootService, $rootScope, DealService, $location){
        var vm = this;
        var dealId = $routeParams.dealId;
        var currentUser = $rootScope.currentUser;

        vm.dealFavoritesByUsers = null;

        vm.favoriteDeal = favoriteDeal;

        function init(){
            SqootService
                .getDealById(dealId)
                .then(function(response){
                   vm.data = response.data.deal;
                });

            DealService
                .findDealFavorites(dealId)
                .then(function(response){
                    if (response.data){
                        vm.dealFavoritesByUsers = response.data;
                    }
                });
        }
        init();

        function favoriteDeal(deal){
            if(currentUser){
                DealService
                    .userFavoritesDeal(currentUser._id, deal);
            }
            else {
                $location.url("/login");
            }
        }

    }
})();