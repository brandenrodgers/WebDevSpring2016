/**
 * Created by branden on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService){

        FormService.findAllFormsForUser($rootScope.currentUser._id, function(result){
            $scope.availableForms = result;
        });

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(){
            var newForm = {
                title: $scope.formName
            };
            FormService.createFormForUser($rootScope.currentUser._id, newForm, function(result){
                $scope.availableForms.push(result);
                $scope.formName = "";
                console.log("added Form " + result.title);
            });
        }

        function updateForm(){
            console.log("Update Form");
        }

        function deleteForm(index){
            FormService.deleteFormById($scope.availableForms[index]._id, function(result){
                $scope.availableForms.splice(index, 1);
                console.log("delete Form");
            });

        }

        function selectForm(index){
            console.log("select Form at " + index);
        }

    }

})();