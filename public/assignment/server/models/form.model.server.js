/**
 * Created by branden on 3/16/16.
 */
var q = require('q');

module.exports = function(db, mongoose) {

    //load form schema
    var formSchema = require('./form.schema.server.js')(mongoose);

    ////create form model from schema
    var FormModel = mongoose.model('Form', formSchema);

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm
    };
    return api;

    function createForm(form) {
        var deferred = q.defer();

        // Insert new object
        FormModel.create(form, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findAllForms(userId) {
        var deferred = q.defer();

        FormModel.find({userId: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateForm(formId, form) {
        var deferred = q.defer();

        FormModel.update(formId, form, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

    }

    function deleteForm(formId) {
        var deferred = q.defer();

        FormModel.findByIdAndRemove(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

};