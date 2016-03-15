/**
 * Created by branden on 3/4/16.
 */
module.exports = function(app, drawingModel) {
    app.post("/api/drawing/save", save);
    app.get("/api/drawing/all", getAll);

    function save(req, res) {
        var drawing  = req.body;
        console.log(req.body);
        drawingModel.saveDrawing(drawing.url);
        res.send(200);
    }

    function getAll(req, res) {
        var drawings = drawingModel.getAllDrawings();
        res.json({drawings: drawings});
    }

};