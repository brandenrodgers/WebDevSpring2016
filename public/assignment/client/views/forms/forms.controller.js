/**
 * Created by branden on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, formService){

        $scope.form = null;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function init() {
            formService
                .findAllForms($rootScope.currentUser._id)
                .then(function (response) {
                    $scope.availableForms = response.data;
                });
        }
        init();

        function addForm(){
            formService
                .createForm($rootScope.currentUser._id, $scope.form)
                .then(function(response){
                    $scope.availableForms.push(response.data);
                    $scope.form = null;
                });
        }

        function updateForm(){
            formService
                .updateForm($scope.availableForms[$scope.selectedFormIndex]._id, $scope.form)
                .then(function(response){
                    $scope.availableForms[$scope.selectedFormIndex] = response.data;
                    $scope.form = null;
                });
        }

        function deleteForm(index){
            formService
                .deleteForm($scope.availableForms[index]._id)
                .then(function(response){
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