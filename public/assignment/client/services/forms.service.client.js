/**
 * Created by branden on 2/22/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("formService", FormService);

    function FormService($http){

        var service = {
            createForm: createForm,
            findAllForms: findAllForms,
            findFormById: findFormById,
            findFormByTitle: findFormByTitle,
            updateForm: updateForm,
            deleteForm: deleteForm
        };

        return service;

        function createForm(userId, form){
            form._id = (new Date).getTime();
            form.userId = userId;
            return $http.post("/api/assignments/form", form);
        }

        function findFormById(formId){
            return $http.get("/api/assignments/form/" + formId);
        }

        function findFormByTitle(title){
            var data = {
                title: title
            };
            return $http.post("/api/assignments/title", data);
        }

        function findAllForms(userId){
            return $http.get("/api/assignments/forms/" + userId);
        }

        function deleteForm(formId){
            return $http.delete("/api/assignments/form/" + formId);
        }

        function updateForm(formId, form) {
            return $http.put("/api/assignments/form/" + formId, form);
        }

    }

})();