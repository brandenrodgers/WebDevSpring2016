/**
 * Created by branden on 3/1/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("LocalSearchController", localSearchController);

    var currentPage = 1;

    function localSearchController($location, DealService, $anchorScroll) {
        var vm = this;

        vm.firstPage = firstPage;
        vm.previousPage = previousPage;
        vm.nextPage = nextPage;
        vm.lastPage = lastPage;


        vm.errorMessage = null;
        vm.dealGroups = [];
        vm.currentPage = currentPage;
        vm.totalPages = 0;

        function init() {
            DealService
                .findLocalDeals()
                .then(
                    function(response) {
                        vm.totalPages = Math.ceil(response.data.length / 18);
                        vm.dealGroups = groupResults(response.data);
                    },
                    function(err) {
                        vm.errorMessage = "Could not get deals";
                    }
                );
        }
        init();


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