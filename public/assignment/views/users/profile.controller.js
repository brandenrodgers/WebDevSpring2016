/**
 * Created by branden on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService){

        $scope.message = null;
        $scope.errorMessage = null;

        $scope.currentUser = UserService.getCurrentUser();

        if(!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.update = update;

        function update(){
            $scope.message = null;
            $scope.errorMessage = null;

            if (!$scope.currentUser.username){
                $scope.errorMessage = "Username cannot be empty";
                return;
            }
            if (!$scope.currentUser.password){
                $scope.errorMessage = "Password cannot be empty";
                return;
            }
            if ($scope.currentUser.email && $scope.currentUser.email.indexOf("@") == -1){
                $scope.errorMessage = "Invalid email address";
                return;
            }

            UserService.updateUser($scope.currentUser._id, $scope.currentUser, function(newUser){
                UserService.setCurrentUser(newUser);
                $scope.message = "Profile Successfully Updated";
            });
        }

    }

})();