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

    function saveDrawing(image) {
        image._id = (new Date()).getTime();
        drawings.push(image);
    }

    function getAllDrawings() {
        return drawings;
    }


};