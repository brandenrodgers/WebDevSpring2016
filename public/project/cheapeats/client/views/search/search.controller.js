/**
 * Created by branden on 3/1/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("SearchController", searchController);

    var currentPage = 1;

    function searchController(SqootService, $location, $anchorScroll) {
        var vm = this;

        vm.search = search;
        vm.firstPage = firstPage;
        vm.previousPage = previousPage;
        vm.nextPage = nextPage;
        vm.lastPage = lastPage;


        vm.errorMessage = null;
        vm.dealGroups = [];
        vm.currentSearchInfo = {};
        vm.currentPage = currentPage;
        vm.totalPages = 0;

        function init() {
            var searchInfo = {
                location: "Boston"
            };
            search(searchInfo);
        }
        init();


        function search(searchInfo){
            vm.currentSearchInfo = searchInfo || {};
            var reqData = {
                params: {
                    location: vm.currentSearchInfo.location || null,
                    radius: vm.currentSearchInfo.radius || null,
                    per_page: 18,
                    category_slugs: "restaurants",
                    page: vm.currentPage
                }
            };

            SqootService
                .searchDeals(reqData)
                .then(function(response) {
                    if (response.data) {
                        vm.totalPages = Math.ceil(response.data.query.total / response.data.query.per_page);
                        var uniqueDeals = removeDuplicates(response.data.deals);
                        vm.dealGroups = groupResults(uniqueDeals);
                    }
                });
        }


        function removeDuplicates(deals){
            var seen = {};
            return deals.filter(function(deal) {
                return seen[deal.deal.title] ? false : (seen[deal.deal.title] = true);
            });
        }

        function groupResults(deals){
            var result = [];
            for(var i=0; i < deals.length; i+=3){
                result.push(deals.slice(i, i+3));
            }
            return result;
        }

        function firstPage(){
            if (vm.currentPage > 1) {
                vm.currentPage = 1;
                search(vm.currentSearchInfo);
                sendUserToTop();
            }
        }

        function previousPage(){
            if (vm.currentPage > 1) {
                vm.currentPage -= 1;
                search(vm.currentSearchInfo);
                sendUserToTop();
            }
        }

        function nextPage(){
            if (vm.currentPage < vm.totalPages) {
                vm.currentPage += 1;
                search(vm.currentSearchInfo);
                sendUserToTop();
            }
        }


        function lastPage(){
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