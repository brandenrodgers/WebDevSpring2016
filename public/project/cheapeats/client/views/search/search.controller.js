/**
 * Created by branden on 3/1/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("SearchController", searchController);

    function searchController($location, $http) {
        var vm = this;

        vm.search = search;
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;

        vm.errorMessage = null;
        vm.dealGroups = [];
        vm.currentPage = 1;
        vm.currentSearchInfo = {};

        function init() {
            getDeals();
        }
        init();


        function search(searchInfo){
            vm.currentSearchInfo = searchInfo;
            var data = {
                location: searchInfo.location,
                radius: searchInfo.radius,
                per_page: 12,
                category_slugs: "restaurants",
                page: vm.currentPage
            };

            var config = {
                params: data
            };

            $http.get("http://api.sqoot.com/v2/deals/?api_key=30el0r", config).then(function(response) {
                sortResults(response.data.deals);
            }, function(response) {
            });
        }


        function getDeals() {
            var data = {
                location: "Boston",
                category_slugs: "restaurants",
                per_page: 12
            };

            var config = {
                params: data
            };

            $http.get("http://api.sqoot.com/v2/deals/?api_key=30el0r", config).then(function(response) {
                sortResults(response.data.deals);
            }, function(response) {
            });
        }

        function sortResults(deals){
            var result = [];
            for(var i=0; i < deals.length; i+=3){
                console.log(i);
                result.push(deals.slice(i, i+3));
            }
            vm.dealGroups = result;
        }

        function nextPage(searchInfo){
            vm.currentPage += 1;
            console.log("next page");
            search(vm.currentSearchInfo);
        }

        function previousPage(searchInfo){
            if (vm.currentPage > 1) {
                vm.currentPage -= 1;
                console.log("previous page");
                search(vm.currentSearchInfo);
            }
        }
    }
})();