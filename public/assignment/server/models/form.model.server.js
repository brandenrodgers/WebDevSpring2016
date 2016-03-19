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
        deleteForm: deleteForm,
        findFormFields: findFormFields,
        findFormFieldById: findFormFieldById,
        deleteFormField: deleteFormField,
        createFormField: createFormField,
        updateFormField: updateFormField,
        moveFormField: moveFormField
    };
    return api;

    function createForm(form) {
        form._id = (new Date()).getTime();
        form.fields = [];
        forms.push(form);
        return form;
    }

    function findAllForms(userId) {
        var result = [];
        for(var x in forms){
            if(forms[x].userId == userId){
                result.push(forms[x]);
            }
        }
        return result;
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
                return forms[x];
            }
        }
        return null;
    }

    function deleteForm(formId) {
        for(var x in forms){
            if(forms[x]._id == formId){
                forms.splice(x,1);
            }
        }
    }

    // FIELD STUFF

    function findFormFields(formId){
        for(var x in forms){
            if(forms[x]._id == formId){
                return forms[x].fields;
            }
        }
        return null;
    }

    function findFormFieldById(formId, fieldId){
        for(var x in forms){
            if(forms[x]._id == formId){
                for(var y in forms[x].fields){
                    if(forms[x].fields[y]._id == fieldId){
                        return forms[x].fields[y];
                    }
                }
            }
        }
        return null;
    }

    function deleteFormField(formId, fieldId){
        for(var x in forms){
            if(forms[x]._id == formId){
                for(var y in forms[x].fields){
                    if(forms[x].fields[y]._id == fieldId){
                        forms[x].fields.splice(y,1);
                        break;
                    }
                }
            }
        }
    }

    function createFormField(formId, field){
        for(var x in forms){
            if(forms[x]._id == formId){
                field._id = (new Date()).getTime();
                field = buildNewField(field);
                forms[x].fields.push(field);
                return field;
            }
        }
        return null;
    }

    function updateFormField(formId, fieldId, field){
        for(var x in forms){
            if(forms[x]._id == formId){
                for(var y in forms[x].fields){
                    if(forms[x].fields[y]._id == fieldId){
                        forms[x].fields[y].label = field.label || forms[x].fields[y].label;
                        forms[x].fields[y].type = field.type || forms[x].fields[y].type;
                        if (forms[x].fields[y].type != "DATE") {
                            if (forms[x].fields[y].type == "TEXT" || forms[x].fields[y].type == "TEXTAREA") {
                                forms[x].fields[y].placeholder = field.placeholder || forms[x].fields[y].placeholder;
                            }
                            else {
                                forms[x].fields[y].options = field.options || forms[x].fields[y].options;
                            }
                        }
                        return forms[x].fields[y];
                    }
                }
            }
        }
        return null;
    }

    function moveFormField(formId, fieldId, direction){
        for(var x in forms){
            if(forms[x]._id == formId){
                for(var y in forms[x].fields){
                    if(forms[x].fields[y]._id == fieldId){
                        if (direction.direction == "UP"){
                            var newIndex = parseInt(y) - 1;
                            console.log("UP");
                        }
                        else {
                            var newIndex = parseInt(y) + 1;
                            console.log("DOWN");
                        }
                        console.log(forms[x].fields);
                        console.log(y);
                        console.log(newIndex);
                        if (newIndex >= forms[x].fields.length || newIndex < 0) {
                            return null;
                        }
                        forms[x].fields.splice(newIndex, 0, forms[x].fields.splice(y, 1)[0]);
                        return forms[x].fields;

                    }
                }
            }
        }
        return null;
    }

    function buildNewField(field){
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
        else if (field.type == "Date Field"){
            field.type = "DATE";
            field.label = "New Date Field";
            return field;
        }
        else if (field.type == "Dropdown Field"){
            field.type = "OPTIONS";
            field.label = "New Dropdown";
            field.options = [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ];
            return field;
        }
        else if (field.type == "Checkboxes Field"){
            field.type = "CHECKBOXES";
            field.label = "New Checkboxes";
            field.options = [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ];
            return field;
        }
        else if (field.type == "Radio Buttons Field"){
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