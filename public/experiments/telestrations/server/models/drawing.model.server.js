/**
 * Created by branden on 3/4/16.
 */
module.exports = function() {
    var drawings = [];

    var api = {
        saveDrawing: saveDrawing,
        getAllDrawings: getAllDrawings
    };
    return api;

    function saveDrawing(url) {
        drawings.push(url);
    }

    function getAllDrawings() {
        return drawings;
    }


};