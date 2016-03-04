/**
 * Created by branden on 3/1/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("SearchController", searchController);

    function searchController(SqootService) {
        var vm = this;

        vm.search = search;
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;

        vm.errorMessage = null;
        vm.dealGroups = [];
        vm.currentPage = 1;
        vm.currentSearchInfo = {};

        function init() {
            var searchInfo = {
                location: "Boston"
            };
            search(searchInfo);
        }
        init();


        function search(searchInfo){
            vm.currentSearchInfo = searchInfo;
            var data = {
                location: searchInfo.location || null,
                radius: searchInfo.radius || null,
                per_page: 12,
                category_slugs: "restaurants",
                page: vm.currentPage
            };

            var config = {
                params: data
            };

            SqootService
                .searchDeals(config)
                .then(function(response) {
                    sortResults(response.data.deals);
                });
        }


        function sortResults(deals){
            var result = [];
            for(var i=0; i < deals.length; i+=3){
                result.push(deals.slice(i, i+3));
            }
            vm.dealGroups = result;
        }

        function nextPage(searchInfo){
            vm.currentPage += 1;
            search(vm.currentSearchInfo);
        }

        function previousPage(searchInfo){
            if (vm.currentPage > 1) {
                vm.currentPage -= 1;
                search(vm.currentSearchInfo);
            }
        }
    }
})();