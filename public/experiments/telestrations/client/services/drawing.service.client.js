/**
 * Created by branden on 3/3/16.
 */
(function(){
    angular
        .module("DrawingApp")
        .factory("drawingService", drawingService);

    function drawingService($http) {
        var api = {
            save: save,
            getAll: getAll
        };
        return api;

        function save(url) {
            var data = {url: url};
            return $http.post("/api/drawing/save", data);
        }

        function getAll() {
            return $http.get("/api/drawing/all");
        }

    }
})();