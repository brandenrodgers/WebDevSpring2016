/**
 * Created by branden on 3/3/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .factory("SqootService", sqootService);

    function sqootService($http) {
        var api = {
            searchDeals: searchDeals,
            getDealById: getDealById
        };
        return api;

        function searchDeals(params) {
            return $http.get("http://api.sqoot.com/v2/deals/?api_key=30el0r", params);
        }

        function getDealById(dealId) {
            return $http.get("http://api.sqoot.com/v2/deals/" + dealId + "/?api_key=30el0r");
        }
    }
})();