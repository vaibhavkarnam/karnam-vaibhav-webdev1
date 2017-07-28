(function () {

angular
.module("WamApp")
.controller("profileController", profileController)

function profileController($routeParams, userService, $location) {
var model = this;
model.userId = $routeParams["userId"];
model.updateUser = updateUser;
model.unregister = unregister;
function init() {
    model.user = userService
        .findUserById(model.userId)
        .then(showUser, errorUser);
    function showUser(user) {
        model.user = user;
    }
    function errorUser() {
        model.error = "Sorry the User was not available";
    }
}
init();
function updateUser(user) {
    userService
        .updateUser(model.userId, user)
        .then(function () {
            model.message = "User was updated successfully";
        })
}

function unregister() {
    userService.deleteUser(model.userId)
        .then(function () {
        $location.url('/')
    },
    function () {
        model.error = "unable to unregister user";
    })
}
}
})();