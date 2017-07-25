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
        model.user = userService.findUserById(model.userId);
    }
    init();

    function updateUser(user) {
        userService.updateUser(model.userId, user);
    }

    function unregister() {
        userService.deleteUser(model.userId);
        $location.url("login");

    }
}

})();