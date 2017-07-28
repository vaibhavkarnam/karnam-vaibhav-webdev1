(function () {
angular
.module("WamApp")
.controller("loginController", loginController);

function loginController($location, userService) {
var model = this;
model.login = login;
function init() {

}
init();
function login(user) {
    if(!user) {
        model.message = "User not found";
        return;
    }
    user = userService
        .findUserbyCredentials(user.username, user.password)
        .then(
            function (user) {
                if(user != null ){
                    $location.url('/profile/' + user._id)
                }
            },
            function (error) {
                model.message = "Sorry the entered" + username + "was not found";
            });
}
}
})();