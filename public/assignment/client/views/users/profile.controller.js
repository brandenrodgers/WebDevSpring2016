/**
 * Created by branden on 2/18/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, UserService){
        var vm = this;
        vm.message = null;
        vm.errorMessage = null;

        vm.currentUser = $rootScope.currentUser;
        var preservedUserInfo = preserveInfo(vm.currentUser);

        function init() {
            delete vm.currentUser.password;
        }
       init();

        vm.update = update;

        function update(){
            vm.message = null;
            vm.errorMessage = null;

            if (!vm.currentUser.username){
                vm.errorMessage = "Username cannot be empty";
                vm.currentUser.username = preservedUserInfo.username;
                return;
            }

            UserService
                .updateUserProfile(vm.currentUser._id, vm.currentUser)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    preservedUserInfo = preserveInfo(response.data);
                    vm.message = "Profile Successfully Updated";
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