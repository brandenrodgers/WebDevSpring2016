/**
 * Created by branden on 3/1/16.
 */
(function(){
    angular
        .module("CheapEatsApp")
        .controller("HomeController", homeController);

    function homeController(SqootService) {
        var vm = this;

        vm.dealGroups = [];

        function init() {
            var searchInfo = {
                location: "Boston",
                radius: 15,
                per_page: 10,
                category_slugs: "restaurants",
                order: "updated_at"
            };
            getFeaturedDeals(searchInfo);
        }
        init();


        function getFeaturedDeals(searchInfo){
            var config = {
                params: searchInfo
            };

            SqootService
                .searchDeals(config)
                .then(function(response) {
                    var uniqueDeals = removeDuplicates(response.data.deals);
                    vm.dealGroups = groupResults(uniqueDeals);
                    vm.dealGroups.splice(2, vm.dealGroups.length);
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

    }
})();