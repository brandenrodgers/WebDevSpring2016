/**
 * Created by branden on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService){

        $scope.form = null;

        FormService.findAllFormsForUser($rootScope.currentUser._id, function(result){
            $scope.availableForms = result;
        });

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(){
            FormService.createFormForUser($rootScope.currentUser._id, $scope.form, function(result){
                $scope.availableForms.push(result);
                $scope.form = null;
            });
        }

        function updateForm(){
            FormService.updateFormById($scope.availableForms[$scope.selectedFormIndex]._id, $scope.form, function(result){
                $scope.form = null;
            });
        }

        function deleteForm(index){
            FormService.deleteFormById($scope.availableForms[index]._id, function(result){
                $scope.availableForms.splice(index, 1);
                $scope.form = null;
            });

        }

        function selectForm(index){
            $scope.selectedFormIndex = index;
            $scope.form = {
                _id: $scope.availableForms[index]._id,
                title: $scope.availableForms[index].title,
                userId: $scope.availableForms[index].userId
            };
        }

    }

})();