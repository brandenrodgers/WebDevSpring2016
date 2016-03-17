/**
 * Created by branden on 3/16/16.
 */
var forms = require('./form.mock.json');
module.exports = function() {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormByTitle: findFormByTitle,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm
    };
    return api;

    function createForm(form) {
        forms.push(form);
        return forms;
    }

    function findAllForms() {
        return forms;
    }

    function findFormByTitle(title){
        for(var x in forms){
            if(forms[x].title == title){
                return forms[x];
            }
        }
        return null;
    }

    function findFormById(formId) {
        for(var x in forms){
            if(forms[x]._id == formId){
                return forms[x];
            }
        }
        return null;
    }

    function updateForm(formId, form) {
        for(var x in forms){
            if(forms[x]._id == formId){
                forms[x].title = form.title || forms[x].title;
                forms[x].userId = form.userId || forms[x].userId;
                return;
            }
        }
    }

    function deleteForm(formId) {
        for(var x in forms){
            if(forms[x]._id == formId){
                forms[x].splice(x,1);
            }
        }
    }


};