/**
 * Created by branden on 3/1/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("SearchController", searchController);

    function searchController(SqootService, $location, $anchorScroll) {
        var vm = this;

        vm.search = search;
        vm.firstPage = firstPage;
        vm.previousPage = previousPage;
        vm.nextPage = nextPage;
        vm.lastPage = lastPage;


        vm.errorMessage = null;
        vm.dealGroups = [];
        vm.currentPage = 1;
        vm.totalPages = 2;
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
                    vm.totalPages = Math.ceil(response.data.query.total / response.data.query.per_page);
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

        function firstPage(searchInfo){
            if (vm.currentPage > 1) {
                vm.currentPage = 1;
                search(vm.currentSearchInfo);
                sendUserToTop();
            }
        }

        function previousPage(searchInfo){
            if (vm.currentPage > 1) {
                vm.currentPage -= 1;
                search(vm.currentSearchInfo);
                sendUserToTop();
            }
        }

        function nextPage(searchInfo){
            if (vm.currentPage < vm.totalPages) {
                vm.currentPage += 1;
                search(vm.currentSearchInfo);
                sendUserToTop();
            }
        }


        function lastPage(searchInfo){
            if (vm.currentPage < vm.totalPages) {
                vm.currentPage = vm.totalPages;
                search(vm.currentSearchInfo);
                sendUserToTop();
            }
        }

        function sendUserToTop(){
            $location.hash("searchResultsTop");
            $anchorScroll();
        }
    }
})();