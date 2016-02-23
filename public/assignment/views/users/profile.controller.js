/**
 * Created by branden on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService){
        var currentUser = $rootScope.currentUser ? $rootScope.currentUser : {}; //TODO this might be wrong!!!

        $scope.inputUName = currentUser.username;
        $scope.inputPwd = currentUser.password;
        $scope.inputFName = currentUser.firstName;
        $scope.inputLName = currentUser.lastName;

        $scope.update = update;


        function update(){
            var userInfo = {
                firstName: $scope.inputFName,
                lastName: $scope.inputLName,
                username: $scope.inputUName,
                password: $scope.inputPwd
            };

            UserService.updateUser(currentUser._id, userInfo, function(newUser){
                $rootScope.currentUser = newUser;
            });
        }

    }

})();