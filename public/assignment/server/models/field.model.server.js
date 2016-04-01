/**
 * Created by branden on 3/31/16.
 */

var q = require('q');

module.exports = function(db, mongoose) {

    //get form model from schema
    var FormModel = mongoose.model('Form');

    var api = {
        findFormFields: findFormFields,
        findFormFieldById: findFormFieldById,
        deleteFormField: deleteFormField,
        createFormField: createFormField,
        updateFormField: updateFormField,
        reorderFormFields: reorderFormFields
    };
    return api;


    function findFormFields(formId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var fields = doc.fields;
                deferred.resolve(fields);
            }
        });
        return deferred.promise;
    }

    function findFormFieldById(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var field = doc.fields.id(fieldId);
                deferred.resolve(field);
            }
        });
        return deferred.promise;
    }

    function deleteFormField(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.fields.id(fieldId).remove();
                doc.save(function(err, doc){
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function createFormField(formId, field) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                field = buildNewField(field);
                doc.fields.push(field);
                doc.save(function(err, doc){
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function updateFormField(formId, fieldId, field) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var formField = doc.fields.id(fieldId);
                formField.label = field.label || formField.label;
                formField.type = field.type || formField.type;
                if (formField.type != "DATE") {
                    if (formField.type == "TEXT" || formField.type == "TEXTAREA") {
                        formField.placeholder = field.placeholder || formField.placeholder;
                    }
                    else {
                        formField.options = field.options || formField.options;
                    }
                }
                doc.save(function(err, doc){
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
                deferred.resolve(field);
            }
        });
        return deferred.promise;
    }

    function reorderFormFields(formId, fields) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.fields = fields;
                doc.save(function(err, doc){
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function buildNewField(field) {
        if (field.type == "Single Line Text Field") {
            field.type = "TEXT";
            field.label = "New Text Field";
            field.placeholder = "New Field";
            return field;
        }
        else if (field.type == "Multi Line Text Field") {
            field.type = "TEXTAREA";
            field.label = "New Text Field";
            field.placeholder = "New Field";
            return field;
        }
        else if (field.type == "Date Field") {
            field.type = "DATE";
            field.label = "New Date Field";
            return field;
        }
        else if (field.type == "Dropdown Field") {
            field.type = "OPTIONS";
            field.label = "New Dropdown";
            field.options = [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ];
            return field;
        }
        else if (field.type == "Checkboxes Field") {
            field.type = "CHECKBOXES";
            field.label = "New Checkboxes";
            field.options = [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ];
            return field;
        }
        else if (field.type == "Radio Buttons Field") {
            field.type = "RADIOS";
            field.label = "New Radio Buttons";
            field.options = [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ];
            return field;
        }
    }

};