(function(){
    angular
        .module("ExperimentsApp", [])
        .controller("ExperimentsController", ExperimentsController);

    function ExperimentsController($scope, $http) {
        $scope.header = "Enter two Numbers to Add Together";

        $scope.addIntegers = addIntegers;
        $scope.search = search;
        $scope.getMovieData = getMovieData;

        function addIntegers(num1, num2) {
            $scope.result = parseInt(num1) + parseInt(num2);
        }

        function search(title){
            $http.get("http://www.omdbapi.com/?s=" + title)
                .success(render);
        }

        function render(response){
            $scope.data = response;
        }

        function getMovieData(imdbID){
            console.log(imdbID);
            $http.get("http://www.omdbapi.com/?i=" + imdbID)
                .success(updateMovieInfo);
        }

        function updateMovieInfo(response){
            $scope.movieTitle = response.Title;
            $scope.movieDirector = response.Director;
            $scope.moviePlot = response.Plot;
        }
    }
})();