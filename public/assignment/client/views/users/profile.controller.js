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

        var preservedUserInfo = preserveInfo($scope.currentUser);

        function init() {
            if (!$scope.currentUser) {
                $location.url("/home");
            }
        }
        init();

        $scope.update = update;

        function update(){
            $scope.message = null;
            $scope.errorMessage = null;

            if (!$scope.currentUser.username){
                $scope.errorMessage = "Username cannot be empty";
                $scope.currentUser.username = preservedUserInfo.username;
                return;
            }
            if (!$scope.currentUser.password){
                $scope.errorMessage = "Password cannot be empty";
                $scope.currentUser.password = preservedUserInfo.password;
                return;
            }

            UserService
                .updateUser($scope.currentUser._id, $scope.currentUser)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    preservedUserInfo = preserveInfo(response.data);
                    $scope.message = "Profile Successfully Updated";
                });
        }

        function preserveInfo(user){
            return {
                _id: user._id,
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                email: user.email
            };
        }

    }

})();