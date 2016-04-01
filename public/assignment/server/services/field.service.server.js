/**
 * Created by branden on 3/16/16.
 */

module.exports = function(app, fieldModel) {
    app.get("/api/assignments/form/:formId/field", findFields);
    app.get("/api/assignments/form/:formId/field/:fieldId", findFieldById);
    app.delete("/api/assignments/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignments/form/:formId/field", createField);
    app.put("/api/assignments/form/:formId/field/:fieldId", updateField);
    app.post("/api/assignments/form/:formId/field/reorder", reorderFields);


    function findFields(req, res) {
        var formId = req.params.formId;
        fieldModel.findFormFields(formId)
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

    function findFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.findFormFieldById(formId, fieldId)
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

    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFormField(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }


    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel.createFormField(formId, field)
            .then(
                function ( doc ) {
                    var fields = doc.fields;
                    res.json(fields);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel.updateFormField(formId, fieldId, field)
            .then(
                function (doc) {
                    fieldModel.findFormFieldById(formId, fieldId)
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

    function reorderFields(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        fieldModel.reorderFormFields(formId, fields)
            .then(
                function ( doc ) {
                    var fields = doc.fields;
                    res.json(fields);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

};