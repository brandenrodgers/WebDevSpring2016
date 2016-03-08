/**
 * Created by branden on 3/3/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .factory("DealService", dealService);

    function dealService($http) {
        var api = {
            userFavoritesDeal: userFavoritesDeal,
            userUnfavoritesDeal: userUnfavoritesDeal,
            findDealFavorites: findDealFavorites
        };
        return api;

        function userFavoritesDeal(userId, deal) {
            return $http.post("/api/cheapeats/user/"+userId+"/deal/" + deal.id, deal);
        }

        function userUnfavoritesDeal(userId, deal) {
            return $http.post("/api/cheapeats/user/"+userId+"/deal/unfavorite/" + deal.id, deal);
        }

        function findDealFavorites(dealId) {
            return $http.get("/api/cheapeats/deal/"+dealId+"/user");
        }
    }
})();