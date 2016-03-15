/**
 * Created by branden on 3/3/16.
 */
module.exports = function(app){
    var drawingModel = require("./models/drawing.model.server.js")();

    var drawingService = require("./services/drawing.service.server.js")(app, drawingModel);
};