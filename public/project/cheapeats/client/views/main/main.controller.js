/**
 * Created by branden on 3/1/16.
 */
(function() {
    angular
        .module("CheapEatsApp")
        .controller("MainController", MainController);

    function MainController($scope, $location){
        $scope.$location = $location;
    }

})();