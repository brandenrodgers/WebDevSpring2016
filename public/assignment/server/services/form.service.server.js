/**
 * Created by branden on 3/16/16.
 */

module.exports = function(app, formModel) {
    app.post("/api/assignments/form", createForm);
    app.get("/api/assignments/forms/:userId", findAllForms);
    app.get("/api/assignments/form/:id", findFormById);
    app.put("/api/assignments/form/:id", updateForm);
    app.delete("/api/assignments/form/:id", deleteForm);

    function createForm(req, res) {
        var form = req.body;

        formModel.createForm(form)
            // handle model promise
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllForms(req, res) {
        var userId = req.params.userId;
        formModel.findAllForms(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormById(req, res) {
        var formId = req.params.id;
        formModel.findFormById(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateForm(req, res) {
        var form = req.body;
        var formId = req.params.id;
        formModel.updateForm(formId, form)
            .then(
                function (doc) {
                    formModel.findFormById(formId)
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            function ( err ) {
                                res.status(400).send(err);
                            }
                        );
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteForm(req, res) {
        var formId = req.params.id;
        formModel.deleteForm(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
};