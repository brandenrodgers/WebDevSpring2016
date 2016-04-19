/**
 * Created by branden on 4/17/16.
 */

(function(){
    angular
        .module("CheapEatsApp")
        .controller("DealController", dealController);

    function dealController($rootScope, $routeParams, DealService, $location) {
        var vm = this;

        vm.currentUser = $rootScope.currentUser;
        vm.dealId = $routeParams.dealId;

        vm.deal = {};
        vm.editing = false;

        vm.createDeal = createDeal;
        vm.updateDeal = updateDeal;
        vm.deleteDeal = deleteDeal;

        function init() {
            if (!vm.dealId) {
                vm.deal = {
                    userId: vm.currentUser._id,
                    type: "LOCAL",
                    title: null,
                    discount_amount: null,
                    short_title: null,
                    price: null,
                    description: null,
                    url: null
                };
            } else {
                DealService
                    .getDealById(vm.dealId)
                    .then(function (response) {
                        if (response.data) {
                            vm.deal = response.data;
                            vm.editing = true;
                        }
                        else {
                            vm.errorMessage = "Error fetching Deal"
                        }
                    });
            }
        }
        init();

        function createDeal(deal) {
            var validForm = checkFormInputs(deal);
            if (validForm) {
                DealService
                    .createDeal(deal)
                    .then(function (response) {
                        if (response.data) {
                           $location.url("/profile/" + vm.currentUser.username);
                        }
                        else {
                            vm.errorMessage = "Error creating Deal"
                        }
                    });
            }
        }

        function updateDeal(deal) {
            var validForm = checkFormInputs(deal);
            if (validForm) {
                DealService
                    .updateDeal(deal._id, deal)
                    .then(function (response) {
                        if (response.data) {
                            $location.url("/profile/" + vm.currentUser.username);
                        }
                        else {
                            vm.errorMessage = "Error creating Deal"
                        }
                    });
            }
        }

        function deleteDeal(deal) {
            DealService
                .deleteDeal(deal._id)
                .then(function (response) {
                    $location.url("/profile/" + vm.currentUser.username);
                },
                function(err) {
                        vm.errorMessage = "Error deleting Deal"
                    }
                );

        }

        function checkFormInputs(deal){
            var validForm = true;
            if(!deal) {
                validForm = false;
            }
            if (!deal.title){
                validForm = false;
                vm.errorMessage = "You must enter a title";
            }
            if (!deal.short_title){
                validForm = false;
                vm.errorMessage = "You must enter a short title";
            }
            if(!deal.description){
                validForm = false;
                vm.errorMessage = "You must enter a description";
            }
            if(deal.discount_amount){
                if(isNaN(parseFloat(deal.discount_amount)) && !isFinite(deal.discount_amount)){
                    validForm = false;
                    vm.errorMessage = "Invalid Discount Amount Entry";
                }
            }
            if(deal.price){
                if(isNaN(parseFloat(deal.price)) && !isFinite(deal.price)){
                    validForm = false;
                    vm.errorMessage = "Invalid Price Entry";
                }
            }
            return validForm;
        }
    }
})();
