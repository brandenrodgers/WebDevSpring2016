/**
 * Created by branden on 2/22/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("fieldService", FieldService);

    function FieldService($http){

        var service = {
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            createFieldForForm: createFieldForForm,
            updateField: updateField
        };

        return service;

        function getFieldsForForm(formId){
           return $http.get("/api/assignments/form/" + formId + "/field");
        }

        function getFieldForForm(formId, fieldId){
            return $http.get("/api/assignments/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldFromForm(formId, fieldId){
            return $http.delete("/api/assignments/form/" + formId + "/field/" + fieldId);
        }

        function createFieldForForm(formId, field){
            return $http.post("/api/assignments/form/" + formId + "/field", field);
        }

        function updateField(formId, fieldId, field){
            return $http.put("/api/assignments/form/" + formId + "/field/" + fieldId, field);
        }
    }

})();