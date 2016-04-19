/**
 * Created by branden on 3/3/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .factory("DealService", dealService);

    function dealService($http) {
        var api = {
            createDeal: createDeal,
            updateDeal: updateDeal,
            getDealById: getDealById,
            findLocalDeals: findLocalDeals,
            getDealBySqootId: getDealBySqootId,
            userFavoritesDeal: userFavoritesDeal,
            findDealFavorites: findDealFavorites,
            getUserLocalDeals: getUserLocalDeals,
            getUserFavorites: getUserFavorites,
        };
        return api;

        function userFavoritesDeal(user, deal) {
            return $http.post("/api/cheapeats/user/deal/favorite/" + user._id, {user: user, deal: deal});
        }

        function createDeal(deal) {
            return $http.post("/api/cheapeats/deal", deal);
        }

        function updateDeal(dealId, deal){
            return $http.put("/api/cheapeats/deal/" + dealId, deal);
        }

        function findLocalDeals(){
            return $http.get("/api/cheapeats/localsearch");
        }

        function getDealById(dealId){
            return $http.get("/api/cheapeats/deal/" + dealId);
        }

        function getDealBySqootId(sqootId){
            return $http.get("/api/cheapeats/deal/sqoot/" + sqootId);
        }

        function getUserLocalDeals(userId){
            return $http.get("/api/cheapeats/user/" + userId + "/deal/profile");
        }

        function getUserFavorites(dealIds){
            return $http.post("/api/cheapeats/user/deal/favorites", dealIds);
        }

        function findDealFavorites(dealId){
            return $http.get("/api/cheapeats/favorites/deal/" + dealId);
        }


    }
})();