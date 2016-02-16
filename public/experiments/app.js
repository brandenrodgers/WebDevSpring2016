(function(){
    angular
        .module("ExperimentsApp", [])
        .controller("ExperimentsController", ExperimentsController);

    function ExperimentsController($scope) {
        $scope.header = "Hello World from AngularJS";

        $scope.addIntegers = addIntegers;

        function addIntegers(num1, num2) {
            $scope.result = parseInt(num1) + parseInt(num2);
        }
    }
})();